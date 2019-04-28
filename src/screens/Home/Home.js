import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SearchBar, Card, Tile } from "react-native-elements";
import Icon from "react-native-vector-icons";
import { addText } from "../../store/actions/index";
import { connect } from "react-redux";

import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";
import Swiper from "react-native-swiper";

class Home extends Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    appJson: "",
    search: "",
    searchLoading: false
  };

  updateSearch = buscar => {
    if (buscar != "") this.setState({ search: buscar, searchLoading: true });
    else this.setState({ searchLoading: false });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {NaviteBaseMenu.menuLogo(this)}
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={this.state.search}
          showLoading={this.state.searchLoading}
        />
        <ScrollView>
        <View style={{ height: 200, backgroundColor: "#CACACA", padding: 5 }}>
          <Swiper
            removeClippedSubviews={true}
            loop={false}
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
            showsPagination={false}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FF0000",
                height: 70,
                flex: 1,
                borderRadius: 10
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "normal"
                }}
              >
                Texto ejemplo 1
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FF0000",
                height: 70,
                flex: 1,
                borderRadius: 10
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "normal"
                }}
              >
                Texto ejemplo 2
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FF0000",
                height: 70,
                flex: 1,
                borderRadius: 10
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "normal"
                }}
              >
                Texto ejemplo 3
              </Text>
            </View>
          </Swiper>
        </View>
        
          <Card
            containerStyle={{ marginTop: 15, marginBottom: 15 }}
            title="TILES"
          >
            <View>
              <Tile
                imageSrc={{
                  uri:
                    "https://static1.squarespace.com/static/5477887ae4b07c97883111ab/5478c08fe4b0fa4e5a552532/57e101f3579fb32aef30d4af/1491426124625/Porthmeor+Sunset+21.jpg"
                }}
                title="When I admire the wonders of a sunset or the beauty of the moon, my soul expands in the worship of the creator."
                titleStyle={{ fontSize: 20 }}
                featured
                caption="Mahatma Gandhi"
                activeOpacity={1}
                width={310}
              />
            </View>
            <View style={{ paddingTop: 20 }}>
              <Tile
                imageSrc={{
                  uri:
                    "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg"
                }}
                icon={{
                  name: "heart",
                  type: "font-awesome",
                  size: 60,
                  color: "red"
                }}
                featured
                activeOpacity={0.8}
                onPress={() => {
                  "Tile pressed";
                }}
                width={310}
              />
            </View>
            <View style={{ paddingTop: 20 }}>
              <Tile
                imageSrc={{
                  uri:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg/320px-Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg"
                }}
                title="Half Dome, Yosemite"
                titleStyle={{ fontSize: 20 }}
                activeOpacity={1}
                width={310}
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
          </Card>
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
