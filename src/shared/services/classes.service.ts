import { createServerSupabaseClient } from "../lib/supabase-server";

export interface ClassData {
  id?: string;
  number: string;
  title: string;
  subtitle: string;
  schedule: string;
  description: string;
  highlights: string[];
  whatsapp_message: string;
  accent_color: string;
}

export class ClassesService {
  static async getAll() {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("dance_classes")
      .select("*")
      .order("number", { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  static async getById(id: string) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("dance_classes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async create(classItem: ClassData) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("dance_classes")
      .insert([classItem])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id: string, classItem: Partial<ClassData>) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("dance_classes")
      .update(classItem)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async delete(id: string) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from("dance_classes")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
    return true;
  }
}
