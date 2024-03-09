import {
  View,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import OutcomeList from "../components/OutcomeList";
import { useFocusEffect } from "@react-navigation/native";
import { getData } from "../api/api-connections";
import useAuth from "../hooks/useAuth";
import { globalStyles } from "../utils/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../utils/constants";

export default function OutcomeScreen() {
  const { auth, branch } = useAuth();
  const [outcomes, setOutcomes] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();
  const goTo = () => {
    navigation.navigate("createOutcome");
  };
  const loadItems = async () => {
    try {
      const response = await getData("/outcomes", auth);
      console.log(response.outcomes);
      setOutcomes(response.outcomes);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        await loadItems().catch((error) => console.log(error));
      })();
    }, [])
  );

  const onRefresh = React.useCallback(async () => {
    await loadItems().catch((error) => console.log(error));
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      style={[globalStyles.content, { marginTop: 40 }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Pressable style={globalStyles.button} onPress={goTo}>
        <Text style={globalStyles.buttonText}>Crear Gasto</Text>
      </Pressable>
      <View style={{ marginTop: 20 }}>
        {outcomes ? (
          <OutcomeList
            loadItems={loadItems}
            edition={true}
            outcomes={outcomes}
          />
        ) : (
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            color="black"
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  spinner: {
    marginTop: 100,
  },
});
