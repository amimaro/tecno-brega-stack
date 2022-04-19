import { Form, Link, useActionData, useLocation } from "@remix-run/react";
import { handleResetPassword } from "~/auth.server";
import type { ActionFunction } from "@remix-run/node";
import type { BaseResponse } from "~/types";
import { useState } from "react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const accessToken = formData.get("access_token") as string;
  const newPassword = formData.get("new_password") as string;
  return handleResetPassword(request, {
    accessToken,
    newPassword,
  });
};

export default function ResetPassword() {
  const actionData = useActionData<BaseResponse>();
  const location = useLocation();

  const params = new URLSearchParams(location.hash.substring(1));
  const [accessToken] = useState(params.get("access_token"));

  if (actionData?.success) {
    return (
      <div>
        <h1>
          Password updated successfully! You can now login with your new
          password.
        </h1>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Reset Password</h1>
      {actionData?.errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
      <Form method="post">
        <div>
          <input type="hidden" name="access_token" value={accessToken || ""} />
        </div>
        <div>
          <label htmlFor="new_password">New Password: </label>
          <input type="password" name="new_password" autoComplete="on" />
        </div>
        <br />
        <button>Submit</button>
      </Form>
    </div>
  );
}
