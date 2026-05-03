import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const service = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

// Browser-safe client (anon key, RLS enforced).
export const supabase = url && anon ? createClient(url, anon) : null;

// Server-only client with elevated privileges. Never import from a Client Component.
export function supabaseAdmin() {
  if (!url || !service) return null;
  return createClient(url, service, { auth: { persistSession: false } });
}
