import { View, Text, Pressable } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";
import { colors } from "../utils/constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

export default function OutcomeItem(props) {
  const { outcome } = props;
  const navigation = useNavigation();
  iconName = () => {
    switch (outcome.category) {
      case "inhouse":
        return "cash-register";
      case "outhouse":
        return "money-bill-wave";
    }
  };
  openImage = (link) => {
    navigation.navigate("outcomeImage", { imagePath: link });
  };
  return (
    <View style={globalStyles.item}>
      <FontAwesome5
        name={iconName()}
        size={20}
        color={colors.grayDark}
        light
        style={globalStyles.icon}
      />
      <Text style={[globalStyles.flexItem, globalStyles.title_2]}>
        ${outcome.amount}
      </Text>
      <View>
        <Text style={globalStyles.flexItem}>{outcome.label}</Text>
        <Text style={globalStyles.flexItem}>{outcome.date}</Text>
      </View>
      <Pressable onPress={() => openImage(outcome.photo)}>
        <FontAwesome5
          name="image"
          size={20}
          color={colors.grayDark}
          light
          style={globalStyles.icon}
        />
      </Pressable>
      {edition && (
        <>
          <Text>borrar</Text>
          <Text>Editar</Text>
        </>
      )}
    </View>
  );
}
