import { getUser } from "@/api/auth";
import { getUserProfile } from "@/api/profile";
import { Profile } from "@/data/supabase.types";
import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";


export default function useGetUserDetails(){
  const [profile, setProfile] = useState<Profile>();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const currentUser = async() => {
      const {data, error} = await getUser()
      
      if (data){
        const profile = await getUserProfile(data.user?.id!!)
        setUser(data.user!!)
        setProfile(profile.data!!)
        setIsLoading(false)
      }
      setIsLoading(false)
    }

    currentUser()
  }, []);

  return {
    user,userID: String(user?.id), profile, fullName: `${profile?.first_name} ${profile?.last_name}`, isLoading
  }
}
