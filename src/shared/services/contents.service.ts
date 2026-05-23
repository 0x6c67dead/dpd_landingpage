import { createServerSupabaseClient } from "../lib/supabase-server";

export interface ContentData {
  id?: string;
  section: string;
  key: string;
  value: string;
  type: "text" | "image_url";
}

export class ContentsService {
  static async getAll() {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("site_contents")
      .select("*")
      .order("section", { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  static async getByKey(key: string) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("site_contents")
      .select("*")
      .eq("key", key)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Not found is fine, return null
      throw new Error(error.message);
    }
    return data;
  }

  static async upsert(content: ContentData) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("site_contents")
      .upsert(content, { onConflict: "key" })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async upsertMany(contents: ContentData[]) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("site_contents")
      .upsert(contents, { onConflict: "key" })
      .select();

    if (error) throw new Error(error.message);
    return data;
  }
}
