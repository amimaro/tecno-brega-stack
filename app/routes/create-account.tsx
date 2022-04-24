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

  return handleCreateUser(request, { email, password });
};

export default function SignUp() {
  const actionData = useActionData();

  if (actionData?.success) {
    return (
      <div>
        <h1>Please, check you email to confirm your registration.</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>SignUp</h1>
      <p>{actionData?.errorMessage}</p>
      <Form method="post">
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" />
        </div>
        <br />
        <button>Submit</button>
      </Form>
    </div>
  );
}
