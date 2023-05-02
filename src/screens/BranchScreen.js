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
import { API_HOST } from "../utils/constants";
import { globalStyles } from "../utils/globalStyles";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import UserInfo from "../components/UserInfo";

export default function BranchScreen(props) {
  const { auth, branch, role, logout } = useAuth();
  const [incomes, setIncomes] = useState([]);
  const [outcomes, setOutcomes] = useState(null);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const goTo = (url) => {
    switch (url) {
      case "outcomes":
        navigation.navigate("outcomeScreen");
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
            <Text style={globalStyles.title_1}> {branch.name}</Text>
            <View style={globalStyles.section}>
              <Text style={globalStyles.title_1}>Ventas hoy</Text>
              {incomes.length > 0 ? (
                <>
                  <IncomeList incomes={incomes} />
                  <Pressable>
                    <Text
                      style={globalStyles.link}
                      onPress={() => {
                        goTo("incomes");
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
            <View style={globalStyles.section}>
              <Text style={globalStyles.title_1}>Gastos hoy</Text>
              {outcomes.length > 0 ? (
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
