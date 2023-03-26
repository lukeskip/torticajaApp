import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import React from "react";
import ItemCard from "./ItemCard";

export default function ItemList(props) {
  const { items, loadItems, nextUrl } = props;
  const loadMore = () => {
    loadItems();
  };

  return (
    <FlatList
      data={items}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <ItemCard id={item.id} title={item.name} description={item.address} />
      )}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReachedThreshold={0.01}
      onEndReached={nextUrl && loadMore}
      ListFooterComponent={
        nextUrl && (
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            color="black"
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    backgroundColor: "#EEE",
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 30 : 0,
  },
});
