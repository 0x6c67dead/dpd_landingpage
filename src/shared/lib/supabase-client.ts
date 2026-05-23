import { createBrowserClient } from "@supabase/ssr";

// Client for use in Client Components ("use client") only
export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
