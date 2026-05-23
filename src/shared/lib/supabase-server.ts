import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client for use in Server Components, API Routes, and Server Actions only
export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll may throw in Server Components; middleware handles session refresh
          }
        },
      },
    }
  );
};
