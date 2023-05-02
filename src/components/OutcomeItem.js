import { View, Text, Pressable } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";
import { colors } from "../utils/constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { removeItem } from "../api/api-connections";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function OutcomeItem(props) {
  const { auth } = useAuth();
  const { outcome, edition, loadItems } = props;
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
  remove = async (id) => {
    try {
      const response = await removeItem(`/outcomes/${id}`, auth);
      if (response.success) {
        loadItems();
      }
    } catch (error) {}
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
        <FontAwesome5 name="image" size={20} color={colors.mainColor} light />
      </Pressable>
      {edition && (
        <>
          <Pressable onPress={() => remove(outcome.id)}>
            <Text>
              <FontAwesome5
                name="trash-alt"
                color={colors.mainColor}
                size={18}
              />
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
