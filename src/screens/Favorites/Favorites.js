import React, { Component } from "react";
import { View, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import { favoriteTrue, favoriteFalse } from "../../store/actions/index";
import restaurante from "../../../restaurante.json";

import { Icon } from "react-native-elements";
import { Card, CardItem, Text } from "native-base";
import { FlatGrid } from "react-native-super-grid";
import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";

import FavoritesStyles from "./FavoritesStyles";

/**
 * @description
 */
class Favorites extends Component {
  static navigationOptions = {
    title: "Favorites"
  };

  state = {
    appJson: "",
    count_favorites: false
  };

  /**
   * @description COMPONENT DO SOMETHING (CUSTOM FUNCTION, NOT IMPLEMENTED AT REACT NATIVE)
   */
  async componentDoSomething() {
    this.props.c_favoriteTrue();
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
    console.log("Favorites First Start");
    this.componentDoSomething();
    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        console.log("Favorites Listener Start");
        this.componentDoSomething();
      }),
      this.props.navigation.addListener("willBlur", async () => {
        console.log("Favorites Listener Exit");
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
          itemDimension={130}
          items={this.props.appJson.userdata.favorites}
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
                  onPress={() => {
                    this.props.c_favoriteTrue();
                    this.props.navigation.navigate("DetailView", {
                      data: restaurante
                    });
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
      <View style={FavoritesStyles.favorites_empty}>
        <Text style={FavoritesStyles.favorites_empty_text}>
          ¡Vaya, vaya, vaya! Parece que no tienes favoritos, ¿Porqué no miras
          algún restaurante en la aplicación? Quizás te acabe gustando lo que
          ves y puedas guardarlo como favorito
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
        {NaviteBaseMenu.menuGoBack(this, "Favorites")}
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
    c_favoriteFalse: () => dispatch(favoriteFalse())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
