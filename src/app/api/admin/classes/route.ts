import { NextResponse } from "next/server";
import { ClassesController } from "@/shared/controllers/classes.controller";
import { createServerSupabaseClient } from "@/shared/lib/supabase-server";

export async function GET() {
  return ClassesController.getAll();
}

export async function POST(req: Request) {
  // Verificar autenticação
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  return ClassesController.create(req);
}
