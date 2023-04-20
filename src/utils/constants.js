import { Platform } from "react-native";
export const API_HOST =
  Platform.OS === "android"
    ? "http://10.0.2.2:8000/api/v1"
    : "http://192.168.5.101:8000/api/v1";
export const WEB_HOST =
  Platform.OS === "android"
    ? "http://192.168.5.101:8000/"
    : "http://192.168.5.101:8000/";
export const colors = {
  mainColor: "#c4203b",
  error: "#f70d3a",
  success: "#80b228",
  secondaryColor: "#8fc121",
  gray: "#999999",
  grayDark: "#636362",
  grayLight: "#E3E3E3",
};
