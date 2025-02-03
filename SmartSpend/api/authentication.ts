import { supabase } from "@/data/supabase";


export async function signInWithEmailAndPassword(emailAddress: string, pwd: string){
  return supabase.auth.signInWithPassword({email: emailAddress, password: pwd})
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function getUser() {
  return supabase.auth.getUser()
}

export async function updateUserEmail(newEmailAddress: string) {
  return supabase.auth.updateUser({email: newEmailAddress})
}

export async function updateUserPassword(newPassword: string) {
  return supabase.auth.updateUser({password: newPassword})
}

export async function updateUserPhone(newPhoneNumber: string) {
  return supabase.auth.updateUser({phone: newPhoneNumber})
}
