import React, { Component } from "react";
import { View, ScrollView, Image, ImageBackground, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import { addRestaurant } from "../../store/actions/index";

import { SearchBar, Icon } from "react-native-elements";
import {
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Right,
  H2,
  H3
} from "native-base";

import { Col, Row, Grid } from "react-native-easy-grid";
import Swiper from "react-native-swiper";

// FUNCTIONS OR HELPERS
import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";
import * as AppConsts from "../../../config/app_consts";
import * as YAY_Api from "../../functions/YAY_Api_helper";

// LANGUAGES LIBRARY
import { setI18nConfig } from "../../../languages/i18n";
var i18n = setI18nConfig();

// STYLES
import HomeStyles from "./HomeStyles";

class Home extends Component {
  static navigationOptions = {
    title: i18n.t("credit_card_title")
  };

  state = {
    appJson: "",
    search: "",
    searchLoading: false,
    load_content: false
  };

  /**
   * @description
   */
  componentDidMount() {
    if (this.props.appJson.userdata) {
      this.setState({ load_content: true });
    }
  }
  /**
   * @description
   * @param {*} buscar
   */
  updateSearch = buscar => {
    if (buscar != "") this.setState({ search: buscar, searchLoading: true });
    else this.setState({ searchLoading: false });
  };

  /**
   * @description
   */
  loadDetailView = async item => {
    NetInfo.isConnected
      .fetch()
      .then(async isConnected => {
        if (isConnected) {
          try {
            let restaurantJSON = {
              id_restaurant: item.id
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
  loadContent = () => {
    return (
      <View>
        <View>
          <H2 style={HomeStyles.mainTitle}>
            {i18n.t("home_view_featured_places").toUpperCase()}
          </H2>
        </View>

        <View style={HomeStyles.swiper_view}>
          <Swiper
            removeClippedSubviews={true}
            loop={true}
            prevButton={
              <Icon
                name="chevron-left"
                color="#FFF"
                size={30}
                iconStyle={HomeStyles.swiper_prev_button}
              />
            }
            nextButton={
              <Icon
                name="chevron-right"
                color="#FFF"
                size={30}
                iconStyle={HomeStyles.swiper_next_button}
              />
            }
            showsButtons={true}
            showsPagination={true}
            autoplay={true}
            autoplayTimeout={10}
          >
            {this.props.appJson.userdata.promoted_content.map(
              (promoted, index) => {
                return (
                  <View key={index} style={HomeStyles.swiper_internal_view}>
                    <ImageBackground
                      source={{ uri: promoted.logo }}
                      style={HomeStyles.swiper_image_background_style}
                      imageStyle={
                        HomeStyles.swiper_image_background_image_style
                      }
                    >
                      <H3
                        style={HomeStyles.swiper_text}
                        onPress={() => {
                          this.loadDetailView(promoted);
                        }}
                      >
                        {promoted.name}
                      </H3>
                    </ImageBackground>
                  </View>
                );
              }
            )}
          </Swiper>
        </View>

        <H2 style={HomeStyles.title}>
          {i18n.t("home_view_near_places").toUpperCase()}
        </H2>
        <View>
          <Content>
            {this.props.appJson.userdata.nearby_content.map((nearby, index) => {
              return (
                <Grid key={index} style={HomeStyles.nearby_grid}>
                  <Col size={7} />
                  <Col size={86}>
                    <Card>
                      <CardItem
                        cardBody
                        button
                        onPress={() => {
                          this.loadDetailView(nearby);
                        }}
                      >
                        <Image
                          source={{ uri: nearby.logo }}
                          style={HomeStyles.nearby_image}
                        />
                      </CardItem>
                      <CardItem cardBody>
                        <Text style={HomeStyles.nearby_text}>
                          {nearby.name}
                        </Text>
                      </CardItem>
                      <CardItem cardBody>
                        <Left>
                          <Text>
                            {i18n.t("home_view_average_price")} {nearby.price}€
                          </Text>
                        </Left>
                        <Right style={HomeStyles.nearby_right}>
                          <Text>
                            {i18n.t("home_view_score")}
                            {nearby.score}
                          </Text>
                        </Right>
                      </CardItem>
                      <CardItem>
                        {nearby.categories.map((category, index) => {
                          return (
                            <View
                              style={HomeStyles.nearby_categories_view}
                              key={index}
                            >
                              <Button small bordered>
                                <Text>{category.name}</Text>
                              </Button>
                            </View>
                          );
                        })}
                      </CardItem>
                    </Card>
                  </Col>
                  <Col size={7} />
                </Grid>
              );
            })}
          </Content>
        </View>
      </View>
    );
  };

  /**
   *
   */
  render() {
    return (
      <View style={HomeStyles.container}>
        {NaviteBaseMenu.menuLogo(this)}

        {/* <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={this.state.search}
          showLoading={this.state.searchLoading}
          // platform={"ios"}
        /> */}

        <ScrollView>
          {this.state.load_content ? this.loadContent() : null}
        </ScrollView>
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
    loading_bar: state.mainReducer.loading
  };
};

/**
 * @description
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    c_addRestaurant: restaurantJSON => dispatch(addRestaurant(restaurantJSON))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
