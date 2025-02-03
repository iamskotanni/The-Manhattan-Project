import { getUser } from "@/api/auth";
import { supabase } from "@/data/supabase";
import { Redirect, Stack, router } from "expo-router";
import React, { useEffect } from "react";

function AuthLayout() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/(tabs)/");
      } else {
        console.log("no user");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/(tabs)/");
      } else {
        console.log("no user");
        router.replace("/(auth)/login");
      }
    });
  }, []);

  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="forgotpassword"
        options={{ headerTitle: "Forgot Password" }}
      />
    </Stack>
  );
}

export default AuthLayout;
