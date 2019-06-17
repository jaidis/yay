import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E3248"
  },
  logo: {
    marginBottom: 20
  },
  view_empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  view_empty_text: {
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
    padding: 10
  },
  button_reserve_container_style: {
    marginTop: 20
  },
  button_reserve_style: {
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 15,
    height: 50,
    backgroundColor: "#6E78AA"
  },
  button_container_style: {
    marginTop: 20
  },
  button_style: {
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 15,
    height: 50,
    backgroundColor: "#3F51B5"
  },
  button_title_style: {
    fontFamily: "bold"
  }
});
