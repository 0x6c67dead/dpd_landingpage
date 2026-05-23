import { NextResponse } from "next/server";
import { ClassesController } from "@/shared/controllers/classes.controller";
import { createServerSupabaseClient } from "@/shared/lib/supabase-server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return ClassesController.getById(id);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Verificar autenticação
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  return ClassesController.update(id, req);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Verificar autenticação
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  return ClassesController.delete(id);
}
