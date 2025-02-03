import { supabase } from "@/data/supabase";
import type { Profile, UpdatedProfile } from "@/data/supabase.types";

const query = supabase.from("profiles")

/**
 * gets the users profile details
 * @param userId 
 * @returns {Profile}
 */
export async function getUserProfile(userId:string) {
  return query.select("*").eq("id", userId).single()
}


/**
 * 
 * @param userId 
 * @param updatedProfile 
 * @returns {Profile} the users updated profile details
 */
export async function updateUserProfile(userId : string, updatedProfile:UpdatedProfile) {
  return query.update(updatedProfile).eq("id", userId).select()
}
