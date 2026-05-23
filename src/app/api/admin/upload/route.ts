import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/shared/lib/supabase-server";
import { StorageService } from "@/shared/services/storage.service";

export async function POST(req: Request) {
  try {
    // 1. Verificar autenticação
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // 2. Extrair o arquivo FormData
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado. Envie no campo 'file'." },
        { status: 400 }
      );
    }

    // 3. Validar se é uma imagem
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "O arquivo enviado deve ser uma imagem." },
        { status: 400 }
      );
    }

    // 4. Converter File para Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 5. Upload via StorageService
    const publicUrl = await StorageService.uploadImage(
      buffer,
      file.name,
      file.type
    );

    return NextResponse.json({ publicUrl });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erro no upload do arquivo" },
      { status: 500 }
    );
  }
}
