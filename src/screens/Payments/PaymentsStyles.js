import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E3248"
  },
  //
  button_profile_container_style: {
    marginTop: 10
  },
  //
  button_profile_style: {
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 15,
    height: 50,
    backgroundColor: "#6E78AA"
  },
  //
  button_title_style: {
    marginLeft: 10,
    fontFamily: "bold"
  }
});
