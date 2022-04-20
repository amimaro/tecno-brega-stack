import { createCookieSessionStorage } from "@remix-run/node";

if (!process.env.SESSION_SECRET) {
  throw Error("SESSION_SECRET must be set");
}

if (!process.env.SERVER_URL) {
  throw Error("SERVER_URL must be set");
}

export const sessionKey = process.env.SESSION_KEY || "__supabase_session";

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: sessionKey,

      domain:
        process.env.NODE_ENV === "production"
          ? process.env.SERVER_URL
          : "localhost",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  });
