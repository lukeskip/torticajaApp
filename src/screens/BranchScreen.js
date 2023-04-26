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
import { useFocusEffect } from "@react-navigation/native";

export default function BranchScreen(props) {
  const { auth, branch, logout } = useAuth();
  const [incomes, setIncomes] = useState([]);
  const [outcomes, setOutcomes] = useState(null);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const { navigation } = props;

  useEffect(() => {
    console.log(branch);
  }, [branch]);

  return (
    <ScrollView
      style={[globalStyles.content, { marginTop: 40 }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Pressable onPress={() => logout()}>
        <Text>Logout</Text>
      </Pressable>
      {branch && (
        <>
          <View style={globalStyles.section}>
            <Text style={globalStyles.title_1}>Ventas hoy</Text>
            {incomes.length > 0 ? (
              <IncomeList incomes={incomes} />
            ) : (
              <Text style={globalStyles.title_2}>No hay datos que mostrar</Text>
            )}
          </View>
          <View style={globalStyles.section}>
            <Text style={globalStyles.title_1}>Gastos hoy</Text>
            <OutcomeList outcomes={outcomes} />
          </View>
        </>
      )}
    </ScrollView>
  );
}
