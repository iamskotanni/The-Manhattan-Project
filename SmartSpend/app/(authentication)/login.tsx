import React, { useState } from "react";
import PageView, { Text, View } from "@/components/Themed";
import { Alert, Button, StyleSheet, TextInput } from "react-native";
import { Link, router } from "expo-router";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    console.log("hello");
    
    // try login with entered details
    const { data, error } = await signInWithEmailAndPassword(email, password);
    // if successfull go to onboarding
    if (data.user) {
      router.replace("onboarding");

      // clear fields
      setEmail("");
      setPassword("");

      setLoading(false)
    }
    // otherwise display error
    if (error){
      Alert.alert(error.name, error.message)
      setLoading(false)
    }
  }

  return (
    <PageView
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: 30,
        backgroundColor: "#2A2D57",
      }}
    >
      <Text style={{ color: "white", fontSize: 26 }}>Welcome Back</Text>
      <View
        style={{
          display: "flex",
          gap: 20,
          width: "80%",
          backgroundColor: "#2A2D57",
        }}
      >
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(val) => setEmail(val)}
          placeholder="Email"
          placeholderTextColor={"lightgray"}
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(val) => setPassword(val)}
          placeholder="Password"
          placeholderTextColor={"lightgray"}
          keyboardType="visible-password"
          autoCapitalize="none"
        />

        <Link
          style={{
            alignSelf: "flex-end",
            color: "white",
          }}
          href={"/(auth)/forgotpassword"}
        >
          Forgot Password?
        </Link>
      </View>

      {/* TODO: Add actual auth flow */}
      <AppButton isLoading={loading} disabled={loading} onPress={handleLogin} title="LOGIN" />
    </PageView>
  );
}

import Colors from "@/constants/Colors";
import AppButton from "@/components/core/AppButton";
import { signInWithEmailAndPassword } from "@/api/auth";

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1.5,
    borderColor: Colors.light.tint,
    padding: 16,
    color: "white",
  },
});

export default LoginPage;
