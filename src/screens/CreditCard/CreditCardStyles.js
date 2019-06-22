import { StyleSheet, Dimensions, Platform } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default StyleSheet.create({
  //
  container: {
    flex: 1,
    backgroundColor: "#2E3248"
  },
  //
  credit_card_view_container: {
    flex: 1,
    marginTop: 50
  },
  //
  credit_card_input_label_style: {
    color: "white"
  },
  //
  credit_card_input_input_style: {
    color: "white"
  },
  //
  credit_card_input_container_style: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#6E78AA",
    paddingTop: 5,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 5
  },
  //
  credit_card_view_button: {
    alignItems: "center"
  }, 
  //
  button_credit_card_container_style: {
    marginTop: 20
  },
  //
  button_credit_card_style: {
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 15,
    height: 50,
    backgroundColor: "#6E78AA"
  },
  //
  button_title_style: {
    marginLeft: 10,
    fontFamily: Platform.OS === "android" ? "bold" : null
  }
});
