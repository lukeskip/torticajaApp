import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import useAuth from "../hooks/useAuth";

import BranchScreen from "../screens/BranchScreen";
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
        label: "",
        headerTitleAlign: "center",
        drawerLabelStyle: { marginLeft: -25 },
      }}
    >
      {auth ? (
        <>
          <Drawer.Screen
            name="Inicio"
            component={BranchScreen}
            options={{
              drawerIcon: (color) => (
                <Ionicons name="home-outline" size={22} color={color} />
              ),
              drawerLabel: "Inicio",
              title: "",
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
            title: "",
            drawerLabel: "Accesa a tu cuenta",
            headerShown: false,
          }}
        />
      )}
    </Drawer.Navigator>
  );
}
