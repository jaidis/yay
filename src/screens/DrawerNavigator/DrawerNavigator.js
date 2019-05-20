import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";

// REACT NAVIGATION
import { createStackNavigator,createDrawerNavigator } from "react-navigation";

// IMPORTAR LOS COMPONENTES DE NATIVE BASE
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Left,
  Body,
  Right,
  Button,
  Badge,
  Separator,
  View
} from "native-base";

import DrawerNavigatorStyles from "./DrawerNavigatorStyles";

// IMPORTAR LAS SCREEN DEL DRAWERNAVIGATOR
import Home from '../Home/Home'
import DetailView from '../DetailView/DetailView'
import TabFirst from "../TabFirst/TabFirst";
import TabSecond from "../TabSecond/TabSecond";

class DrawerNavigator extends Component {
  state = {
    appJson: ""
  };

  render() {
    return (
      <Container>
        <Content>
        <ImageBackground
              source={require("../../../assets/img/fondologomenu.jpg")}
            style={
              DrawerNavigatorStyles.background
            }
          >
            {/* <Image
              square
              style={
                DrawerNavigatorStyles.background_image
              }
              source={require("../../../assets/img/yay.jpg")}
            /> */}
            <Image
            square
            style={{ width: 80, height: 80 }}
            source={require("../../../assets/img/yay-transparente.png")}
          />
            <Text
              style={
                DrawerNavigatorStyles.background_text
              }
            >
              {/* {this.state.user ? this.state.user.attributes.email : null} */}
              micorreo@gmail.com
            </Text>
          </ImageBackground>
          <ListItem
            icon
            button
            onPress={() => this.props.navigation.navigate("TabFirst")}
          >
            <Left>
              <Button style={{ backgroundColor: "#8F8E93" }}>
                <Icon name="notifications" />
              </Button>
            </Left>
            <Body>
              <Text>TabFirst</Text>
            </Body>
            <Right>
              <Text>1</Text>
            </Right>
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => this.props.navigation.navigate("TabSecond")}
          >
            <Left>
              <Button style={{ backgroundColor: "#4CDA64" }}>
                <Icon name="home" />
              </Button>
            </Left>
            <Body>
              <Text>TabSecond</Text>
            </Body>
            <Right>{/* <Icon active name="arrow-forward" /> */}</Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    appJson: state.mainReducer.appJson
  };
};

export default connect(mapStateToProps)(DrawerNavigator);

// const TestStackNavigator = createStackNavigator(
//   {
//     TabFirst: TabFirst,
//     TabSecond: TabSecond
//   },
//   {
//     headerMode: 'none',
//     initialRouteName: "TabFirst",
//     defaultNavigationOptions: {
//       // headerTintColor: '#fff',
//       // headerStyle: {
//       //   backgroundColor: "rgba(46, 50, 72, 1)",
//       // },
//       headerVisible: false,
//     },
//   }
// );

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: Home,
    DetailView: DetailView,
    TabFirst: TabFirst,
    TabSecond: TabSecond
  },
  {
    contentComponent: DrawerNavigator
  }
);