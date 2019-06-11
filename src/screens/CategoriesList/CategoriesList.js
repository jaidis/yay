import React, { Component } from "react";
import { View, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import {
  loadingTrue,
  loadingFalse,
  favoriteTrue,
  favoriteFalse,
  addRestaurant,
  deleteCategoriesList
} from "../../store/actions/index";
import restaurante from "../../../restaurante.json";

import { Icon } from "react-native-elements";
import { Card, CardItem, Text } from "native-base";
import { FlatGrid } from "react-native-super-grid";
import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";

import CategoriesListStyles from "./CategoriesListStyles";

/**
 * @description
 */
class CategoriesList extends Component {
  static navigationOptions = {
    title: "CategoriesList"
  };

  state = {
    appJson: "",
    count_categories_list: false
  };

  /**
   * @description COMPONENT DO SOMETHING (CUSTOM FUNCTION, NOT IMPLEMENTED AT REACT NATIVE)
   */
  async componentDoSomething() {
    // this.props.c_favoriteTrue();
    try {
      this.props.categoriesList.length > 0
        ? this.setState({ count_categories_list: true })
        : this.setState({ count_categories_list: false });
    } catch (error) {}
  }

  /**
   * @description COMPONENT DID MOUNT
   */
  async componentDidMount() {
    console.log("CategoriesList First Start");
    this.componentDoSomething();
    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        console.log("CategoriesList Listener Start");
        this.componentDoSomething();
      }),
      this.props.navigation.addListener("willBlur", async () => {
        console.log("CategoriesList Listener Exit");
      })
    ];
  }

  componentWillUnmount(){
    this.props.c_deleteCategoriesList();
  }

  /**
   * @description
   */
  renderFavorites = () => {
    return (
      <ScrollView>
        <FlatGrid
          itemDimension={150}
          items={this.props.categoriesList}
          style={{ marginTop: 10, flex: 1 }}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({ item, index }) => (
            <View>
              {/* <Image
                source={{ uri: item.logo }}
                style={{ flex: 1, height: 200, width: null }}
              />
              <Text style={{ fontWeight: "600", fontSize: 12, color: "#fff" }}>
                {item.name}
              </Text> */}
              <Card key={index}>
                <CardItem
                  cardBody
                  button
                  onPress={async () => {
                    // this.props.c_favoriteTrue();
                    await this.props.c_addRestaurant(restaurante);
                    this.props.navigation.navigate("DetailView");
                  }}
                >
                  <Image
                    source={{ uri: item.logo }}
                    style={{ flex: 1, height: 200, width: null }}
                  />
                </CardItem>
                <CardItem
                  cardBody
                  style={{
                    marginTop: 10,
                    justifyContent: "center",
                    paddingBottom: 10
                  }}
                >
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
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
      <View style={CategoriesListStyles.favorites_empty}>
        <Text style={CategoriesListStyles.favorites_empty_text}>
          ¡Vaya, vaya, vaya! Parece que no podemos mostrarte restaurantes, lo
          sentimos. Inténtalo de nuevo y si el problema persiste haznoslo saber.
        </Text>
      </View>
    );
  };

  /**
   * @description
   */
  render() {
    return (
      <View style={CategoriesListStyles.container}>
        {NaviteBaseMenu.menuGoBack(this, "CategoriesList")}
        {this.state.count_categories_list
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
    favorite: state.mainReducer.favorite,
    categoriesList: state.mainReducer.categoriesListJSON
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
    c_favoriteTrue: () => dispatch(favoriteTrue()),
    c_favoriteFalse: () => dispatch(favoriteFalse()),
    c_addRestaurant: restaurantJSON => dispatch(addRestaurant(restaurantJSON)),
    c_deleteCategoriesList: () => dispatch(deleteCategoriesList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesList);
