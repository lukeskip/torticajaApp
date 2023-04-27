import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import SettingsScreen from "../screens/SettingsScreen";
import BranchScreen from "../screens/BranchScreen";

import CashClosing from "../screens/CashClosing";
import Icon from "react-native-vector-icons/FontAwesome5";
import { globalStyles } from "../utils/globalStyles";
import { colors } from "../utils/constants";
import ProductScreen from "../screens/ProductScreen";
import OutcomeCreateScreen from "../screens/OutcomeCreateScreen";
import OutcomeScreen from "../screens/OutcomeScreen";

const Tab = createBottomTabNavigator();

export default function NavigationTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "white",
        },
        tabBarStyle: {
          backgroundColor: colors.mainColor,
          height: 70,
          paddingTop: 10,
        },
      }}
    >
      {/* <Tab.Screen
        name="Branch"
        component={BranchScreen}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color="white" size={20} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color="white" size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="sale"
        component={ProductScreen}
        options={{
          tabBarLabel: "Venta",
          tabBarIcon: ({ color, size }) => (
            <View style={[globalStyles.contentCenter]}>
              <Icon name="cash-register" color="white" size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Corte"
        component={CashClosing}
        options={{
          tabBarLabel: "Cajón",
          tabBarIcon: ({ color, size }) => (
            <Icon name="money-bill-wave" color="white" size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="outcomeScreen"
        component={OutcomeScreen}
        options={{
          tabBarLabel: "Gastos",
          tabBarIcon: ({ color, size }) => (
            <Icon name="wallet" color="white" size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function renderBigButton() {
  return (
    <View style={globalStyles.icon}>
      <FontAwesome5 name="coins" size={14} color="#FFFFFF" />;
    </View>
  );
}
