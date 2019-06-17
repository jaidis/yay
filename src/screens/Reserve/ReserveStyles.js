import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E3248"
  },
  view_form: {
    alignItems: "center",
    // paddingBottom: 30
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
    color: "#2E3248"
  },
  //
  input_container_date_time: {
    width: SCREEN_WIDTH * 0.85,
    paddingLeft: 10,
    paddingRight: 10
  },
  //
  input_container_style_date_time: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(110, 120, 170, 1)",
    height: 50,
    marginVertical: 10
  },
  //
  input_style_date_time: {
    marginLeft: 10,
    color: "#2E3248",
    fontSize: 18
  },
  //
  icon_date_time: {
    paddingTop: 10,
    paddingLeft: 15,
    marginRight: -5
  },
  button_reserve_container_style: {
    marginTop: 10
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
