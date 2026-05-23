import { NextResponse } from "next/server";
import { EventsController } from "@/shared/controllers/events.controller";
import { createServerSupabaseClient } from "@/shared/lib/supabase-server";

export async function GET() {
  return EventsController.getAll();
}

export async function POST(req: Request) {
  // Verificar autenticação
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  return EventsController.create(req);
}
