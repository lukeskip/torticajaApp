import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardScreen from "../screens/DashboardScreen";
import OrderScreen from "../screens/OrderScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AccountScreen from "../screens/AccountScreen";
import RegisterShopScreen from "../screens/RegisterShopScreen";
import BarCodeScanScreen from "../screens/BarCodeScanScreen";
import NavigationTab from "./NavigationTab";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import OutcomeCreateScreen from "../screens/OutcomeCreateScreen";
import OutcomeImageScreen from "../screens/OutcomeImageScreen";
import RegisterBranchScreen from "../screens/RegisterBranchScreen";

export default function NavigationStack() {
  const Stack = createStackNavigator();
  const { auth, checkLoging } = useAuth();

  useEffect(() => {}, [auth]);

  useEffect(() => {
    checkLoging();
  }, []);

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
          <Stack.Screen
            name="scan"
            component={BarCodeScanScreen}
            options={{
              title: "Escaneando producto",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="createOutcome"
            component={OutcomeCreateScreen}
            options={{
              title: "Reportando gasto",
            }}
          />
          <Stack.Screen
            name="outcomeImage"
            component={OutcomeImageScreen}
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="account"
            component={AccountScreen}
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="registerShop"
            component={RegisterShopScreen}
            options={{
              title: "",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
