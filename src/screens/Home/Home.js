import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground
} from "react-native";
import { SearchBar } from "react-native-elements";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
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
import { addText } from "../../store/actions/index";
import { connect } from "react-redux";

import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";
import Swiper from "react-native-swiper";

import restaurante from "../../../restaurante";
import restaurante2 from "../../../restaurante2";

class Home extends Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    appJson: "",
    search: "",
    searchLoading: false
  };

  componentDidMount() {
    // this.props.navigation.navigate("DetailView", {
    //   data: restaurante
    // });
  }

  updateSearch = buscar => {
    if (buscar != "") this.setState({ search: buscar, searchLoading: true });
    else this.setState({ searchLoading: false });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* {NaviteBaseMenu.menuLogo(this)} */}

        <ScrollView>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={this.state.search}
            showLoading={this.state.searchLoading}
            // platform={"ios"}
          />

          <H2 style={{ textAlign: "center", paddingTop: 30, padding: 20 }}>
            LUGARES DESTACADOS
          </H2>

          <View style={{ height: 200, padding: 5 }}>
            <Swiper
              removeClippedSubviews={true}
              loop={true}
              onIndexChanged={index => console.log(index)}
              nextButton={
                <Text style={{ color: "#fff", fontSize: 26, padding: 10 }}>
                  ›
                </Text>
              }
              prevButton={
                <Text style={{ color: "#fff", fontSize: 26, padding: 10 }}>
                  ‹
                </Text>
              }
              showsButtons={true}
              showsPagination={true}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ImageBackground
                  source={{ uri: "https://i.imgur.com/B6jXDpJ.jpg" }}
                  style={{
                    flex: 1,
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10
                  }}
                  imageStyle={{
                    opacity: 0.5,
                    borderRadius: 10,
                    backgroundColor: "#000"
                  }}
                >
                  <H3
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontWeight: "normal",
                      padding: 20
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("DetailView", {
                        data: restaurante
                      });
                    }}
                  >
                    Pijo's Restaurant
                  </H3>
                </ImageBackground>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ImageBackground
                  source={{ uri: "https://i.imgur.com/XoQ4Z9q.jpg" }}
                  style={{
                    flex: 1,
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10
                  }}
                  imageStyle={{
                    opacity: 0.65,
                    borderRadius: 10,
                    backgroundColor: "#555555"
                  }}
                >
                  <H3
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontWeight: "normal",
                      padding: 20
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("DetailView", {
                        data: restaurante2
                      });
                    }}
                  >
                    Burguer's Restaurant
                  </H3>
                </ImageBackground>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ImageBackground
                  source={{ uri: "https://i.imgur.com/DIWQi4c.jpg" }}
                  style={{
                    flex: 1,
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10
                  }}
                  imageStyle={{
                    opacity: 0.65,
                    borderRadius: 10,
                    backgroundColor: "#555555"
                  }}
                >
                  <H3
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontWeight: "normal",
                      padding: 20
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("DetailView");
                    }}
                  >
                    Casa di Pepe
                  </H3>
                </ImageBackground>
              </View>
            </Swiper>
          </View>

          {/* <Card
            containerStyle={{ marginTop: 15, marginBottom: 15 }}
            title="TILES"
          >
            <View style={{ paddingTop: 20 }}>
              <Tile
                imageSrc={{
                  uri:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg/320px-Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg"
                }}
                title="Half Dome, Yosemite"
                titleStyle={{ fontSize: 20 }}
                activeOpacity={1}
                width={300}
                contentContainerStyle={{ height: 70 }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ color: "green" }}>Visit</Text>
                  <Text style={{ color: "blue" }}>Find out More</Text>
                </View>
              </Tile>
            </View>
          </Card> */}

          <H2 style={{ textAlign: "center", padding: 20 }}>
            SITIOS CERCA DE TI
          </H2>

          <View>
            <Content>
              <Card>
                <CardItem
                  cardBody
                  button
                  onPress={() => {
                    this.props.navigation.navigate("DetailView", {
                      data: restaurante
                    });
                  }}
                >
                  <Image
                    source={{ uri: "https://i.imgur.com/B6jXDpJ.jpg" }}
                    style={{
                      height: 200,
                      width: null,
                      flex: 1
                    }}
                  />
                </CardItem>
                <CardItem style={{ margin: 0 }}>
                  <Text>Pijo's Restaurant</Text>
                </CardItem>
                <CardItem>
                  <Left style={{ marginLeft: 0 }}>
                    <Button>
                      {/* <Icon active name="thumbs-up" /> */}
                      <Text>Categoria: Arroz</Text>
                    </Button>
                  </Left>
                  <Right>
                    <Text>Precio medio: XX€</Text>
                  </Right>
                </CardItem>
              </Card>
              <Card>
                <CardItem
                  cardBody
                  button
                  onPress={() => {
                    this.props.navigation.navigate("DetailView", {
                      data: restaurante2
                    });
                  }}
                >
                  <Image
                    source={{ uri: "https://i.imgur.com/XoQ4Z9q.jpg" }}
                    style={{
                      height: 200,
                      width: null,
                      flex: 1
                    }}
                  />
                </CardItem>
                <CardItem style={{ margin: 0 }}>
                  <Text>Burguer's Restaurant</Text>
                </CardItem>
                <CardItem>
                  <Left style={{ marginLeft: 0 }}>
                    <Button>
                      {/* <Icon active name="thumbs-up" /> */}
                      <Text>Categoria: Burguer</Text>
                    </Button>
                  </Left>
                  <Right>
                    <Text>Precio medio: XX€</Text>
                  </Right>
                </CardItem>
              </Card>
              <Card>
                <CardItem
                  cardBody
                  button
                  onPress={() => {
                    this.props.navigation.navigate("DetailView");
                  }}
                >
                  <Image
                    source={{ uri: "https://i.imgur.com/DIWQi4c.jpg" }}
                    style={{
                      height: 200,
                      width: null,
                      flex: 1
                    }}
                  />
                </CardItem>
                <CardItem style={{ margin: 0 }}>
                  <Text>Casa di Pepe</Text>
                </CardItem>
                <CardItem>
                  <Left style={{ marginLeft: 0 }}>
                    <Button>
                      {/* <Icon active name="thumbs-up" /> */}
                      <Text>Categoria</Text>
                    </Button>
                  </Left>
                  <Right>
                    <Text>Precio medio: XX€</Text>
                  </Right>
                </CardItem>
              </Card>
            </Content>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => {
  return {
    appJson: state.mainReducer.appJson
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addKeyValueJSON: (key, value) => dispatch(addText(props.key, props.value))
  };
};

export default connect(mapStateToProps)(Home);
