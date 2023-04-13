import { StyleSheet, Platform } from "react-native";
import { colors } from "./constants";
export const globalStyles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
  contentCenter: {
    justifyContent: "center",
    flex: 1,
  },
  contentMarginTop: {
    marginTop: 20,
  },
  header: {
    backgroundColor: colors.mainColor,
    height: 70,
    marginTop: 40,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title_1: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title_2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title_3: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listContent: {},
  item: {
    borderBottomWidth: 1,
    borderColor: colors.grayLight,
    borderBottomStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 10,
    lineHeight: 100,
    height: 60,
  },
  icon: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.greyDark,
    padding: 10,
    borderRadius: 30,
  },
  iconTab: {
    backgroundColor: colors.mainColor,
    marginTop: -20,
    width: 60,
    height: 60,
    textAlign: "center",
    borderRadius: 60,
    alignItems: "center",
    flex: 1,

    fontSize: 18,
  },
  button: {
    borderRadius: 10,
    backgroundColor: colors.mainColor,
    paddingVertical: 10,
  },
  buttonCancel: {
    backgroundColor: colors.error,
  },
  buttonSuccess: {
    backgroundColor: colors.success,
  },
  top_right: {
    position: "absolute",
    right: 40,
    top: 40,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  transparentButton: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    padding: 5,
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
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
    paddingLeft: 5,
    marginBottom: 5,
  },
  flex: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexItem: {
    paddingHorizontal: 5,
  },
  card: {
    flex: 1,
    padding: 20,
    height: 200,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  footerText: {
    textAlign: "center",
  },
  error: {
    color: colors.error,
  },
  barCodeContainer: {
    height: Platform.OS === "web" ? "100vh" : "100%",
    marginTop: 40,
  },
  targetImage: {
    position: "absolute",
    width: 300,
    height: 300,
    top: "50%",
    left: "50%",
    marginTop: -150,
    marginLeft: -150,
  },
});
