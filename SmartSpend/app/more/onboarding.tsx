import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SetCurrencyPage from "@/components/onboarding/SetCurrency";
import SetupAccountsPage from "@/components/onboarding/SetupAccounts";
import { onboardingStyles } from "@/components/onboarding/styles";
import Onboarding from "react-native-onboarding-swiper";
import { View } from "@/components/Themed";

import { router } from "expo-router";
import { NextButton, SkipButton, DoneButton } from "@/components/onboarding/OnboardingButtons";
import { primaryColor } from "@/constants/Colors";

export default function OnboardingPage() {
  function handleOnDone() {
    // TODO: Implement seting currency and creating accounts
    console.log("done");
    router.replace("(tabs)")
  }
  function handleOnSkip() {
    // TODO: Implement seting currency and creating accounts
    console.log("skip");
    router.replace("(tabs)")
  }

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Onboarding
        NextButtonComponent={NextButton}
        SkipButtonComponent={SkipButton}
        DoneButtonComponent={DoneButton}
        onDone={handleOnDone}
        onSkip={handleOnSkip}
        pages={[
          {
            backgroundColor: "#fff3",
            image: <View />,
            title: "Welcome to SmartSpend",
            subtitle: "Your intelligent budget tracker!",
          },
          {
            backgroundColor: "#fff3",
            image: <View />,
            title: "Your Finances in One Place",
            subtitle:
              "Get the big picture on all you money. Connect your bank and Track Cash",
          },
          {
            backgroundColor: "#fff",
            image: <View />,
            title: "Track your Spending",
            subtitle:
              "Track and analyse spending immediately and automatically through our bank connection",
          },
          {
            backgroundColor: "#fff",
            image: <View />,
            title: "Budget your money",
            subtitle:
              "Build healthy financial habits. Control unnecessary expenses.",
          },
          {
            backgroundColor: "#fff2",
            image: <View />,
            title: "Select Currency",
            subtitle: <SetCurrencyPage />,
          },
          {
            backgroundColor: "#fff",
            image: <View />,
            title: "Setup Your Accounts",
            subtitle: <SetupAccountsPage />,
          },
        ]}
      />
    </SafeAreaView>
  );
}



// TODO: Setup PIN/Biometric (optional)
// function SetupSecurity() {
//     return (
//       <View>
//         <Text>SetupAccountsPage</Text>
//       </View>
//     )
// }
