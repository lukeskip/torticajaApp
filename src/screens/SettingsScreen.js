import { View, Text, Button } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";

export default function SettingsScreen(props) {
  const { navigation } = props;

  return (
    <View style={globalStyles.content}>
      <Text>SettingsScreen</Text>

      <Button
        title="Ir a Home"
        onPress={() => {
          navigation.navigate("Branch");
        }}
      />
    </View>
  );
}
