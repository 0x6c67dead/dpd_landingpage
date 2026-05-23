import { createServerSupabaseClient } from "../lib/supabase-server";

export interface EventData {
  id?: string;
  date_day: string;
  date_month: string;
  date_year: string;
  title: string;
  location: string;
  type: string;
  theme?: string | null;
  teacher?: string | null;
  ticket_url?: string | null;
}

export class EventsService {
  static async getAll() {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  static async getById(id: string) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async create(event: EventData) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("events")
      .insert([event])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id: string, event: Partial<EventData>) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("events")
      .update(event)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async delete(id: string) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
    return true;
  }
}
