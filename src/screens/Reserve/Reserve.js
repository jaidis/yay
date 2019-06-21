import React, { Component } from "react";
import { View, ScrollView, Image, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import { deleteReserva, addBookings } from "../../store/actions/index";

import {
  Content,
  Card,
  CardItem,
  DatePicker as DatePickerNativeBase,
  Picker,
  H3
} from "native-base";
import { Icon, Input, Button } from "react-native-elements";

import DatePicker from "react-native-datepicker";

// FUNCTIONS OR HELPERS
import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";
import * as AppConsts from "../../../config/app_consts";
import * as YAY_Api from "../../functions/YAY_Api_helper";

// LANGUAGES LIBRARY
import { setI18nConfig } from "../../../languages/i18n";
var i18n = setI18nConfig();

// STYLES
import ReserveStyles from "./ReserveStyles";

class Reserve extends Component {
  static navigationOptions = {
    title: i18n.t("reserve_view_title")
  };

  state = {
    appJson: "",
    loading_reserve: false,
    registerBooking: false,
    fechaReserva: "",
    horaReserva: "20:00",
    comensales: "2",
    creditCard: [],
    id_credit_card: 0,
    button_reserve: true
  };

  /**
   * @description
   */
  checkData() {
    try {
      this.setState({
        fechaReserva: this.props.reservaJSON
          ? this.getBookingDate(this.props.reservaJSON.reserve_date)
          : this.getBookingDate(),
        horaReserva: this.props.reservaJSON
          ? this.props.reservaJSON.reserve_time
          : "20:00",
        creditCard: this.props.appJson.userdata.credit_card,
        id_credit_card: this.props.reservaJSON
          ? this.props.reservaJSON.id_credit_card
          : 0
      });

      if (this.props.appJson.userdata.credit_card.length > 0) {
        this.setState({ button_reserve: false });
      }
      // console.log("Datos comprobados");
    } catch {
      error => {
        console.log("Error when try to retrieve user from Redux: \n" + error);
      };
    }
  }

  /**
   * COMPONENT DID MOUNT
   * @description Acciones cuando se carga el componente
   */
  async componentDidMount() {
    this.checkData();

    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        // console.log("RESERVE, inicio");
        this.checkData();
      }),
      this.props.navigation.addListener("willBlur", async () => {
        // console.log("RESERVE, me voy");
        try {
          this.props.c_deleteReserva();
        } catch (error) {
          console.log(error);
        }
      })
    ];
  }

  /**
   * COMPONENT WILL UNMOUNT
   * @description Acciones cuando se desmonta el componente
   */
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
    // console.log("RESERVE, Desmontado");
    try {
      this.props.c_deleteReserva();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description
   */
  encryptedCard = creditCard => {
    let temp = creditCard.split(" ");
    return temp[0] + " xxxx xxxx " + temp[3];
  };

  /**
   * MÉTODO PARA CONVERTIR LA FECHA DE AMPLIFY EN FORMATO DATE PARA ASIGNARLO AL DATAPICKER
   * @param {*} oldDate
   */
  getBookingDate(oldDate) {
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
  setBookingDate(newDate) {
    //console.log("Fecha entrada " + newDate);

    var tempDate = new Date(newDate),
      month = "" + (tempDate.getMonth() + 1),
      day = "" + tempDate.getDate(),
      year = tempDate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    let myDate = [year, month, day].join("-");

    //console.log("Fecha salida " + myDate);

    this.setState({ fechaReserva: myDate });
  }

  /**
   * @description
   */
  setCreditCard = value => {
    this.setState({ id_credit_card: value });
  };

  /**
   * @description
   */
  registerBooking = async () => {
    NetInfo.isConnected
      .fetch()
      .then(async isConnected => {
        if (isConnected) {
          try {
            this.setState({ loading_reserve: true });
            bookingJSON = {
              token: this.props.appJson.userdata.token,
              reserve_date: this.state.fechaReserva,
              reserve_time: this.state.horaReserva,
              diners: this.state.comensales,
              id_restaurant: this.props.restaurantJson.data.id,
              id_credit_card: this.state.id_credit_card
            };

            // console.log("id_credit_card", this.state.id_credit_card);
            let response = await YAY_Api.fetchInternetDataAsync(
              AppConsts.URL_BOOKINGS_REGISTER,
              await YAY_Api.getRequestPostAsync(bookingJSON)
            );
            // console.log(response);

            if (response.status === "success") {
              this.props.c_addBookings(response);
              setTimeout(() => {
                this.setState({ loading_reserve: false });
                this.props.navigation.navigate("ReserveConfirmed");
              }, 300);
            } else {
              console.log(response);
              this.setState({ loading_reserve: false });
            }
          } catch (error) {
            console.log(error);
            this.setState({ loading_reserve: false });
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
      <View style={ReserveStyles.container}>
        {NaviteBaseMenu.menuGoBack(
          this,
          this.props.reservaJSON
            ? this.props.reservaJSON.restaurant_name
            : this.props.restaurantJson
            ? this.props.restaurantJson.data.name
            : i18n.t("reserve_view_title")
        )}
        <ScrollView>
          <View style={ReserveStyles.reserve_scroll_view}>
            <Content>
              <Card style={ReserveStyles.reserve_card_style}>
                <CardItem cardBody>
                  <Image
                    source={{
                      uri: this.props.reservaJSON
                        ? this.props.reservaJSON.restaurant_logo
                        : this.props.restaurantJson
                        ? this.props.restaurantJson.data.logo
                        : null
                    }}
                    style={ReserveStyles.reserve_card_image}
                  />
                </CardItem>
                <CardItem
                  cardBody
                  style={ReserveStyles.reserve_card_item_title_style}
                >
                  <H3>{i18n.t("reserve_booking_title").toUpperCase()}</H3>
                </CardItem>
                <CardItem
                  cardBody
                  style={ReserveStyles.reserve_card_item_style}
                >
                  <Content>
                    <View style={ReserveStyles.view_form}>
                      {/* Fecha de Nacimiento */}
                      <View style={ReserveStyles.input_container_date_time}>
                        {this.state.fechaReserva != "" ? (
                          <View
                            style={
                              ReserveStyles.input_container_style_date_time
                            }
                          >
                            <View style={ReserveStyles.icon_date_time}>
                              <Icon
                                name="calendar"
                                type="simple-line-icon"
                                color="#6e78aa"
                                size={25}
                              />
                            </View>

                            <DatePickerNativeBase
                              minimumDate={new Date()}
                              defaultDate={this.state.fechaReserva}
                              locale={"es"}
                              timeZoneOffsetInMinutes={undefined}
                              modalTransparent={false}
                              animationType={"fade"}
                              androidMode={"default"}
                              textStyle={ReserveStyles.input_style_date_time}
                              onDateChange={newDate => {
                                this.setBookingDate(newDate);
                              }}
                              disabled={false}
                            />
                          </View>
                        ) : null}
                      </View>

                      <View style={ReserveStyles.input_container_date_time}>
                        {this.state.horaReserva != "" ? (
                          <View
                            style={
                              ReserveStyles.input_container_style_date_time
                            }
                          >
                            <View style={ReserveStyles.icon_date_time}>
                              <Icon
                                name="clock"
                                type="simple-line-icon"
                                color="#6e78aa"
                                size={25}
                              />
                            </View>

                            <DatePicker
                              style={ReserveStyles.reserve_date_picker_style}
                              date={this.state.horaReserva}
                              mode="time"
                              format="HH:mm"
                              confirmBtnText={i18n.t("reserve_date_picker_confirm")}
                              cancelBtnText={i18n.t("reserve_date_picker_cancel")}
                              minuteInterval={10}
                              onDateChange={time => {
                                this.setState({ horaReserva: time });
                              }}
                              customStyles={{
                                dateInput: ReserveStyles.input_style_date_input,
                                dateText: ReserveStyles.input_style_date_time
                              }}
                              showIcon={false}
                              is24Hour={true}
                            />
                          </View>
                        ) : null}
                      </View>
                      <Input
                        leftIcon={
                          <Icon
                            name="users"
                            type="font-awesome"
                            color="#6e78aa"
                            size={25}
                          />
                        }
                        placeholder={i18n.t("reserve_form_diners")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        value={
                          this.props.reservaJSON
                            ? this.props.reservaJSON.diners + ""
                            : this.state.comensales
                        }
                        onChangeText={value =>
                          this.setState({ comensales: value })
                        }
                        errorMessage={
                          this.state.comensales_error
                            ? i18n.t("reserve_form_diners_error")
                            : null
                        }
                        containerStyle={ReserveStyles.input_container}
                        inputContainerStyle={
                          ReserveStyles.input_container_style
                        }
                        placeholderTextColor="#6e78aa"
                        inputStyle={ReserveStyles.input_style}
                        keyboardAppearance="light"
                        blurOnSubmit={false}
                      />
                    </View>
                  </Content>
                </CardItem>
                <CardItem
                  cardBody
                  style={ReserveStyles.reserve_card_item_title_style}
                >
                  <H3>{i18n.t("reserve_user_title").toUpperCase()}</H3>
                </CardItem>
                <CardItem cardBody style={ReserveStyles.reserve_card_item_style}>
                  <Content>
                    <View style={ReserveStyles.view_form}>
                      <Input
                        leftIcon={
                          <Icon
                            name="user"
                            type="simple-line-icon"
                            color="#6e78aa"
                            size={25}
                          />
                        }
                        placeholder={i18n.t("reserve_form_first_name")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType="next"
                        value={
                          this.props.reservaJSON
                            ? this.props.reservaJSON.first_name +
                              " " +
                              this.props.reservaJSON.last_name
                            : this.props.appJson.userdata.user.name +
                              " " +
                              this.props.appJson.userdata.user.lastName
                        }
                        editable={false}
                        containerStyle={ReserveStyles.input_container}
                        inputContainerStyle={
                          ReserveStyles.input_container_style
                        }
                        placeholderTextColor="#6e78aa"
                        inputStyle={ReserveStyles.input_style}
                        keyboardAppearance="light"
                        blurOnSubmit={false}
                      />
                      <Input
                        leftIcon={
                          <Icon
                            name="screen-smartphone"
                            type="simple-line-icon"
                            color="#6e78aa"
                            size={25}
                          />
                        }
                        placeholder={i18n.t("reserve_form_phone_number")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        returnKeyType="next"
                        value={
                          this.props.reservaJSON
                            ? this.props.reservaJSON.phone_number
                            : this.props.appJson.userdata.user.phoneNumber
                        }
                        editable={false}
                        containerStyle={ReserveStyles.input_container}
                        inputContainerStyle={
                          ReserveStyles.input_container_style
                        }
                        placeholderTextColor="#6e78aa"
                        inputStyle={ReserveStyles.input_style}
                        keyboardAppearance="light"
                        blurOnSubmit={false}
                      />
                      <Input
                        leftIcon={
                          <Icon
                            name="email-outline"
                            type="material-community"
                            color="#6e78aa"
                            size={25}
                          />
                        }
                        placeholder={i18n.t("reserve_form_email")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType="next"
                        value={
                          this.props.reservaJSON
                            ? this.props.reservaJSON.email
                            : this.props.appJson.userdata.user.email
                        }
                        editable={false}
                        containerStyle={ReserveStyles.input_container}
                        inputContainerStyle={
                          ReserveStyles.input_container_style
                        }
                        placeholderTextColor="#6e78aa"
                        inputStyle={ReserveStyles.input_style}
                        keyboardAppearance="light"
                        blurOnSubmit={false}
                      />
                      <View style={ReserveStyles.input_container_date_time}>
                        {this.state.horaReserva != "" ? (
                          <View
                            style={
                              ReserveStyles.input_container_style_date_time
                            }
                          >
                            <View style={ReserveStyles.icon_date_time}>
                              <Icon
                                name="credit-card"
                                type="font-awesome"
                                color="#6e78aa"
                                size={25}
                              />
                            </View>

                            <Picker
                              mode="dropdown"
                              // iosIcon={<Icon name="arrow-down" />}
                              style={ReserveStyles.reserve_picker_style}
                              placeholder={i18n.t("reserve_form_credit_card")}
                              placeholderStyle={ReserveStyles.reserve_picker_color_style}
                              placeholderIconColor="#6e78aa"
                              selectedValue={this.state.id_credit_card}
                              onValueChange={value => this.setCreditCard(value)}
                            >
                              {this.state.creditCard.length > 0
                                ? this.state.creditCard.map(
                                    (creditCard, index) => {
                                      return (
                                        <Picker.Item
                                          label={this.encryptedCard(
                                            creditCard.number
                                          )}
                                          value={creditCard.id}
                                          key={index}
                                        />
                                      );
                                    }
                                  )
                                : null}
                            </Picker>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </Content>
                </CardItem>
                <CardItem cardBody style={ReserveStyles.reserve_card_item_style}>
                  <Content>
                    <View style={ReserveStyles.view_form}>
                      {this.props.reservaJSON == null ? (
                        <Button
                          loading={this.state.loading_reserve}
                          title={i18n.t("reserve_form_button_register").toUpperCase()}
                          containerStyle={
                            ReserveStyles.button_reserve_container_style
                          }
                          buttonStyle={ReserveStyles.button_reserve_style}
                          titleStyle={ReserveStyles.button_title_style}
                          onPress={this.registerBooking}
                          disabled={this.state.button_reserve}
                        />
                      ) : null}
                    </View>
                  </Content>
                </CardItem>
              </Card>
            </Content>
          </View>
        </ScrollView>
      </View>
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
    loading_bar: state.mainReducer.loading,
    restaurantJson: state.mainReducer.restaurantJson,
    reservaJSON: state.mainReducer.reservaJSON
  };
};

/**
 * @description
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    c_deleteReserva: () => dispatch(deleteReserva()),
    c_addBookings: reservaJSON => dispatch(addBookings(reservaJSON))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reserve);
