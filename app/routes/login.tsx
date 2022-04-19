import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import {
  handleAuthSession,
  handleSignInWithEmailAndPassword,
} from "~/auth.server";
import type { BaseResponse } from "~/types";

export const loader: LoaderFunction = async ({ request }) => {
  await handleAuthSession(request, "/notes", false);
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  return handleSignInWithEmailAndPassword(
    request,
    {
      email,
      password,
    },
    "/notes"
  );
};

export default function SignIn() {
  const actionData = useActionData<BaseResponse>();

  return (
    <div>
      <h1>SignIn</h1>
      {actionData?.errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
      <Form method="post">
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" autoComplete="on" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" autoComplete="on" />
        </div>
        <br />
        <button>Submit</button>
      </Form>
      <br />
      <Link to="/forgot-password">Forgot Password?</Link>
    </div>
  );
}
