import Colors, { primaryColor } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";

function MoreLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: primaryColor,
        },
        headerTitleStyle: {
          color: "white",
        },
        animation: "slide_from_right",
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="accounts" options={{ headerShown: false }} />
      <Stack.Screen name="transactions" options={{ headerShown: false }} />
      <Stack.Screen name="catagories" options={{ headerTitle: "Categories" }} />
      <Stack.Screen name="settings" options={{ headerTitle: "Settings" }} />
      <Stack.Screen name="profile" options={{ headerTitle: "Profile" }} />
    </Stack>
  );
}

export default MoreLayout;
