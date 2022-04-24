import { createClient } from "@supabase/supabase-js";

// TODO

export const getSupabaseAdmin = () => {
  if (!process.env.SUPABASE_URL)
    throw new Error("ENV: SUPABASE_URL is required");

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
    throw new Error("ENV: SUPABASE_SERVICE_ROLE_KEY is required");

  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
};

export const generateSignUpLink = async (email: string) => {
  const supabaseAdmin = getSupabaseAdmin();
  return await supabaseAdmin.auth.api.generateLink("invite", email);
};
