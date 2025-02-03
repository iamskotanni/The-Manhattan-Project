import Colors, { primaryColor } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";

function TransactionsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle:{
          backgroundColor: primaryColor,
        },
        headerTitleStyle: {
          color: "white"
        },
        animation: "slide_from_left",
        headerTintColor: "white"
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Transactions" }} />
      <Stack.Screen name="add-transaction" options={{ headerTitle: "Add Transaction" }} />
    </Stack>
  );
}

export default TransactionsLayout;
