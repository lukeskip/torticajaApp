import { View, Text, ImageBackground } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function CustomDrawer(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#FFFFFF" }}
      >
        <ImageBackground
          source={require("../assets/img/test.jpg")}
          style={{ padding: 20 }}
        >
          <FontAwesome5 name="coins" size={14} color="#FFFFFF" />
        </ImageBackground>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#CCC" }}>
        <Text>Un desarrollo de ChekoGarcia.Com</Text>
      </View>
    </View>
  );
}
