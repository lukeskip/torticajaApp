import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardScreen from "../screens/DashboardScreen";
import BranchScreen from "../screens/BranchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NavigationDrawer from "./NavigationDrawer";
const Stack = createStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator initialRouteName="Drawer">
      <Stack.Screen
        name="Drawer"
        component={NavigationDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Branch" component={BranchScreen} />
    </Stack.Navigator>
  );
}
