import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { handleAuthSession, handleCreateUser } from "~/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await handleAuthSession(request, "/notes", false);
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  return handleCreateUser(request, { email, password }, "/check-email");
};

export default function SignUp() {
  const actionData = useActionData();

  return (
    <div>
      <h1>SignUp</h1>
      <p>{actionData?.errorMessage}</p>
      <Form method="post">
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue="amir.zahlan@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue="123456"
          />
        </div>
        <button>Submit</button>
      </Form>
      {/* <fetcher.Form method="post" action="/auth-actions/invite">
        <div>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue="amir.zahlan@gmail.com"
            hidden
          />
        </div>
        <button>Resend email</button>
      </fetcher.Form> */}
    </div>
  );
}
