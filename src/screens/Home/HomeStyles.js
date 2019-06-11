import { StyleSheet } from "react-native";

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
    padding: 20,
    color: "#FFF"
  },
  //
  swiper_view: {
    height: 200,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8
  },
  //
  swiper_prev_button: {
    marginLeft: -10,
    padding: 10
  },
  //
  swiper_next_button: {
    marginRight: -10,
    padding: 10
  },
  //
  swiper_internal_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  //
  swiper_image_background_style: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  //
  swiper_image_background_image_style: {
    opacity: 0.5,
    borderRadius: 10,
    backgroundColor: "#000"
  },
  //
  swiper_text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "normal",
    padding: 20
  },
  //
  nearby_grid: {
    marginBottom: 20
  },
  nearby_image: {
    flex: 1,
    height: 200,
    width: null
  },
  //
  nearby_text: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 20
  },
  //
  nearby_right: {
    marginRight: 15
  },
  //
  nearby_categories_view: {
    margin: 3
  }
});
