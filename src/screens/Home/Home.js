import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground
} from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
  H2,
  H3
} from "native-base";
import ResponsiveImage from "react-native-responsive-image";
// import Icon from "react-native-vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  addText,
  loadingTrue,
  loadingFalse,
  addRestaurant
} from "../../store/actions/index";
import { connect } from "react-redux";

import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";
import Swiper from "react-native-swiper";

import restaurante from "../../../restaurante";
import restaurante2 from "../../../restaurante2";

import HomeStyles from "./HomeStyles";

class Home extends Component {
  /**
   *
   */
  state = {
    appJson: "",
    search: "",
    searchLoading: false,
    load_content: false
  };

  /**
   *
   */
  componentDidMount() {
    // this.props.navigation.navigate("DetailView", {
    //   data: restaurante
    // });
    // this.props.navigation.navigate("Favorites");
    // this.props.navigation.navigate("Profile");

    if (this.props.appJson.userdata) {
      this.setState({ load_content: true });
    }
  }
  /**
   *
   * @param {*} buscar
   */
  updateSearch = buscar => {
    if (buscar != "") this.setState({ search: buscar, searchLoading: true });
    else this.setState({ searchLoading: false });
  };

  /**
   *
   */
  loadContent = () => {
    return (
      <View>
        <View>
          <H2 style={HomeStyles.mainTitle}>LUGARES DESTACADOS</H2>
        </View>

        <View style={HomeStyles.swiper_view}>
          <Swiper
            removeClippedSubviews={true}
            loop={true}
            // onIndexChanged={index => console.log(index)}
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
                        onPress={async () => {
                          console.log("Promoted ID: ", promoted.id);
                          await this.props.c_addRestaurant(restaurante);
                          this.props.navigation.navigate("DetailView");
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

        <H2 style={HomeStyles.title}>SITIOS CERCA DE TI</H2>
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
                        onPress={async () => {
                          await this.props.c_addRestaurant(restaurante);
                          this.props.navigation.navigate("DetailView");
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
                          <Text>Precio medio: {nearby.price} €</Text>
                        </Left>
                        <Right style={HomeStyles.nearby_right}>
                          <Text>Puntuación: {nearby.score}</Text>
                        </Right>
                      </CardItem>
                      <CardItem>
                        {nearby.categories.map((category, index) => {
                          return (
                            <View
                              style={HomeStyles.nearby_categories_view}
                              key={index}
                            >
                              <Button
                                onPress={() => {
                                  console.log("Category Id: ", category.id);
                                }}
                              >
                                {/* <Icon active name="thumbs-up" /> */}
                                <Text>{category.value}</Text>
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
        {/* {NaviteBaseMenu.menuLogo(this)} */}

        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={this.state.search}
          showLoading={this.state.searchLoading}
          // platform={"ios"}
        />

        <ScrollView>
          {this.state.load_content ? this.loadContent() : null}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    appJson: state.mainReducer.appJson,
    loading_bar: state.mainReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addKeyValueJSON: (key, value) => dispatch(addText(key, value)),
    c_loadingTrue: () => dispatch(loadingTrue()),
    c_loadingFalse: () => dispatch(loadingFalse()),
    c_addRestaurant: restaurantJSON => dispatch(addRestaurant(restaurantJSON))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
