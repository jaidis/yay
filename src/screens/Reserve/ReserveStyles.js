import { StyleSheet, Dimensions, Platform } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default StyleSheet.create({
  //
  container: {
    flex: 1,
    backgroundColor: "#2E3248"
  },
  //
  reserve_scroll_view: {
    flex: 1,
    margin: 20
  },
  //
  reserve_card_style: {
    paddingBottom: 20
  },
  //
  reserve_card_image: {
    flex: 1,
    height: 200,
    width: null
  },
  //
  reserve_card_item_title_style: {
    marginTop: 30,
    alignContent: "center",
    justifyContent: "center"
  },
  //
  reserve_card_item_style: {
    marginTop: 20
  },
  //
  reserve_date_picker_style: {
    width: 200
  },
  //
  reserve_picker_style: {
    marginLeft: 10
  },
  //
  reserve_picker_color_style: {
    color: "#6e78aa"
  },
  //
  view_form: {
    alignItems: "center"
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
    borderColor: "#6E78AA",
    height: 50,
    marginVertical: 10
  },
  //
  input_style_date_input: {
    borderColor: "#FFF",
    alignItems: "flex-start",
    marginLeft: 10,
    marginTop: 5
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
  //
  button_reserve_container_style: {
    marginTop: 10
  },
  //
  button_reserve_style: {
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 15,
    height: 50,
    backgroundColor: "#6E78AA"
  },
  //
  button_title_style: {
    fontFamily: Platform.OS === "android" ? "bold" : null
  }
});
