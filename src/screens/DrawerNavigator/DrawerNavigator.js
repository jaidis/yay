import React, { Component } from "react";
import { SafeAreaView, ScrollView, Image, ImageBackground } from "react-native";
import { connect } from "react-redux";
import {
  loadingTrue,
  loadingFalse,
  deleteUser
} from "../../store/actions/index";

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

// Información del dispositivo
import DeviceInfo from "react-native-device-info";

import DrawerNavigatorStyles from "./DrawerNavigatorStyles";

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
            style={DrawerNavigatorStyles.background}
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
              source={require("../../../assets/img/yay-logo-rounded.png")}
            />
            <Text style={DrawerNavigatorStyles.background_text}>
              {/* {this.state.user ? this.state.user.attributes.email : null} */}
              {/* micorreo@gmail.com */}
              {this.props.appJson.userdata.user.email}
            </Text>
          </ImageBackground>
          <ListItem
            icon
            button
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <Left>
              <Button style={{ backgroundColor: "#2E3448" }}>
                <Icon name="contact" />
              </Button>
            </Left>
            <Body>
              <Text>Mis datos</Text>
            </Body>
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => this.props.navigation.navigate("Payments")}
          >
            <Left>
              <Button style={{ backgroundColor: "#2E3448" }}>
                <Icon name="card" />
              </Button>
            </Left>
            <Body>
              <Text>Formas de pago</Text>
            </Body>
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => this.props.navigation.navigate("Bookings")}
          >
            <Left>
              <Button style={{ backgroundColor: "#2E3448" }}>
                <Icon name="home" />
              </Button>
            </Left>
            <Body>
              <Text>Reservas</Text>
            </Body>
            {/* <Right> <Icon active name="arrow-forward" /> </Right> */}
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => this.props.navigation.navigate("Favorites")}
          >
            <Left>
              <Button style={{ backgroundColor: "#2E3448" }}>
                <Icon name="star" />
              </Button>
            </Left>
            <Body>
              <Text>Favoritos</Text>
            </Body>
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => this.props.navigation.navigate("Categories")}
          >
            <Left>
              <Button style={{ backgroundColor: "#2E3448" }}>
                <Icon name="list-box" />
              </Button>
            </Left>
            <Body>
              <Text>Categorias</Text>
            </Body>
          </ListItem>
          <Separator />
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#2E3448" }}>
                <Icon type="FontAwesome" name="info-circle" />
              </Button>
            </Left>
            <Body>
              <Text>Versión App {DeviceInfo.getVersion()}</Text>
            </Body>
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => {
              this.props.navigation.navigate("SignIn");
              setTimeout(()=>{
                this.props.c_deleteUser();
              },300);
            }}
          >
            <Left>
              <Button style={{ backgroundColor: "#2E3448" }}>
                <Icon name="log-out" />
              </Button>
            </Left>
            <Body>
              <Text>Cerrar sesión</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
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
    c_loadingTrue: () => dispatch(loadingTrue()),
    c_loadingFalse: () => dispatch(loadingFalse()),
    c_deleteUser: () => dispatch(deleteUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerNavigator);