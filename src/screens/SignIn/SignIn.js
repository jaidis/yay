import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { connect } from "react-redux";
import { loadingTrue, loadingFalse, addUser } from "../../store/actions/index";

import {
  Input,
  SearchBar,
  Icon,
  Button,
  ThemeProvider
} from "react-native-elements";

import SignInStyles from "./SignInStyles";
import * as Validar from "../../functions/Validate_helper";
import * as AppConsts from "../../../config/app_consts";
import * as YAY_Api from "../../functions/YAY_Api_helper";

import ResponsiveImage from "react-native-responsive-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

/**
 * @description Componente SignIn, realiza un login basado en el email y la contraseña del usuario
 */
class SignIn extends Component {
  static navigationOptions = {
    title: "SignIn"
  };

  state = {
    appJson: "",
    loading_process_bar: false, // Muestra el simbolo de cargando
    email: "manmunlop@gmail.com", // El email del usuario
    email_error: false, // Se marca si el email no es válido
    password: "asdf123", // La contraseña del usuario
    password_error: false, // Se marca si la contraseña no es válida
    loading_sign_in: false
  };

  signInDataConfirmation = () => {
    // Boolean de control
    let error = false;

    // TODO: cambiar por su versión de redux
    this.setState({ loading_process_bar: true });

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

    if (!error) {
      // console.log("Todo va bien");
      this.setState({ loading_sign_in: true });
      this.signIn();
    } else {
      console.log("Se han encontrado errores");
      this.setState({ loading_process_bar: false });
    }
  };

  signIn = async () => {
    signInJSON = {
      email: this.state.email,
      password: this.state.password
    };

    let response = await YAY_Api.fetchInternetDataAsync(
      AppConsts.URL_LOGIN,
      await YAY_Api.getRequestPostAsync(signInJSON)
    );
    this.props.c_addUser(response);
    this.setState({ loading_sign_in: false });
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <KeyboardAwareScrollView style={SignInStyles.container}>
        <View style={SignInStyles.view_form}>
          <View style={SignInStyles.logo}>
            <ResponsiveImage
              source={require("../../../assets/img/yay-transparente.png")}
              initWidth="200"
              initHeight="200"
            />
          </View>
          <Input
            leftIcon={
              <Icon
                name="email-outline"
                type="material-community"
                color="rgba(110, 120, 170, 1)"
                size={25}
              />
            }
            placeholder="Email"
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
              this.state.email_error
                ? "Please enter a valid email address"
                : null
            }
            containerStyle={SignInStyles.input_container}
            inputContainerStyle={SignInStyles.input_container_style}
            placeholderTextColor="rgba(110, 120, 170, 1)"
            inputStyle={SignInStyles.input_style}
            keyboardAppearance="light"
            blurOnSubmit={false}
          />
          <Input
            leftIcon={
              <Icon
                name="lock"
                type="simple-line-icon"
                color="rgba(110, 120, 170, 1)"
                size={25}
              />
            }
            placeholder="Password"
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
              this.state.password_error ? "Please enter a valid password" : null
            }
            containerStyle={SignInStyles.input_container}
            inputContainerStyle={SignInStyles.input_container_style}
            placeholderTextColor="rgba(110, 120, 170, 1)"
            inputStyle={SignInStyles.input_style}
            keyboardAppearance="light"
            blurOnSubmit={false}
          />
          <Button
            loading={this.state.loading_sign_in}
            title="SIGNIN"
            containerStyle={SignInStyles.button_signin_container_style}
            buttonStyle={SignInStyles.button_signin_style}
            titleStyle={SignInStyles.button_title_style}
            onPress={this.signInDataConfirmation}
            disabled={false}
          />
          <Button
            loading={false}
            title="REGISTER"
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
    c_addUser: userJSON => dispatch(addUser(userJSON))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
