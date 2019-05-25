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
import { H2, DatePicker, Item, Picker } from "native-base";
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
    fechaNacimiento: "",
    direccion: "",
    localidad: "",
    provincia: "",
    pais: "",
    codigo_postal: "",
    old_password: "", // El password antiguo
    old_password_error: false, // Se marca si la antigua contraseña no es válida
    password: "", // La contraseña del usuario
    password_error: false, // Se marca si la contraseña no es válida
    password_copy: "", // La contraseña del usuario
    password_copy_error: false // Se marca si la contraseña no es válida
  };

  checkData() {
    try {
      //console.log(user_cognito);
      let user = this.props.appJson.userdata.user;
      // console.log(user)
      this.setState({
        nombre: user.name,
        apellidos: user.lastName,
        telefono: user.phoneNumber,
        email: user.email,
        fechaNacimiento: this.getBirthDate(user.birthdate),
        direccion: user.address,
        localidad: user.address_locale,
        provincia: user.address_province,
        codigo_postal: user.address_postal,
        pais: user.address_country
      });
      console.log("Datos comprobados");
    } catch {
      error => {
        console.log("Error when try to retrieve user from Redux: \n" + error);
      };
    }
  }

  /**
   *
   */
  async componentDidMount() {
    this.checkData();

    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        console.log("inicio");
        await this.checkData();
      }),
      this.props.navigation.addListener("willBlur", async () => {
        console.log("me voy");
      })
    ];
  }

  /**
   * COMPONENT WILL UNMOUNT
   * @description Se limpian los posibles valores que tenga la navegación, de esta forma evitamos información redundante la próxima vez que se llame al componente
   */
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
    console.log("Desmontado");
  }

  /**
   * MÉTODO PARA CONVERTIR LA FECHA DE AMPLIFY EN FORMATO DATE PARA ASIGNARLO AL DATAPICKER
   * @param {*} oldDate
   */
  getBirthDate(oldDate) {
    if (oldDate != null && oldDate != undefined && oldDate != "") {
      //console.log("Fecha entrada " + oldDate);

      let splitedDate = oldDate.split("-");

      var tempDate = new Date(
        splitedDate[0],
        splitedDate[1] - 1,
        splitedDate[2]
      );

      //console.log("Fecha salida " + tempDate);

      return tempDate;
    } else {
      return new Date();
    }
  }

  /**
   * METÓDO QUE GUARDA EN EL STATE UNA FECHA STRING CON FORMATO "YYYY-MM-DD"
   * @param {*} newDate
   */
  setBirthDate(newDate) {
    //console.log("Fecha entrada " + newDate);

    var tempDate = new Date(newDate),
      month = "" + (tempDate.getMonth() + 1),
      day = "" + tempDate.getDate(),
      year = tempDate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    let myDate = [year, month, day].join("-");

    //console.log("Fecha salida " + myDate);

    this.setState({ fechaNacimiento: myDate });
  }

  /**
   * DO SOMETHING
   */
  updateDataConfirmation = () => {
    // VARIABLE DE CONTROL DE VERIFICACIÓN
    let error = false;

    // VALIDACIÓN DEL NOMBRE
    if (this.state.nombre == "") {
      error = true;
      this.setState({ nombre_error: true });
    } else {
      this.setState({ nombre_error: false });
    }

    // VALIDACIÓN DEL PRIMER APELLIDO
    if (this.state.apellidos == "") {
      error = true;
      this.setState({ apellidos_error: true });
    } else {
      this.setState({ apellidos_error: false });
    }

    if (typeof this.state.fechaNacimiento != "string") {
      this.setBirthDate(this.state.fechaNacimiento);
    }

    if (!error) {
      this.updateDataAsync();
    } else {
      this.setState({ loading_process_bar: false });
    }
  };

  /**
   *
   */
  updateDataAsync = async () => {};

  /**
   * MÉTODO ALERT DE VERIFICACIÓN DE DATOS
   * Se validan las contraseñas que contienen
   * al menos 7 caracteres y sean iguales
   * Cuando todo se valida se envía a "changePassword()"
   */
  newPasswordDataConfirmation() {
    // VARIABLE DE CONTROL DE VERIFICACIÓN
    let error = false;

    // VALIDACIÓN DE LA CONTRASEÑA ANTIGUA
    if (!Validar.validatePasswordWeak(this.state.old_password)) {
      error = true;
      this.setState({ old_password_error: true });
    } else {
      this.setState({ old_password_error: false });
    }

    // VALIDACIÓN DE LAS NUEVAS CONTRASEÑAS
    if (
      !Validar.validatePasswordWeak(this.state.password) &&
      !Validar.validatePasswordWeak(this.state.password_copy)
    ) {
      error = true;
      this.setState({ password_error: true });
    } else {
      this.setState({ password_error: false });
    }

    // VALIDACIÓN PARA QUE LAS CONTRASEÑAS COINCIDAN
    if (this.state.password !== this.state.password_copy) {
      error = true;
      this.setState({ password_copy_error: true });
    } else {
      this.setState({ password_copy_error: false });
    }

    if (!error) {
      // console.log("Todo va bien");
      // this.setState({ loading_process_bar: false });
      this.changePasswordAsync();
    } else {
      this.setState({ loading_process_bar: false });
    }
  }

  changePasswordAsync = async () => {};

  render() {
    return (
      <View style={ProfileStyles.container}>
        {NaviteBaseMenu.menuGoHome(this, "Profile")}
        <KeyboardAwareScrollView style={ProfileStyles.container}>
          <View style={ProfileStyles.view_form}>
            <View>
              <H2 style={ProfileStyles.mainTitle}>Modificar datos</H2>
            </View>
            {/* Nombre */}
            <Input
              leftIcon={
                <Icon
                  name="user"
                  type="simple-line-icon"
                  color="#6e78aa"
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
              placeholderTextColor="#6e78aa"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={false}
            />
            {/* Apellidos */}
            <Input
              leftIcon={
                <Icon
                  name="user-follow"
                  type="simple-line-icon"
                  color="#6e78aa"
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
              placeholderTextColor="#6e78aa"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={false}
            />
            {/* Numero de telefono */}
            <Input
              leftIcon={
                <Icon
                  name="screen-smartphone"
                  type="simple-line-icon"
                  color="#6e78aa"
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
                this.addressInput.focus();
              }}
              onChangeText={value => this.setState({ telefono: value })}
              errorMessage={
                this.state.telefono_error ? "Please enter a Phone Number" : null
              }
              containerStyle={ProfileStyles.input_container}
              inputContainerStyle={ProfileStyles.input_container_style}
              placeholderTextColor="#6e78aa"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={false}
            />

            {/* Fecha de Nacimiento */}
            <View style={ProfileStyles.input_container_birthdate}>
              {this.state.fechaNacimiento != "" ? (
                <View style={ProfileStyles.input_container_style_birthdate}>
                  <View
                    style={ProfileStyles.icon_birthdate}
                  >
                    <Icon
                      name="calendar"
                      type="simple-line-icon"
                      color="#6e78aa"
                      size={25}
                    />
                  </View>

                  <DatePicker
                    defaultDate={this.state.fechaNacimiento}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    textStyle={ProfileStyles.input_style}
                    onDateChange={newDate => {
                      this.setBirthDate(newDate);
                    }}
                    disabled={false}
                  />
                </View>
              ) : null}
            </View>

            {/* Direccion */}
            <Input
              leftIcon={
                <Icon
                  name="home"
                  type="simple-line-icon"
                  color="#6e78aa"
                  size={25}
                />
              }
              value={this.state.direccion}
              placeholder="Address"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              ref={input => (this.addressInput = input)}
              onSubmitEditing={() => {
                this.localeInput.focus();
              }}
              onChangeText={value => this.setState({ direccion: value })}
              containerStyle={ProfileStyles.input_container}
              inputContainerStyle={ProfileStyles.input_container_style}
              placeholderTextColor="#6e78aa"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={false}
            />

            {/* Localidad */}
            <Input
              leftIcon={
                <Icon
                  name="direction"
                  type="simple-line-icon"
                  color="#6e78aa"
                  size={25}
                />
              }
              value={this.state.localidad}
              placeholder="Locale"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              ref={input => (this.localeInput = input)}
              onSubmitEditing={() => {
                this.provinceInput.focus();
              }}
              onChangeText={value => this.setState({ localidad: value })}
              containerStyle={ProfileStyles.input_container}
              inputContainerStyle={ProfileStyles.input_container_style}
              placeholderTextColor="#6e78aa"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={false}
            />

            {/* Provincia */}
            <Input
              leftIcon={
                <Icon
                  name="directions"
                  type="simple-line-icon"
                  color="#6e78aa"
                  size={25}
                />
              }
              value={this.state.provincia}
              placeholder="Province"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              ref={input => (this.provinceInput = input)}
              onSubmitEditing={() => {
                this.postalInput.focus();
              }}
              onChangeText={value => this.setState({ provincia: value })}
              containerStyle={ProfileStyles.input_container}
              inputContainerStyle={ProfileStyles.input_container_style}
              placeholderTextColor="#6e78aa"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={false}
            />

            {/* Codigo postal */}
            <Input
              leftIcon={
                <Icon
                  name="location-pin"
                  type="simple-line-icon"
                  color="#6e78aa"
                  size={25}
                />
              }
              value={this.state.codigo_postal}
              placeholder="Postal code"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              returnKeyType="next"
              ref={input => (this.postalInput = input)}
              onSubmitEditing={() => {
                this.countryInput.focus();
              }}
              onChangeText={value => this.setState({ codigo_postal: value })}
              containerStyle={ProfileStyles.input_container}
              inputContainerStyle={ProfileStyles.input_container_style}
              placeholderTextColor="#6e78aa"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={false}
            />

            {/* Pais */}
            <Input
              leftIcon={
                <Icon
                  name="globe-alt"
                  type="simple-line-icon"
                  color="#6e78aa"
                  size={25}
                />
              }
              value={this.state.pais}
              placeholder="Country"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              ref={input => (this.countryInput = input)}
              onSubmitEditing={this.updateDataConfirmation}
              onChangeText={value => this.setState({ pais: value })}
              containerStyle={ProfileStyles.input_container}
              inputContainerStyle={ProfileStyles.input_container_style}
              placeholderTextColor="#6e78aa"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={false}
            />

            <Button
              loading={false}
              title="UPDATE PROFILE"
              containerStyle={ProfileStyles.button_profile_container_style}
              buttonStyle={ProfileStyles.button_profile_style}
              titleStyle={ProfileStyles.button_title_style}
              onPress={this.updateDataConfirmation}
              disabled={false}
            />

            <View>
              <H2 style={ProfileStyles.title}>Modificar contraseña</H2>
            </View>

            <Input
              leftIcon={
                <Icon
                  name="lock"
                  type="simple-line-icon"
                  color="#6e78aa"
                  size={25}
                />
              }
              placeholder="Old Password"
              autoCapitalize="none"
              secureTextEntry={true}
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              ref={input => (this.oldPassword2Input = input)}
              onSubmitEditing={() => {
                this.confirmPassword2Input.focus();
              }}
              onChangeText={old_password => {
                this.setState({ old_password: old_password });
              }}
              errorMessage={
                this.state.old_password_error
                  ? "Please enter a valid password"
                  : null
              }
              containerStyle={ProfileStyles.input_container}
              inputContainerStyle={ProfileStyles.input_container_style}
              placeholderTextColor="#6e78aa"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={false}
            />

            <Input
              leftIcon={
                <Icon
                  name="lock"
                  type="simple-line-icon"
                  color="#6e78aa"
                  size={25}
                />
              }
              placeholder="New Password"
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
              placeholderTextColor="#6e78aa"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={false}
            />
            <Input
              leftIcon={
                <Icon
                  name="lock"
                  type="simple-line-icon"
                  color="#6e78aa"
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
              onSubmitEditing={this.newPasswordDataConfirmation}
              onChangeText={value => this.setState({ password_copy: value })}
              errorMessage={
                this.state.password_copy_error
                  ? "Your passwords doesn't match"
                  : null
              }
              containerStyle={ProfileStyles.input_container}
              inputContainerStyle={ProfileStyles.input_container_style}
              placeholderTextColor="#6e78aa"
              inputStyle={ProfileStyles.input_style}
              keyboardAppearance="light"
              blurOnSubmit={true}
            />
            <Button
              loading={false}
              title="UPDATE PASSWORD"
              containerStyle={ProfileStyles.button_profile_container_style}
              buttonStyle={ProfileStyles.button_signup_style}
              titleStyle={ProfileStyles.button_title_style}
              onPress={this.newPasswordDataConfirmation}
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
