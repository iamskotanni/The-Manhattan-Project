import PageView, { Text, View } from "@/components/Themed";
import AppButton from "@/components/core/AppButton";
import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ForgotPasswordPage() {
  const [emailAddress, setEmailAddress] = useState("");

  async function handleReset() {
    console.log("Reset password");
  }

  return (
    <SafeAreaView>
    <PageView
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: 10
      }}
    >
        <Text style={{ fontSize: 26 }}>Forgot Password?</Text>
        <Text>
          Don't worry it happens. Please enter the email address associated with
          you account
        </Text>
        <View
          style={{
            paddingVertical:20,
            width: "80%",
            gap: 20
          }}
        >
          <TextInput
            value={emailAddress}
            onChangeText={(val) => setEmailAddress(val)}
            placeholder="Enter email address"
            keyboardType="email-address"
            clearButtonMode="always"
            autoCapitalize="none"
            style={{
              borderWidth: 1,
              padding: 16,
              borderRadius: 10,
              borderColor: "grey",
            }}
          />
          {/* TODO: Implement forgot password functionality */}
        <AppButton title="Reset Password" onPress={handleReset} />
        </View>

    </PageView>
    </SafeAreaView>
  );
}

export default ForgotPasswordPage;
