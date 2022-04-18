import { createClient } from "@supabase/supabase-js";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
      SUPABASE_SERVICE_ROLE_KEY: string;
    }
  }
}

if (!process.env.SUPABASE_URL) throw new Error("ENV: SUPABASE_URL is required");

if (!process.env.SUPABASE_ANON_KEY)
  throw new Error("ENV: SUPABASE_ANON_KEY is required");

if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
  throw new Error("ENV: SUPABASE_SERVICE_ROLE_KEY is required");

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  { autoRefreshToken: false, persistSession: false }
);
