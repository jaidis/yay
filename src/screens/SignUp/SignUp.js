import React, { Component } from "react";
import { View, Alert} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";

import { Input, Icon, Button } from "react-native-elements";
import ResponsiveImage from "react-native-responsive-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// FUNCTIONS OR HELPERS
import * as Validar from "../../functions/Validate_helper";
import * as AppConsts from "../../../config/app_consts";
import * as YAY_Api from "../../functions/YAY_Api_helper";

// LANGUAGES LIBRARY
import { setI18nConfig } from "../../../languages/i18n";
var i18n = setI18nConfig();

// STYLES
import SignUpStyles from "./SignUpStyles";

class SignUp extends Component {
  static navigationOptions = {
    title: ""
  };

  state = {
    loading_sign_up: false,
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

  signUpDataConfirmation = () => {
    let error = false;

    this.setState({ loading_sign_up: true });

    // VALIDACIÓN DEL NOMBRE
    if (this.state.nombre == "") {
      error = true;
      this.setState({ nombre_error: true });
    } else {
      this.setState({ nombre_error: false });
    }

    // VALIDACIÓN DE LOS APELLIDOS
    if (this.state.apellidos == "") {
      error = true;
      this.setState({ apellidos_error: true });
    } else {
      this.setState({ apellidos_error: false });
    }

    // VALIDACIÓN DEL NUMERO
    if (!Validar.validatePhoneNumber(this.state.telefono)) {
      error = true;
      this.setState({ telefono_error: true });
    } else {
      this.setState({ telefono_error: false });
    }

    if (!Validar.validateEmail(this.state.email)) {
      this.setState({ email_error: true });
      error = true;
    }

    if (!Validar.validatePasswordWeak(this.state.password)) {
      this.setState({ password_error: true });
      error = true;
    }

    // VALIDACIÓN PARA QUE LAS CONTRASEÑAS COINCIDAN
    if (this.state.password !== this.state.password_copy) {
      error = true;
      this.setState({ password_copy_error: true });
    } else {
      this.setState({ password_copy_error: false });
    }

    if (!error) {
      // Los datos son correctos, el usuario debe verificar el email
      Alert.alert(
        i18n.t("signup_alert_word"),
        this.state.email + i18n.t("signup_alert_message"),
        [
          { text: "Cancel" },
          {
            text: "OK",
            onPress: () => {
              this.signUp();
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      // console.log("Se han encontrado errores");
      this.setState({ loading_sign_up: false });
    }
  };

  signUp = async () => {
    NetInfo.isConnected
      .fetch()
      .then(async isConnected => {
        if (isConnected) {
          try {
            this.setState({ loading_sign_up: true });

            let signUpJSON = {
              email: this.state.email,
              password: this.state.password,
              first_name: this.state.nombre,
              last_name: this.state.apellidos,
              phone_number: this.state.telefono
            };

            let response = await YAY_Api.fetchInternetDataAsync(
              AppConsts.URL_REGISTER,
              await YAY_Api.getRequestPostAsync(signUpJSON)
            );

            if (response.status === "success") {
              // console.log("Registrado correctamente");
              this.setState({ loading_sign_up: false });
              Alert.alert(
                i18n.t("signup_confirmed_word"),
                i18n.t("signup_confirmed_message"),
                [{ text: "OK" }],
                { cancelable: false }
              );
            } else if (
              response.status === "error" &&
              response.error === "USER_ALREADY_REGISTERED"
            ) {
              // console.log("Usuario ya registrado");
              this.setState({ loading_sign_up: false });
              Alert.alert(
                i18n.t("signup_already_registered_word"),
                i18n.t("signup_already_registered_message"),
                [{ text: "OK" }],
                { cancelable: false }
              );
            } else {
              console.log(response);
              this.setState({ loading_sign_up: false });
            }
          } catch (error) {
            console.log(error);
          }
        } else {
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
      <KeyboardAwareScrollView style={SignUpStyles.container}>
        <View style={SignUpStyles.view_form}>
          <View style={SignUpStyles.logo}>
            <ResponsiveImage
              source={require("../../../assets/img/yay-logo-rounded.png")}
              initWidth="200"
              initHeight="200"
            />
          </View>
          <Input
            leftIcon={
              <Icon
                name="user"
                type="simple-line-icon"
                color="#6E78AA"
                size={25}
              />
            }
            placeholder={i18n.t("signup_form_first_name")}
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
              this.state.nombre_error
                ? i18n.t("signup_form_first_name_error")
                : null
            }
            containerStyle={SignUpStyles.input_container}
            inputContainerStyle={SignUpStyles.input_container_style}
            placeholderTextColor="#6E78AA"
            inputStyle={SignUpStyles.input_style}
            keyboardAppearance="light"
            blurOnSubmit={false}
          />
          <Input
            leftIcon={
              <Icon
                name="user-follow"
                type="simple-line-icon"
                color="#6E78AA"
                size={25}
              />
            }
            placeholder={i18n.t("signup_form_last_name")}
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
              this.state.apellidos_error
                ? i18n.t("signup_form_last_name_error")
                : null
            }
            containerStyle={SignUpStyles.input_container}
            inputContainerStyle={SignUpStyles.input_container_style}
            placeholderTextColor="#6E78AA"
            inputStyle={SignUpStyles.input_style}
            keyboardAppearance="light"
            blurOnSubmit={false}
          />
          <Input
            leftIcon={
              <Icon
                name="screen-smartphone"
                type="simple-line-icon"
                color="#6E78AA"
                size={25}
              />
            }
            placeholder={i18n.t("signup_form_phone_number")}
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
              this.state.telefono_error
                ? i18n.t("signup_form_phone_number_error")
                : null
            }
            containerStyle={SignUpStyles.input_container}
            inputContainerStyle={SignUpStyles.input_container_style}
            placeholderTextColor="#6E78AA"
            inputStyle={SignUpStyles.input_style}
            keyboardAppearance="light"
            blurOnSubmit={false}
          />
          <Input
            leftIcon={
              <Icon
                name="email-outline"
                type="material-community"
                color="#6E78AA"
                size={25}
              />
            }
            placeholder={i18n.t("signup_form_email")}
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
              this.state.email_error ? i18n.t("signup_form_email_error") : null
            }
            containerStyle={SignUpStyles.input_container}
            inputContainerStyle={SignUpStyles.input_container_style}
            placeholderTextColor="#6E78AA"
            inputStyle={SignUpStyles.input_style}
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
            placeholder={i18n.t("signup_form_password")}
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
                ? i18n.t("signup_form_password_error")
                : null
            }
            containerStyle={SignUpStyles.input_container}
            inputContainerStyle={SignUpStyles.input_container_style}
            placeholderTextColor="#6E78AA"
            inputStyle={SignUpStyles.input_style}
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
            placeholder={i18n.t("signup_form_password_copy")}
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
                ? i18n.t("signup_form_password_copy_error")
                : null
            }
            containerStyle={SignUpStyles.input_container}
            inputContainerStyle={SignUpStyles.input_container_style}
            placeholderTextColor="#6E78AA"
            inputStyle={SignUpStyles.input_style}
            keyboardAppearance="light"
            blurOnSubmit={true}
          />
          <Button
            loading={this.state.loading_sign_up}
            title={i18n.t("signup_button_signup").toUpperCase()}
            containerStyle={SignUpStyles.button_signup_container_style}
            buttonStyle={SignUpStyles.button_signup_style}
            titleStyle={SignUpStyles.button_title_style}
            onPress={this.signUpDataConfirmation}
            disabled={false}
          />
          <Button
            loading={false}
            title={i18n.t("signup_button_cancel").toUpperCase()}
            containerStyle={SignUpStyles.button_container_style}
            buttonStyle={SignUpStyles.button_style}
            titleStyle={SignUpStyles.button_title_style}
            onPress={() => this.props.navigation.navigate("SignIn")}
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
    appJson: state.mainReducer.appJson
  };
};

export default connect(mapStateToProps)(SignUp);
