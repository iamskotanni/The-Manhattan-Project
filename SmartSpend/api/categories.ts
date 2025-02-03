import { supabase } from "@/data/supabase";

export async function getAllCategories() {
  return supabase.from("category").select("*");
}
