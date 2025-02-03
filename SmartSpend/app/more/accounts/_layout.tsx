import { primaryColor } from "@/constants/Colors";
import { Stack } from "expo-router";

function AccountsLayout(){
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: primaryColor,
        },
        headerTitleStyle: {
          color: "white",
        },
        animation: "slide_from_left",
        headerTintColor: "white"
      }}
    >
      <Stack.Screen name="index" options={{headerTitle: "Accounts"}} />
      <Stack.Screen name="add-account" options={{headerTitle: "Add Account"}} />
    </Stack>
  )
}

export default AccountsLayout;
