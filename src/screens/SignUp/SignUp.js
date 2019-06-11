import React, { Component } from "react";
import { View, Alert, Text, Dimensions } from "react-native";
import { connect } from "react-redux";

import {
  Input,
  SearchBar,
  Icon,
  Button,
  ThemeProvider
} from "react-native-elements";
// import { Button } from "native-base";

import ResponsiveImage from "react-native-responsive-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import SignUpStyles from "./SignUpStyles";
import * as Validar from "../../functions/Validate_helper";

const SCREEN_WIDTH = Dimensions.get("window").width;

class SignUp extends Component {
  static navigationOptions = {
    title: "SignUp"
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

  signUpDataConfirmation = () => {
    let error = false;

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
    if (this.state.telefono.length != 9){
      error= true;
      this.setState({telefono_error:true})
    }
    else{
      this.setState({telefono_error:false})
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
        "Account activation",
        this.state.email +
          "\n" +
          "Make sure the email is correct. It is necessary to validate the account.",
        [
          {
            text: "Cancel"
          },
          {
            text: "OK",
            onPress: () => {
              console.log("Todo va bien");
              this.signUp();
            }
          }
        ],
        {
          cancelable: true
        }
      );
    } else {
      console.log("Se han encontrado errores");
      this.setState({ loading_process_bar: false });
    }
  };

  signUp = () => {
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <KeyboardAwareScrollView style={SignUpStyles.container}>
        <View style={SignUpStyles.view_form}>
          {/* <Text
          style={{
            color: "white",
            fontSize: 30,
            marginVertical: 10,
            fontWeight: "300"
          }}
        >
        </Text> */}
          <View style={SignUpStyles.logo}>
            <ResponsiveImage
              source={require("../../../assets/img/yay-transparente.png")}
              initWidth="200"
              initHeight="200"
            />
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
            placeholder="First Name"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            ref={input => (this.usernameInput = input)}
            onSubmitEditing={() => {
              this.lastNameInput.focus();
            }}
            onChangeText={value => this.setState({nombre: value})}
            errorMessage={
              this.state.nombre_error
                ? "Please enter a First Name"
                : null
            }
            containerStyle={SignUpStyles.input_container}
            inputContainerStyle={SignUpStyles.input_container_style}
            placeholderTextColor="rgba(110, 120, 170, 1)"
            inputStyle={SignUpStyles.input_style}
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
            placeholder="Last Name"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            ref={input => (this.lastNameInput = input)}
            onSubmitEditing={() => {
              this.phoneInput.focus();
            }}
            onChangeText={value => this.setState({apellidos: value})}
            errorMessage={
              this.state.apellidos_error
                ? "Please enter a Last Name"
                : null
            }
            containerStyle={SignUpStyles.input_container}
            inputContainerStyle={SignUpStyles.input_container_style}
            placeholderTextColor="rgba(110, 120, 170, 1)"
            inputStyle={SignUpStyles.input_style}
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
            placeholder="Phone Number"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            returnKeyType="next"
            ref={input => (this.phoneInput = input)}
            onSubmitEditing={() => {
              this.email2Input.focus();
            }}
            onChangeText={value => this.setState({telefono: value})}
            errorMessage={
              this.state.telefono_error
                ? "Please enter a Phone Number"
                : null
            }
            containerStyle={SignUpStyles.input_container}
            inputContainerStyle={SignUpStyles.input_container_style}
            placeholderTextColor="rgba(110, 120, 170, 1)"
            inputStyle={SignUpStyles.input_style}
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
            containerStyle={SignUpStyles.input_container}
            inputContainerStyle={SignUpStyles.input_container_style}
            placeholderTextColor="rgba(110, 120, 170, 1)"
            inputStyle={SignUpStyles.input_style}
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
            onSubmitEditing={() => {
              this.confirmPassword2Input.focus();
            }}
            onChangeText={password => {
              this.setState({ password: password });
            }}
            errorMessage={
              this.state.password_error ? "Please enter a valid password" : null
            }
            containerStyle={SignUpStyles.input_container}
            inputContainerStyle={SignUpStyles.input_container_style}
            placeholderTextColor="rgba(110, 120, 170, 1)"
            inputStyle={SignUpStyles.input_style}
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
            onChangeText={value => this.setState({password_copy: value})}
            errorMessage={
              this.state.password_copy_error
                ? "Your passwords doesn't match"
                : null
            }
            containerStyle={SignUpStyles.input_container}
            inputContainerStyle={SignUpStyles.input_container_style}
            placeholderTextColor="rgba(110, 120, 170, 1)"
            inputStyle={SignUpStyles.input_style}
            keyboardAppearance="light"
            blurOnSubmit={true}
          />
          <Button
            loading={false}
            title="SIGNUP"
            containerStyle={SignUpStyles.button_signup_container_style}
            buttonStyle={SignUpStyles.button_signup_style}
            titleStyle={SignUpStyles.button_title_style}
            onPress={this.signUpDataConfirmation}
            disabled={false}
          />
          <Button
            loading={false}
            title="CANCEL"
            containerStyle={SignUpStyles.button_container_style}
            buttonStyle={SignUpStyles.button_style}
            titleStyle={SignUpStyles.button_title_style}
            onPress={()=>this.props.navigation.navigate("SignIn")}
            disabled={false}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    appJson: state.mainReducer.appJson
  };
};

export default connect(mapStateToProps)(SignUp);
