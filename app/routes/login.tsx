import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useActionData, useCatch } from "@remix-run/react";
import {
  handleAuthSession,
  handleSignInWithEmailAndPassword,
} from "~/auth.server";

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
  const actionData = useActionData();

  return (
    <div>
      <h1>SignIn</h1>
      <p>{actionData?.errorMessage}</p>
      <Form method="post">
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue="amir.zahlan@gmail.com"
            autoComplete="on"
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue="123"
            autoComplete="on"
          />
        </div>
        <button>Submit</button>
      </Form>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.log("a", caught);

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.log("a", error);

  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
