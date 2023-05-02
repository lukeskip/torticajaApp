import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";
import useAuth from "../hooks/useAuth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { colors } from "../utils/constants";

export default function UserInfo() {
  const { logout, name } = useAuth();
  return (
    <View style={[globalStyles.content, stylesInfo.flex, { marginTop: 40 }]}>
      <Text>Hola, {name}!</Text>
      <Pressable style={globalStyles.flex} onPress={() => logout()}>
        <FontAwesome5 name="sign-out-alt" color={colors.mainColor} />
        <Text style={globalStyles.link}>Salir</Text>
      </Pressable>
    </View>
  );
}

const stylesInfo = StyleSheet.create({
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
