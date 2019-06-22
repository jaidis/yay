import React, { Component } from "react";
import { Image, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { deleteUser } from "../../store/actions/index";

import {
  Container,
  Content,
  Text,
  ListItem,
  Icon,
  Left,
  Body,
  Button,
  Separator
} from "native-base";
import DeviceInfo from "react-native-device-info";

// LANGUAGES LIBRARY
import { setI18nConfig } from "../../../languages/i18n";
var i18n = setI18nConfig();

// STYLES
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
            <Image
              square
              style={{ width: 80, height: 80 }}
              source={require("../../../assets/img/yay-logo-rounded.png")}
            />
            <Text style={DrawerNavigatorStyles.background_text}>
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
              <Text>{i18n.t("drawer_navigator_profile")}</Text>
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
              <Text>{i18n.t("drawer_navigator_payments")}</Text>
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
              <Text>{i18n.t("drawer_navigator_bookings")}</Text>
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
              <Text>{i18n.t("drawer_navigator_favorites")}</Text>
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
              <Text>{i18n.t("drawer_navigator_favorites")}</Text>
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
              <Text>
                {i18n.t("drawer_navigator_app_version")}
                {DeviceInfo.getVersion()}
              </Text>
            </Body>
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => {
              this.props.navigation.navigate("SignIn");
              setTimeout(() => {
                this.props.c_deleteUser();
              }, 300);
            }}
          >
            <Left>
              <Button style={{ backgroundColor: "#2E3448" }}>
                <Icon name="log-out" />
              </Button>
            </Left>
            <Body>
              <Text>{i18n.t("drawer_navigator_close_session")}</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
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
    c_deleteUser: () => dispatch(deleteUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerNavigator);
