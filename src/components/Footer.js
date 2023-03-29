import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";

export default function Footer() {
  return (
    <View>
      <Text style={globalStyles.footerText}>
        Todos los derechos reservados.
      </Text>
    </View>
  );
}
