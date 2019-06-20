import React, { Component } from "react";
import { View, Image, ScrollView, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import {
  favoriteTrue,
  favoriteFalse,
  addRestaurant,
  deleteCategoriesList
} from "../../store/actions/index";

import { Card, CardItem, Text } from "native-base";
import { FlatGrid } from "react-native-super-grid";

// FUNCTIONS OR HELPERS
import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";
import * as AppConsts from "../../../config/app_consts";
import * as YAY_Api from "../../functions/YAY_Api_helper";

// LANGUAGES LIBRARY
import { setI18nConfig } from "../../../languages/i18n";
var i18n = setI18nConfig();

// STYLES
import CategoriesListStyles from "./CategoriesListStyles";

/**
 * @description
 */
class CategoriesList extends Component {
  static navigationOptions = {
    title: i18n.t("categories_list_title")
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
    // console.log("CategoriesList First Start");
    this.componentDoSomething();
    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        // console.log("CategoriesList Listener Start");
        this.componentDoSomething();
      }),
      this.props.navigation.addListener("willBlur", async () => {
        // console.log("CategoriesList Listener Exit");
      })
    ];
  }
  /**
   * @description COMPONENT WILL UNMOUNT
   */
  componentWillUnmount() {
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
              <Card key={index}>
                <CardItem
                  cardBody
                  button
                  onPress={async () => {
                    NetInfo.isConnected
                      .fetch()
                      .then(async isConnected => {
                        if (isConnected) {
                          try {
                            let restaurantJSON = {
                              id_restaurant: item.id_restaurant
                            };

                            let response = await YAY_Api.fetchInternetDataAsync(
                              AppConsts.URL_RESTAURANT,
                              await YAY_Api.getRequestPostAsync(restaurantJSON)
                            );

                            if (response.status === "success") {
                              await this.props.c_addRestaurant(response);
                              this.props.navigation.navigate("DetailView");
                            } else {
                              console.log(response);
                            }
                          } catch (error) {
                            console.log(error);
                          }
                        } else {
                          Alert.alert(
                            i18n.t("internet_error_word"),
                            i18n.t("internet_error_message"),
                            [{ text: "OK" }],
                            { cancelable: false }
                          );
                        }
                      })
                      .catch(error => {
                        console.log(error);
                      });
                  }}
                >
                  <Image
                    source={{ uri: item.logo }}
                    style={CategoriesListStyles.categories_list_image_style}
                  />
                </CardItem>
                <CardItem
                  cardBody
                  style={CategoriesListStyles.categories_list_card_item_style}
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
      <View style={CategoriesListStyles.categories_list_empty}>
        <Text style={CategoriesListStyles.categories_list_empty_text}>
        {i18n.t("categories_list_empty")}
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
        {NaviteBaseMenu.menuGoBack(this, i18n.t("categories_list_title"))}
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
