import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardScreen from "../screens/DashboardScreen";
import OrderScreen from "../screens/OrderScreen";
import LoginScreen from "../screens/LoginScreen";
import NavigationTab from "./NavigationTab";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function NavigationStack() {
  const Stack = createStackNavigator();
  const { authStatus } = useAuth();

  useEffect(() => {
    console.log("authStatus", authStatus);
  }, [authStatus]);

  return (
    <Stack.Navigator initialRouteName="Tab">
      {authStatus ? (
        <>
          <Stack.Screen
            name="Tab"
            component={NavigationTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Order"
            component={OrderScreen}
            options={{
              title: "Generando Orden",
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
