import React, { Component } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { addCategoriesList } from "../../store/actions/index";

import { Text, H3 } from "native-base";
import { FlatGrid } from "react-native-super-grid";

// FUNCTIONS OR HELPERS
import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";

// LANGUAGES LIBRARY
import { setI18nConfig } from "../../../languages/i18n";
var i18n = setI18nConfig();

// STYLES
import CategoriesStyles from "./CategoriesStyles";

/**
 * @description
 */
class Categories extends Component {
  static navigationOptions = {
    title: i18n.t("categories_title")
  };

  state = {
    appJson: "",
    count_categories: false
  };

  /**
   * @description COMPONENT DO SOMETHING (CUSTOM FUNCTION, NOT IMPLEMENTED AT REACT NATIVE)
   */
  async componentDoSomething() {
    // this.props.c_favoriteTrue();
    try {
      this.props.appJson.userdata.categories.length > 0
        ? this.setState({ count_categories: true })
        : this.setState({ count_categories: false });
    } catch (error) {}
  }

  /**
   * @description COMPONENT DID MOUNT
   */
  async componentDidMount() {
    // console.log("Categories First Start");
    this.componentDoSomething();
    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        // console.log("Categories Listener Start");
        this.componentDoSomething();
      }),
      this.props.navigation.addListener("willBlur", async () => {
        // console.log("Categories Listener Exit");
      })
    ];
  }

  /**
   * @description Renderiza las categorías disponibles en la aplicación
   */
  renderFavorites = () => {
    return (
      <ScrollView>
        <FlatGrid
          itemDimension={200}
          items={this.props.appJson.userdata.categories}
          style={CategoriesStyles.categories_flat_grid_style}
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity
                onPress={async () => {
                  // console.log("Item ID: ", item.id);
                  await this.props.c_addCategoriesList(item.list);
                  this.props.navigation.navigate("CategoriesList");
                }}
              >
                <View key={index} style={CategoriesStyles.swiper_internal_view}>
                  <ImageBackground
                    source={{ uri: item.logo }}
                    style={CategoriesStyles.swiper_image_background_style}
                    imageStyle={
                      CategoriesStyles.swiper_image_background_image_style
                    }
                  >
                    <H3 style={CategoriesStyles.swiper_text}>{item.name}</H3>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    );
  };

  /**
   * @description
   */
  renderEmpty = () => {
    return (
      <View style={CategoriesStyles.categories_empty}>
        <Text style={CategoriesStyles.categories_empty_text}>
          {i18n.t("categories_empty")}
        </Text>
      </View>
    );
  };

  /**
   * @description
   */
  render() {
    return (
      <View style={CategoriesStyles.container}>
        {NaviteBaseMenu.menuGoHome(this, i18n.t("categories_title"))}
        {this.state.count_categories
          ? this.renderFavorites()
          : this.renderEmpty()}
      </View>
    );
  }
}

/**
 * @description
 * @param {*} state
 */
const mapStateToProps = state => {
  return {
    appJson: state.mainReducer.appJson,
    loading_bar: state.mainReducer.loading,
    favorite: state.mainReducer.favorite
  };
};

/**
 * @description
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    c_loadingTrue: () => dispatch(loadingTrue()),
    c_loadingFalse: () => dispatch(loadingFalse()),
    c_addCategoriesList: categoriesList =>
      dispatch(addCategoriesList(categoriesList))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
