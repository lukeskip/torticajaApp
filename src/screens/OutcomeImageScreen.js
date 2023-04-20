import { View, Text, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { WEB_HOST } from "../utils/constants";
import { globalStyles } from "../utils/globalStyles";

export default function OutcomeImageScreen({ route, navigation }) {
  const { imagePath } = route.params;
  console.log(WEB_HOST + imagePath);
  return (
    <View>
      <Text>{WEB_HOST + imagePath}</Text>
      <Image
        style={globalStyles.thumbnail}
        source={{ uri: WEB_HOST + imagePath }}
      />
    </View>
  );
}
