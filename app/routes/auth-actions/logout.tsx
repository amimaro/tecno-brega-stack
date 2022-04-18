import type { ActionFunction } from "@remix-run/node";
import { handleSignOutSession } from "~/auth.server";

export const action: ActionFunction = async ({ request }) => {
  return handleSignOutSession(request, "/");
};
