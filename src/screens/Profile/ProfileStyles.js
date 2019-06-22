import { StyleSheet, Dimensions, Platform } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default StyleSheet.create({
  //
  container: {
    flex: 1,
    backgroundColor: "#2E3248"
  },
  //
  mainTitle: {
    textAlign: "center",
    paddingTop: 30,
    padding: 20,
    color: "#FFF"
  },
  //
  title: {
    textAlign: "center",
    paddingTop: 40,
    padding: 20,
    color: "#FFF"
  },
  //
  view_form: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    paddingBottom: 30
  },
  //
  input_container: {
    width: SCREEN_WIDTH * 0.85
  },
  //
  input_container_style: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#6E78AA",
    height: 50,
    marginVertical: 10
  },
  //
  input_style: {
    marginLeft: 10,
    color: "white"
  },
  //
  input_container_birthdate: {
    width: SCREEN_WIDTH * 0.85,
    paddingLeft: 10,
    paddingRight: 10
  },
  //
  input_container_style_birthdate: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#6E78AA",
    height: 50,
    marginVertical: 10
  },
  //
  input_style_birthdate: {
    marginLeft: 10,
    color: "white",
    fontSize: 18
  },
  //
  icon_birthdate:{
    paddingTop: 10,
    paddingLeft: 15,
    marginRight: -5
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
  button_container_style: {
    marginTop: 20
  },
  //
  button_style: {
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 15,
    height: 50,
    backgroundColor: "#3F51B5"
  },
  //
  button_title_style: {
    fontFamily: Platform.OS === "android" ? "bold" : null
  }
});
