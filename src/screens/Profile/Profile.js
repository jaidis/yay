import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { loadingTrue, loadingFalse } from "../../store/actions/index";

import {
  Input,
  SearchBar,
  Icon,
  Button,
  ThemeProvider
} from "react-native-elements";
import { H2 } from "native-base";
import ResponsiveImage from "react-native-responsive-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";
import * as Validar from "../../functions/Validate_helper";

import ProfileStyles from "./ProfileStyles";

class Profile extends Component {
  static navigationOptions = {
    title: "Profile"
  };

  state = {
    appJson: "",
    loading_process_bar: false, // Muestra el simbolo de cargando
    nombre: "",
    nombre_error: false,
    apellidos: "",
    apellidos_error: false,
    telefono: "",
    telefono_error: false,
    email: "", // El email del usuario
    email_error: false, // Se marca si el email no es válido
    password: "", // La contraseña del usuario
    password_error: false, // Se marca si la contraseña no es válida
    password_copy: "", // La contraseña del usuario
    password_copy_error: false // Se marca si la contraseña no es válida
  };

  /**
   *
   */
  componentDidMount() {
    try {
      //console.log(user_cognito);
      let user = this.props.appJson.userdata.user;
      this.setState({
        nombre: user.name,
        apellidos: user.lastName,
        telefono:user.phoneNumber,
        email: user.email
      });
    } catch {
      error => {
        console.log(
          "Error when try to retrieve user from AsyncStorage: \n" + error
        );
      };
    }
  }

  render() {
    return (
      <View style={ProfileStyles.container}>
        {NaviteBaseMenu.menuGoHome(this, "Profile")}
        <KeyboardAwareScrollView style={ProfileStyles.container}>
          <View style={ProfileStyles.view_form}>
            <View>
              <H2 style={ProfileStyles.mainTitle}>Modificar datos</H2>
            </View>
            <Input
              leftIcon={
                <Icon
                  name="user"
                  type="simple-line-icon"
                  color="rgba(110, 120, 170, 1)"
                  size={25}
                />
              }
              value={this.state.nombre}
              placeholder="First Name"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              ref={input => (this.usernameInput = input)}
              onSubmitEditing={() => {
                this.lastNameInput.focus();
              }}
              onChangeText={value => this.setState({ nombre: value })}
              errorMessage={
                this.state.nombre_error ? "Please enter a First Name" : null
              }
              containerStyle={ProfileStyles.input_container}
              inputContainerStyle={ProfileStyles.input_container_style}
              placeholderTextColor="rgba(110, 120, 170, 1)"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={false}
            />
            <Input
              leftIcon={
                <Icon
                  name="user-follow"
                  type="simple-line-icon"
                  color="rgba(110, 120, 170, 1)"
                  size={25}
                />
              }
              value={this.state.apellidos}
              placeholder="Last Name"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              ref={input => (this.lastNameInput = input)}
              onSubmitEditing={() => {
                this.phoneInput.focus();
              }}
              onChangeText={value => this.setState({ apellidos: value })}
              errorMessage={
                this.state.apellidos_error ? "Please enter a Last Name" : null
              }
              containerStyle={ProfileStyles.input_container}
              inputContainerStyle={ProfileStyles.input_container_style}
              placeholderTextColor="rgba(110, 120, 170, 1)"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={false}
            />
            <Input
              leftIcon={
                <Icon
                  name="screen-smartphone"
                  type="simple-line-icon"
                  color="rgba(110, 120, 170, 1)"
                  size={25}
                />
              }
              value={this.state.telefono}
              placeholder="Phone Number"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              returnKeyType="next"
              ref={input => (this.phoneInput = input)}
              onSubmitEditing={() => {
                this.email2Input.focus();
              }}
              onChangeText={value => this.setState({ telefono: value })}
              errorMessage={
                this.state.telefono_error ? "Please enter a Phone Number" : null
              }
              containerStyle={ProfileStyles.input_container}
              inputContainerStyle={ProfileStyles.input_container_style}
              placeholderTextColor="rgba(110, 120, 170, 1)"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={false}
            />
            <Input
              leftIcon={
                <Icon
                  name="email-outline"
                  type="material-community"
                  color="rgba(110, 120, 170, 1)"
                  size={25}
                />
              }
              value={this.state.email}
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              ref={input => (this.email2Input = input)}
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
              containerStyle={ProfileStyles.input_container}
              inputContainerStyle={ProfileStyles.input_container_style}
              placeholderTextColor="rgba(110, 120, 170, 1)"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={false}
              editable={false}
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
              onSubmitEditing={() => {
                this.confirmPassword2Input.focus();
              }}
              onChangeText={password => {
                this.setState({ password: password });
              }}
              errorMessage={
                this.state.password_error
                  ? "Please enter a valid password"
                  : null
              }
              containerStyle={ProfileStyles.input_container}
              inputContainerStyle={ProfileStyles.input_container_style}
              placeholderTextColor="rgba(110, 120, 170, 1)"
              inputStyle={ProfileStyles.input_style}
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
              placeholder="Confirm Password"
              autoCapitalize="none"
              keyboardAppearance="light"
              secureTextEntry={true}
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="done"
              ref={input => (this.confirmPassword2Input = input)}
              onSubmitEditing={this.signUpDataConfirmation}
              onChangeText={value => this.setState({ password_copy: value })}
              errorMessage={
                this.state.password_copy_error
                  ? "Your passwords doesn't match"
                  : null
              }
              containerStyle={ProfileStyles.input_container}
              inputContainerStyle={ProfileStyles.input_container_style}
              placeholderTextColor="rgba(110, 120, 170, 1)"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={true}
            />
            <Button
              loading={false}
              title="SIGNUP"
              containerStyle={ProfileStyles.button_signup_container_style}
              buttonStyle={ProfileStyles.button_signup_style}
              titleStyle={ProfileStyles.button_title_style}
              onPress={this.signUpDataConfirmation}
              disabled={false}
            />
            <Button
              loading={false}
              title="CANCEL"
              containerStyle={ProfileStyles.button_container_style}
              buttonStyle={ProfileStyles.button_style}
              titleStyle={ProfileStyles.button_title_style}
              onPress={() => this.props.navigation.navigate("SignIn")}
              disabled={false}
            />
          </View>
        </KeyboardAwareScrollView>
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
    c_loadingTrue: () => dispatch(loadingTrue()),
    c_loadingFalse: () => dispatch(loadingFalse())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
