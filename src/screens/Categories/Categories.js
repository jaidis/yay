import React, { Component } from "react";
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import {
  loadingTrue,
  loadingFalse,
  addCategoriesList,
  deleteCategoriesList
} from "../../store/actions/index";

import { Icon } from "react-native-elements";
import { Card, CardItem, Text, H3 } from "native-base";
import { FlatGrid } from "react-native-super-grid";
import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";

import CategoriesStyles from "./CategoriesStyles";

/**
 * @description
 */
class Categories extends Component {
  static navigationOptions = {
    title: "Categories"
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
    console.log("Categories First Start");
    this.componentDoSomething();
    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        console.log("Categories Listener Start");
        this.componentDoSomething();
      }),
      this.props.navigation.addListener("willBlur", async () => {
        console.log("Categories Listener Exit");
      })
    ];
  }

  /**
   * @description
   */
  renderFavorites = () => {
    return (
      <ScrollView>
        <FlatGrid
          itemDimension={200}
          items={this.props.appJson.userdata.categories}
          style={{flex: 1,  marginTop: 10, marginLeft: 5, marginRight:5}}
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity
                onPress={async () => {
                  console.log("Item ID: ", item.id);
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
      <View style={CategoriesStyles.favorites_empty}>
        <Text style={CategoriesStyles.favorites_empty_text}>
          ¡Vaya, vaya, vaya! Parece que no podemos mostrarte las categorías, lo sentimos.
          Inténtalo de nuevo y si el problema persiste haznoslo saber.
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
        {NaviteBaseMenu.menuGoHome(this, "Categories")}
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
    c_addCategoriesList: categoriesList => dispatch(addCategoriesList(categoriesList))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
