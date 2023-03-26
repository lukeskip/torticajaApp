import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";

import DashBoard from "../screens/DashBoard";
import SettingsScreen from "../screens/SettingsScreen";
import LoginScreen from "../screens/LoginScreen";

export default function NavigationDrawer() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        drawerLabelStyle: { marginLeft: -25 },
      }}
    >
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{
          drawerIcon: (color) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
          title: "Accesar a tu cuenta",
        }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={DashBoard}
        options={{
          drawerIcon: (color) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
          title: "Dashboard",
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: (color) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
          title: "Configuraciones",
        }}
      />
    </Drawer.Navigator>
  );
}
