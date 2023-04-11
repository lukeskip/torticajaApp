import { View, Text, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { getData } from "../api/api-connections";
import ItemList from "../components/ItemList";
import { API_HOST } from "../utils/constants";

export default function BranchScreen(props) {
  const { branch } = props;
  [items, setItems] = useState([]);
  [nextUrl, setNextUrl] = useState(null);
  useEffect(() => {
    (async () => {
      await loadItems();
    })();
  }, []);

  const loadItems = async () => {
    try {
      const response = await getData(nextUrl || "/branches/" + branch);
      setItems([...items, ...response.data]);
      setNextUrl(response.links.next);
    } catch (error) {
      console.log(error);
    }
  };
  const { navigation } = props;

  return (
    <SafeAreaView>
      <ItemList nextUrl={nextUrl} items={items} loadItems={loadItems} />
    </SafeAreaView>
  );
}
