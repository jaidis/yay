import React, { Component } from "react";
import { View, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import { addUser, addBookings } from "../../store/actions/index";

import ResponsiveImage from "react-native-responsive-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, Icon, Button } from "react-native-elements";

// FUNCTIONS OR HELPERS
import * as Validar from "../../functions/Validate_helper";
import * as AppConsts from "../../../config/app_consts";
import * as YAY_Api from "../../functions/YAY_Api_helper";

// LANGUAGES LIBRARY
import { setI18nConfig } from "../../../languages/i18n";
var i18n = setI18nConfig();

// STYLES
import SignInStyles from "./SignInStyles";

/**
 * @description Componente SignIn, realiza un login basado en el email y la contraseña del usuario
 */
class SignIn extends Component {
  static navigationOptions = {
    title: ""
  };

  state = {
    appJson: "",
    loading_process_bar: false, // Muestra el simbolo de cargando
    email: "", // El email del usuario
    email_error: false, // Se marca si el email no es válido
    password: "", // La contraseña del usuario
    password_error: false, // Se marca si la contraseña no es válida
    loading_sign_in: false
  };

  /**
   * @description
   */
  signInDataConfirmation = () => {
    // Boolean de control
    let error = false;

    this.setState({ loading_sign_in: true });

    if (!Validar.validateEmail(this.state.email)) {
      this.setState({ email_error: true });
      error = true;
    } else {
      this.setState({ email_error: false });
    }

    if (!Validar.validatePasswordWeak(this.state.password)) {
      this.setState({ password_error: true });
      error = true;
    } else {
      this.setState({ password_error: false });
    }

    !error ? this.signIn() : this.setState({ loading_sign_in: false });
  };

  /**
   * @description
   */
  signIn = async () => {
    NetInfo.isConnected
      .fetch()
      .then(async isConnected => {
        if (isConnected) {
          try {
            let signInJSON = {
              email: this.state.email,
              password: this.state.password
            };

            let response = await YAY_Api.fetchInternetDataAsync(
              AppConsts.URL_LOGIN,
              await YAY_Api.getRequestPostAsync(signInJSON)
            );

            if (response.status === "success") {
              this.props.c_addUser(response);
              this.setState({ loading_sign_in: false });
              this.props.navigation.navigate("Home");

              let bookingJSON = { token: this.props.appJson.userdata.token };
              response = await YAY_Api.fetchInternetDataAsync(
                AppConsts.URL_BOOKINGS_SEARCH,
                await YAY_Api.getRequestPostAsync(bookingJSON)
              );

              response.status === "success"
                ? this.props.c_addBookings(response)
                : null;
            } else {
              console.log(response);
              this.setState({ loading_sign_in: false });
            }
          } catch (error) {
            console.log(error);
            this.setState({ loading_sign_in: false });
          }
        } else {
          this.setState({ loading_sign_in: false });
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

  render() {
    return (
      <KeyboardAwareScrollView style={SignInStyles.container}>
        <View style={SignInStyles.view_form}>
          <View style={SignInStyles.logo}>
            <ResponsiveImage
              source={require("../../../assets/img/yay-logo-rounded.png")}
              initWidth="200"
              initHeight="200"
            />
          </View>
          <Input
            leftIcon={
              <Icon
                name="email-outline"
                type="material-community"
                color="#6E78AA"
                size={25}
              />
            }
            placeholder={i18n.t("signin_email_input")}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            ref={input => (this.email2Input = input)}
            value={this.state.email}
            onSubmitEditing={() => {
              this.password2Input.focus();
            }}
            onChangeText={email => {
              this.setState({ email: email });
            }}
            errorMessage={
              this.state.email_error ? i18n.t("signin_email_input_error") : null
            }
            containerStyle={SignInStyles.input_container}
            inputContainerStyle={SignInStyles.input_container_style}
            placeholderTextColor="#6E78AA"
            inputStyle={SignInStyles.input_style}
            keyboardAppearance="light"
            blurOnSubmit={false}
          />
          <Input
            leftIcon={
              <Icon
                name="lock"
                type="simple-line-icon"
                color="#6E78AA"
                size={25}
              />
            }
            placeholder={i18n.t("signin_password_input")}
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            ref={input => (this.password2Input = input)}
            value={this.state.password}
            onSubmitEditing={this.signInDataConfirmation}
            onChangeText={password => {
              this.setState({ password: password });
            }}
            errorMessage={
              this.state.password_error
                ? i18n.t("signin_password_input_error")
                : null
            }
            containerStyle={SignInStyles.input_container}
            inputContainerStyle={SignInStyles.input_container_style}
            placeholderTextColor="#6E78AA"
            inputStyle={SignInStyles.input_style}
            keyboardAppearance="light"
            blurOnSubmit={false}
          />
          <Button
            loading={this.state.loading_sign_in}
            title={i18n.t("signin_button_signin").toUpperCase()}
            containerStyle={SignInStyles.button_signin_container_style}
            buttonStyle={SignInStyles.button_signin_style}
            titleStyle={SignInStyles.button_title_style}
            onPress={this.signInDataConfirmation}
            disabled={false}
          />
          <Button
            loading={false}
            title={i18n.t("signin_button_register").toUpperCase()}
            containerStyle={SignInStyles.button_container_style}
            buttonStyle={SignInStyles.button_style}
            titleStyle={SignInStyles.button_title_style}
            onPress={() => {
              this.props.navigation.navigate("SignUp");
            }}
            disabled={false}
          />
        </View>
      </KeyboardAwareScrollView>
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
    c_addUser: userJSON => dispatch(addUser(userJSON)),
    c_addBookings: reservaJSON => dispatch(addBookings(reservaJSON))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
