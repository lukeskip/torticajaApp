import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashBoard from "../screens/DashBoard";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function NavigationTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashBoard} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
