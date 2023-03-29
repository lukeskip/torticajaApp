import { StyleSheet } from "react-native";
import { colors } from "./constants";
export const globalStyles = StyleSheet.create({
  content: {
    padding: 20,
    marginVertical: 10,
  },
  contentCenter: {
    justifyContent: "center",
    flex: 1,
  },
  title_1: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  title_2: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },
  title_3: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  listContent: {},
  item: {
    marginVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.grayDark,
    borderBottomStyle: "solid",
  },
  button: {
    borderRadius: 10,
    backgroundColor: colors.mainColor,
    marginVertical: 20,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    textTransform: "uppercase",
  },
  pill: {
    backgroundColor: colors.mainColor,
    color: "white",
    borderRadius: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 10,
    fontStyle: "italic",
  },
  textInput: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    color: colors.error,
  },
});
