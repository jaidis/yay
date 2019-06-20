import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //
  container: {
    flex: 1,
    backgroundColor: "#2E3248"
  },
  //
  categories_empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  //
  categories_empty_text: {
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
    padding: 10
  },
  //
  categories_flat_grid_style: {
    flex: 1,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  //
  swiper_internal_view: {
    height: 150,
    marginTop: 5,
    marginBottom: 5,
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
    padding: 1
  }
});
