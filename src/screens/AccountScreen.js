import { View, Text, Pressable } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";
import useAuth from "../hooks/useAuth";

export default function AccountScreen() {
  const { logout } = useAuth();
  return (
    <View>
      <Text>AccountScreen</Text>
      <Pressable onPress={() => logout()}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}
