import { createServerSupabaseClient } from "../lib/supabase-server";

export class StorageService {
  static BUCKET_NAME = "site-contents";

  static async uploadImage(
    fileBuffer: Buffer,
    fileName: string,
    contentType: string
  ): Promise<string> {
    const supabase = await createServerSupabaseClient();

    // Limpar o nome do arquivo e adicionar timestamp único
    const timestamp = Date.now();
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.]/g, "_");
    const uniquePath = `uploads/${timestamp}_${cleanFileName}`;

    const { data, error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .upload(uniquePath, fileBuffer, {
        contentType,
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);
    }

    // Obter URL pública
    const { data: publicUrlData } = supabase.storage
      .from(this.BUCKET_NAME)
      .getPublicUrl(data.path);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error("Não foi possível gerar a URL pública para a imagem carregada.");
    }

    return publicUrlData.publicUrl;
  }
}
