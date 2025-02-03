import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageView, { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import useGetUserDetails from "@/hooks/useGetUserDetails";
import { AppButton, AppLoadingCircle, ProfileImage } from "@/components/core";

const ProfilePage = () => {
  const { profile, userID, user, isLoading } = useGetUserDetails();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  function updateProfile() {
    console.log("Update Profile");
  }

  useEffect(() => {
    if (!isLoading && userID) {
      setFirstName(profile?.first_name ?? "");
      setMiddleName(profile?.middle_name ?? "");
      setLastName(profile?.last_name ?? "");
      setEmail(user?.email ?? "");
      setPhoneNumber(user?.phone ?? "");
    }
  }, [isLoading, userID]);

  const colorScheme = useColorScheme();

  return isLoading ? (
    <PageView
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center'
      }}
    >
      <AppLoadingCircle size={50} />
    </PageView>
  ) : (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          padding: 20,
          justifyContent: "space-between",
          flexGrow: 1,
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.background
              : Colors.light.background,
        }}
      >
        <View
          style={{
            alignSelf: "center",
          }}
        >
          <ProfileImage />
        </View>

        {/* <Text>General Information</Text> */}
        {/* FirstName */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Text>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={(val) => setFirstName(val)}
            placeholder="e.g John"
            placeholderTextColor={"lightgray"}
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="words"
          />
        </View>

        {/* Middle Name */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Text>Middle Name</Text>
          <TextInput
            style={styles.input}
            value={middleName}
            onChangeText={(val) => setMiddleName(val)}
            placeholder="e.g Peters"
            placeholderTextColor={"lightgray"}
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="words"
          />
        </View>

        {/* Last Name */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Text>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(val) => setLastName(val)}
            placeholder="e.g Peters"
            placeholderTextColor={"lightgray"}
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="words"
          />
        </View>

        {/* Email */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            // onChangeText={(val) => setEmail(val)}
            onPress={() => {
              console.log("change email press");
            }}
            readOnly={false}
            editable={false}
            selectTextOnFocus={false}
            placeholder="e.g johnpeters@yahoo.com"
            placeholderTextColor={"lightgray"}
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(val) => setPassword(val)}
            placeholder="Must be longer than 8 characters"
            placeholderTextColor={"lightgray"}
            keyboardType="visible-password"
            returnKeyType="next"
            autoCapitalize="none"
          />
        </View>

        {/* Phone Number */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Text>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(val) => setPhoneNumber(val)}
            placeholder="+264 83 520 8466"
            placeholderTextColor={"lightgray"}
            keyboardType="phone-pad"
            returnKeyType="done"
            autoCapitalize="none"
          />
        </View>

        {/* Address */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Text>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={(val) => setAddress(val)}
            placeholder="e.g Peter"
            placeholderTextColor={"lightgray"}
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AppButton
            disabled={isLoading}
            isLoading={isLoading}
            onPress={updateProfile}
            title="Save"
          />
          <Text>or</Text>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 10,
              paddingHorizontal: 28,
            }}
            onPress={() => {
              router.back();
            }}
          >
            <Text style={{ color: Colors.light.tint, fontWeight: "600" }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "grey",
    width: "100%",
  },
});
