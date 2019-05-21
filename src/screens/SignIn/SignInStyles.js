import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(46, 50, 72, 1)"
  },
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
    borderColor: "#6E78AA",
    height: 50,
    marginVertical: 10
  },
  input_style: {
    marginLeft: 10,
    color: "white"
  },
  button_signin_container_style: {
    marginTop: 10
  },
  button_signin_style: {
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 15,
    height: 50,
    backgroundColor: "#6E78AA"
  },
  button_container_style:{
    marginTop: 20
  },
  button_style:{
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 15,
    height: 50,
    backgroundColor: "#3F51B5"
  },
  button_title_style:{
    fontFamily: "bold"
  }
});
