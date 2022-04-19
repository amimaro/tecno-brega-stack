import { json, redirect } from "@remix-run/node";
import type {
  ApiError,
  Session,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";
import type { Session as NodeSession } from "@remix-run/node";
import {
  commitSession,
  destroySession,
  getSession,
  sessionKey,
} from "./session.server";
import { supabaseAdmin, supabaseClient } from "./supabase.server";
import type { BaseResponse } from "./types";

export const getCookieSession = async (
  request: Request
): Promise<NodeSession> => {
  return await getSession(request.headers.get("Cookie"));
};

export async function getUser(accessToken: string): Promise<{
  user: User | null;
  data: User | null;
  error: ApiError | null;
}> {
  return await supabaseClient.auth.api.getUser(accessToken);
}

export const handleResponse = async (
  request: Request,
  {
    data,
    error,
  }: {
    data: any;
    error: any;
  }
): Promise<Response> => {
  const session = await getCookieSession(request);
  const response: BaseResponse = {
    success: true,
    data: null,
    errors: [],
  };
  response.data = data;
  if (error) {
    session.flash("error", error);
    response.success = false;
    response.errors.push(error.message);
    if (error.status !== undefined)
      return json(response, {
        status: error.status,
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
  }

  return json(response);
};

export const handleSignOutSession = async (
  request: Request,
  redirectTo: string = "/"
) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export const handleCreateUser = async (
  request: Request,
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
  successRedirect: string = "/"
): Promise<Response> => {
  const { data, error } = await supabaseAdmin.auth.api.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    return handleResponse(request, { data, error });
  }

  return redirect(successRedirect);
};

export const handleSignInWithEmailAndPassword = async (
  request: Request,
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
  successRedirect: string = "/"
): Promise<Response> => {
  const { data, error } = await supabaseClient.auth.api.signInWithEmail(
    email,
    password
  );

  const session = await getCookieSession(request);

  if (error) {
    return handleResponse(request, { data, error });
  }

  session.set(sessionKey, data);

  return redirect(successRedirect, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export async function handleAuthSession(
  request: Request,
  successRedirect?: string,
  auth: boolean = true
): Promise<{
  session: NodeSession;
  sessionData: Session | null;
  supabaseClient: SupabaseClient;
}> {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const isLoginPath = pathname === "/login";

  const session = await getCookieSession(request);
  const authSessionData = session.get(sessionKey);

  const isSessionExpired = authSessionData
    ? Date.now() / 1000 > authSessionData?.expires_at!
    : true;

  if (!authSessionData || isSessionExpired) {
    if (!isLoginPath && auth) {
      throw redirect("/login");
    } else {
      return { session, supabaseClient, sessionData: authSessionData };
    }
  }

  if (successRedirect) {
    throw redirect(successRedirect);
  }

  const supabaseClientSession = await supabaseClient.auth.setAuth(
    authSessionData?.access_token!
  );
  session.set(sessionKey, supabaseClientSession);

  return { session, sessionData: supabaseClientSession, supabaseClient };
}

export async function isAuthenticated(request: Request): Promise<boolean> {
  const session = await getCookieSession(request);
  const authSessionData = session.get(sessionKey);

  const isSessionExpired = authSessionData
    ? Date.now() / 1000 > authSessionData?.expires_at!
    : true;

  if (!authSessionData || !authSessionData.access_token || isSessionExpired) {
    return false;
  }

  return true;
}
