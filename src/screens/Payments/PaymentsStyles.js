import { StyleSheet, Dimensions, Platform } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default StyleSheet.create({
  //
  container: {
    flex: 1,
    backgroundColor: "#2E3248"
  },
  //
  payments_view_container: {
    flex: 1,
    width: SCREEN_WIDTH * 0.8
  },
  //
  payments_scroll_view_container: {
    alignItems: "center",
    justifyContent: "center"
  },
  //
  payments_grid_style: {
    marginBottom: 20
  },
  //
  payments_card_style: {
    marginTop: 40
  },
  //
  payments_card_item_header_style: {
    backgroundColor: "#3F51B5"
  },
  //
  payments_card_item_text: {
    color: "white"
  },
    //
    payments_card_item_number_style: {
      marginLeft: 10
    },
  //
  button_profile_container_style: {
    marginTop: 10
  },
  //
  button_credit_card_style: {
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 15,
    height: 50,
    backgroundColor: "#6E78AA"
  },
  //
  button_paypal_style: {
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 15,
    height: 50,
    backgroundColor: "#3F51B5"
  },
  //
  button_title_style: {
    marginLeft: 10,
    fontFamily: Platform.OS === "android" ? "bold" : null
  }
});
