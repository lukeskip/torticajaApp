import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getData } from "../api/api-connections";
import IncomeList from "../components/IncomeList";
import OutcomeList from "../components/OutcomeList";
import OrderList from "../components/OrderList";
import { API_HOST } from "../utils/constants";
import { globalStyles } from "../utils/globalStyles";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import UserInfo from "../components/UserInfo";

export default function BranchScreen(props) {
  const { auth, branch, role, logout } = useAuth();
  const [incomes, setIncomes] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const goTo = (url) => {
    switch (url) {
      case "outcomes":
        navigation.navigate("outcomeScreen");
        break;
      case "orders":
        navigation.navigate("orderList");
        break;
      case "incomes":
        navigation.navigate("incomeScreen");
        break;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        await loadItems().catch((error) => console.log(error));
      })();
    }, [branch])
  );

  const onRefresh = React.useCallback(async () => {
    await loadItems().catch((error) => console.log(error));
    setRefreshing(false);
  }, []);

  const loadItems = async () => {
    if (branch && branch > 0) {
      try {
        const response = await getData("/branches/" + branch, auth);
        console.log("response", response);
        setOutcomes(response.outcomes);
        setIncomes(response.incomes);
        setOrders(response.orders);
        setStatus(response.status);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <UserInfo />
      <ScrollView
        style={globalStyles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {branch && (
          <>
            <View style={globalStyles.section}>
              <Text style={globalStyles.title_1}>Tickets hoy</Text>
              {orders && orders.length > 0 ? (
                <>
                  <OrderList orders={orders} />
                  <Pressable>
                    <Text
                      style={globalStyles.link}
                      onPress={() => {
                        goTo("orders");
                      }}
                    >
                      Ver todas los tickets hoy
                    </Text>
                  </Pressable>
                </>
              ) : (
                <Text>No hay datos que mostrar</Text>
              )}
            </View>
            <View style={globalStyles.section}>
              <Text style={globalStyles.title_1}>Gastos hoy</Text>
              {outcomes && outcomes.length > 0 ? (
                <>
                  <OutcomeList outcomes={outcomes} />
                  <Pressable>
                    <Text
                      style={globalStyles.link}
                      onPress={() => {
                        goTo("outcomes");
                      }}
                    >
                      Ver todas las ventas
                    </Text>
                  </Pressable>
                </>
              ) : (
                <Text>No hay datos que mostrar</Text>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
}
