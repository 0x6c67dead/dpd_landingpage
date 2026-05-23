import { NextResponse } from "next/server";
import { RepertoryController } from "@/shared/controllers/repertory.controller";
import { createServerSupabaseClient } from "@/shared/lib/supabase-server";

export async function GET() {
  return RepertoryController.getAll();
}

export async function POST(req: Request) {
  // Verificar autenticação
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  return RepertoryController.create(req);
}
