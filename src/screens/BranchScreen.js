import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { getData } from "../api/api-connections";
import OrderList from "../components/OrderList";
import OutcomeList from "../components/OutcomeList";
import { API_HOST } from "../utils/constants";
import { globalStyles } from "../utils/globalStyles";
import useAuth from "../hooks/useAuth";

export default function BranchScreen(props) {
  const { auth, branch } = useAuth();
  [incomes, setIncomes] = useState([]);
  [outcomes, setOutcomes] = useState([]);
  [status, setStatus] = useState(false);

  useEffect(() => {
    (async () => {
      await loadItems();
    })();
  }, [branch]);

  const loadItems = async () => {
    if (branch) {
      try {
        const response = await getData(API_HOST + "/branches/" + branch, auth);
        console.log(response.data.outcomes);
        setOutcomes(response.data.outcomes);
        setStatus(response.data.status);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const { navigation } = props;

  return (
    <ScrollView style={globalStyles.content}>
      {status && branch ? (
        <>
          <Text style={globalStyles.title_1}>Ventas</Text>
          <OrderList />
          <Text style={globalStyles.title_1}>Gastos</Text>
          <OutcomeList outcomes={outcomes} />
        </>
      ) : (
        <Text style={globalStyles.title_1}>No hay datos que mostrar</Text>
      )}
    </ScrollView>
  );
}
