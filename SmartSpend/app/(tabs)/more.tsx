import { ActivityIndicator, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PageView from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import MorePageLink from "@/components/more/MorePageLink";
import ProfileImage from "@/components/core/ProfileImage";
import useGetUserDetails from "@/hooks/useGetUserDetails";
import { signOut } from "@/api/auth";
import { AppLoadingCircle } from "@/components/core";

const MorePage = () => {
  const { isLoading, user, fullName } = useGetUserDetails();

  return (
    <SafeAreaView>
      <PageView
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          flexGrow: 1,
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 70,
          }}
        >
          {isLoading ? (
            <AppLoadingCircle size={50} />
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 20,
                // paddingHorizontal: 70,
                marginBottom: 40,
              }}
            >
              <ProfileImage />

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text style={{ fontSize: 20 }}>{fullName}</Text>
                <Text>{user?.email}</Text>
              </View>
            </View>
          )}

          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 40,
            }}
          >
            <MorePageLink
              icon="person-outline"
              text="Profile"
              onPress={() => {
                router.push("more/profile");
              }}
            />

            <View
              style={{
                height: 1,
                width: 400,
                backgroundColor: "black",
              }}
            />

            <MorePageLink
              icon="card-outline"
              text="Accounts"
              onPress={() => {
                router.push("more/accounts/");
              }}
            />

            <MorePageLink
              text="Transactions"
              onPress={() => {
                router.push("more/transactions/");
              }}
              icon="swap-horizontal"
            />

            <MorePageLink
              icon="pricetag-outline"
              text="Categories"
              onPress={() => {
                router.push("more/catagories");
              }}
            />

            <MorePageLink
              icon="settings-outline"
              text="Settings"
              onPress={() => {
                router.push("more/settings");
              }}
            />

            <View
              style={{
                height: 1,
                width: 400,
                backgroundColor: "black",
              }}
            />

            <MorePageLink icon="help-sharp" text="Help" onPress={() => {}} />

            <MorePageLink
              icon="log-out-outline"
              text="Logout"
              onPress={() => {
                signOut();
              }}
            />
          </View>
        </View>
      </PageView>
    </SafeAreaView>
  );
};

export default MorePage;
