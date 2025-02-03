import { StyleSheet, Switch, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import PageView, { View, Text } from "@/components/Themed";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { SettingsBtn } from "@/components/more/SettingsButton";
import { SwitchButton } from "@/components/more/SwitchButton";

export function SettingsPage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [lockApp, setLockApp] = useState(false);

  function handleSetNotification() {
    setShowNotifications((prev) => !prev);
  }

  function handleSetLockApp() {
    setLockApp((prev) => !prev);
  }

  return (
    <PageView>
      <Text>General</Text>
      <SettingsBtn
        icon={<Ionicons name="color-palette" size={30} />}
        onPress={() => {}}
        title="Theme"
        value="System Default"
      />

      <SettingsBtn
        icon={<MaterialIcons name="currency-exchange" size={26} />}
        onPress={() => {}}
        title="Set Currency"
        value="Namibian Dollar - N$"
      />

      <SettingsBtn
        icon={<MaterialCommunityIcons name="decimal" size={30} />}
        onPress={() => {}}
        title="Decimal Places"
        value="Default"
      />

      <Text>Notification</Text>

      <SwitchButton
        title="Show Notifications"
        icon={<Ionicons name="notifications" size={24} />}
        value={showNotifications}
        onPress={handleSetNotification}
      />

      {/* TODO: decice if going to be implemented  */}
      <Text>Security</Text>
      <SwitchButton
        title="Lock App"
        icon={<Ionicons name="lock-closed" size={24} />}
        value={lockApp}
        onPress={handleSetLockApp}
      />
    </PageView>
  );
}





export default SettingsPage;
