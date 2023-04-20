import { View, Text, Dimensions } from "react-native";
import Image from "react-native-scalable-image";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { WEB_HOST } from "../utils/constants";
import { globalStyles } from "../utils/globalStyles";

export default function OutcomeImageScreen({ route, navigation }) {
  const { imagePath } = route.params;
  console.log(WEB_HOST + imagePath);
  return (
    <View>
      <Image
        width={Dimensions.get("window").width}
        source={{ uri: WEB_HOST + imagePath }}
      />
    </View>
  );
}
