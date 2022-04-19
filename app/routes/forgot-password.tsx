import { Form, useActionData } from "@remix-run/react";
import { handleForgotPassword } from "~/auth.server";
import type { ActionFunction } from "@remix-run/node";
import type { BaseResponse } from "~/types";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  return handleForgotPassword(request, email);
};

export default function ForgotPassword() {
  const actionData = useActionData<BaseResponse>();

  if (actionData?.success) {
    return (
      <div>
        <h1>Please, check you email to continue with the password reset.</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Forgot Password</h1>
      {actionData?.errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
      <Form method="post">
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" autoComplete="on" />
        </div>
        <br />
        <button>Submit</button>
      </Form>
    </div>
  );
}
