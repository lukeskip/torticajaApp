import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import useAuth from "../hooks/useAuth";

import DashboardScreen from "../screens/DashboardScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LoginScreen from "../screens/LoginScreen";

export default function NavigationDrawer() {
  const Drawer = createDrawerNavigator();
  const { auth } = useAuth();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        drawerLabelStyle: { marginLeft: -25 },
      }}
    >
      {auth ? (
        <>
          <Drawer.Screen
            name="Dashboard"
            component={DashboardScreen}
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
        </>
      ) : (
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{
            drawerIcon: (color) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
            title: "Accesa a tu cuenta",
          }}
        />
      )}
    </Drawer.Navigator>
  );
}
