import { createServerSupabaseClient } from "../lib/supabase-server";

export interface RepertoryData {
  id?: string;
  title: string;
  subtitle: string;
  image_url: string;
  updated_at?: string;
  created_at?: string;
}

export class RepertoryService {
  static async getAll() {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("repertory")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  static async getById(id: string) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("repertory")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async create(item: RepertoryData) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("repertory")
      .insert([item])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id: string, item: Partial<RepertoryData>) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("repertory")
      .update(item)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async delete(id: string) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from("repertory")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
    return true;
  }
}
