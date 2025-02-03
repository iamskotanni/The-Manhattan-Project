import { insertAccount } from "@/api/account";
import PageView, { View, Text } from "@/components/Themed";
import { AppButton } from "@/components/core";
import { Account, InsertAccount } from "@/data/supabase.types";
import useGetUserDetails from "@/hooks/useGetUserDetails";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function AddAccountPage() {
  const { isLoading: userDataLoading, userID } = useGetUserDetails();
  const [isLoading, setIsLoading] = useState(false)
  const [nickname, setNickname] = useState("");

  const handleSaveNewAccount = async () => {
    if (!userDataLoading){
    console.log(nickname);
    setIsLoading(true)
    const {data, error} = await insertAccount({nickname: nickname, profile_id: userID})

    if (error){
      Alert.alert("Insertion Error", error.message)
    } else{
      Alert.alert("Success", "Account created successsfuly")
      router.navigate("more")
    }
    }
  }
  return (
    <PageView
      style={{
        display: "flex",
        gap: 30,
        padding: 20,
        height: "100%",
      }}
    >
      <View style={styles.inputBox}>
        <Text>Nickname</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={(val) => setNickname(val)}
          placeholder="e.g Cash"
          placeholderTextColor={"lightgray"}
          keyboardType="default"
          returnKeyType="done"
          autoCapitalize="words"
          maxLength={16}
        />
      </View>
      <AppButton 
        title="Add New Account"
        isLoading={isLoading}
        disabled={isLoading}
        onPress={handleSaveNewAccount}
      />
    </PageView>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "grey",
    width: "100%",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2A2D57",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
});
