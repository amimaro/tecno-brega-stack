import type { ActionFunction } from "@remix-run/node";
import { supabaseClient } from "~/supabase.server";

export const action: ActionFunction = async () => {
  const { data, error } = await supabaseClient.auth.api.resetPasswordForEmail(
    "amir.zahlan@gmail.com"
  );
  console.log({ data, error });

  return {};
};
