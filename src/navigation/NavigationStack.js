import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardScreen from "../screens/DashboardScreen";
import OrderScreen from "../screens/OrderScreen";
import LoginScreen from "../screens/LoginScreen";
import NavigationTab from "./NavigationTab";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NavigationStack() {
  const Stack = createStackNavigator();
  const [auth, setAuth] = useState(null);
  const checkAuth = async () => {
    authStoraged = await AsyncStorage.getItem("auth");
    console.log(authStoraged);
    if (authStoraged !== null) {
      setAuth(authStoraged);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    console.log(auth);
  }, [auth]);
  return (
    <Stack.Navigator initialRouteName="Tab">
      {auth ? (
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
