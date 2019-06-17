import React, { Component } from "react";
import { View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import { addUser, deleteUser, addBookings } from "../../store/actions/index";

import * as AppConsts from "../../../config/app_consts";
import * as YAY_Api from "../../functions/YAY_Api_helper";

import ResponsiveImage from "react-native-responsive-image";

/**
 * @description Componente AuthCheck, realiza un login basado en el email y la contraseña del usuario
 */
class AuthCheck extends Component {
  static navigationOptions = {
    title: "AuthCheck"
  };

  async componentDidMount() {
    if (this.props.appJson != null) {
      NetInfo.isConnected
        .fetch()
        .then(async isConnected => {
          if (isConnected) {
            AuthCheckJSON = {
              token: this.props.appJson.userdata.token
            };
            let response = await YAY_Api.fetchInternetDataAsync(
              AppConsts.URL_USER_REFRESH,
              await YAY_Api.getRequestPostAsync(AuthCheckJSON)
            );
            this.props.c_addUser(response);
            this.props.navigation.navigate("Home");

            bookingJSON = { token: this.props.appJson.userdata.token };
            response = await YAY_Api.fetchInternetDataAsync(
              AppConsts.URL_BOOKINGS_SEARCH,
              await YAY_Api.getRequestPostAsync(bookingJSON)
            );
            this.props.c_addBookings(response);
          } else {
            this.props.navigation.navigate("Home");
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.props.navigation.navigate("SignIn");
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(46, 50, 72, 1)",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ResponsiveImage
          source={require("../../../assets/img/yay-logo-rounded.png")}
          initWidth="200"
          initHeight="200"
        />
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
    c_addUser: userJSON => dispatch(addUser(userJSON)),
    c_deleteUser: () => dispatch(deleteUser()),
    c_addBookings: reservaJSON => dispatch(addBookings(reservaJSON))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthCheck);
