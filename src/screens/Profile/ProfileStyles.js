import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default StyleSheet.create({
  //
  container: {
    flex: 1,
    backgroundColor: "rgba(46, 50, 72, 1)"
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
    padding: 20,
    color: "#FFF"
  },
  //
  view_form: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    paddingBottom: 30
  },
  logo: {
    marginTop: 20,
    marginBottom: 20
  },
  input_container: {
    width: SCREEN_WIDTH * 0.85
  },
  input_container_style: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(110, 120, 170, 1)",
    height: 50,
    marginVertical: 10
  },
  input_style: {
    marginLeft: 10,
    color: "white"
  },
  button_signup_container_style: {
    marginTop: 10
  },
  button_signup_style: {
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 15,
    height: 50,
    backgroundColor: "rgba(110, 120, 170, 1)"
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
