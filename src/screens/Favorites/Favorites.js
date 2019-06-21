import React, { Component } from "react";
import { View, Image, ScrollView, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import {
  favoriteTrue,
  favoriteFalse,
  addRestaurant
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
import FavoritesStyles from "./FavoritesStyles";

/**
 * @description
 */
class Favorites extends Component {
  static navigationOptions = {
    title: i18n.t("favorites_view_title")
  };

  state = {
    appJson: "",
    count_favorites: false
  };

  /**
   * @description COMPONENT DO SOMETHING (CUSTOM FUNCTION, NOT IMPLEMENTED AT REACT NATIVE)
   */
  async componentDoSomething() {
    // this.props.c_favoriteTrue();
    try {
      this.props.appJson.userdata.favorites.length > 0
        ? this.setState({ count_favorites: true })
        : this.setState({ count_favorites: false });
    } catch (error) {}
  }

  /**
   * @description COMPONENT DID MOUNT
   */
  async componentDidMount() {
    // console.log("Favorites First Start");
    this.componentDoSomething();
    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        // console.log("Favorites Listener Start");
        this.componentDoSomething();
      }),
      this.props.navigation.addListener("willBlur", async () => {
        // console.log("Favorites Listener Exit");
      })
    ];
  }

  /**
   * @description
   */
  loadDetailView = async item => {
    NetInfo.isConnected
      .fetch()
      .then(async isConnected => {
        if (isConnected) {
          try {
            this.props.c_favoriteTrue();

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
  };

  /**
   * @description
   */
  renderFavorites = () => {
    return (
      <ScrollView>
        <FlatGrid
          itemDimension={150}
          items={this.props.appJson.userdata.favorites}
          style={FavoritesStyles.favorites_flat_grid_style}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({ item, index }) => (
            <View>
              <Card key={index}>
                <CardItem
                  cardBody
                  button
                  onPress={() => {
                    this.loadDetailView(item);
                  }}
                >
                  <Image
                    source={{ uri: item.logo }}
                    style={FavoritesStyles.favorites_card_item_image_style}
                  />
                </CardItem>
                <CardItem
                  cardBody
                  style={FavoritesStyles.favorites_card_item_style}
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
      <View style={FavoritesStyles.favorites_empty}>
        <Text style={FavoritesStyles.favorites_empty_text}>
          {i18n.t("favorites_empty")}
        </Text>
      </View>
    );
  };

  /**
   * @description
   */
  render() {
    return (
      <View style={FavoritesStyles.container}>
        {NaviteBaseMenu.menuGoHome(this, i18n.t("favorites_view_title"))}
        {this.state.count_favorites
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
    c_favoriteTrue: () => dispatch(favoriteTrue()),
    c_favoriteFalse: () => dispatch(favoriteFalse()),
    c_addRestaurant: restaurantJSON => dispatch(addRestaurant(restaurantJSON))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
