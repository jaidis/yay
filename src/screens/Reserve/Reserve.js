import React, { Component } from "react";
import { View, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
import {
  loadingTrue,
  loadingFalse,
  deleteReserva,
  addBookings
} from "../../store/actions/index";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  DatePicker as DatePickerNativeBase,
  Picker,
  Text,
  Right,
  Body,
  H2,
  H3
} from "native-base";
import { Icon, Input, Button } from "react-native-elements";

import DatePicker from "react-native-datepicker";

import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";
import * as AppConsts from "../../../config/app_consts";
import * as YAY_Api from "../../functions/YAY_Api_helper";

import ReserveStyles from "./ReserveStyles";

class Reserve extends Component {
  static navigationOptions = {
    title: "Reserve"
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
      console.log("Datos comprobados");
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
        console.log("RESERVE, inicio");
        this.checkData();
      }),
      this.props.navigation.addListener("willBlur", async () => {
        console.log("RESERVE, me voy");
        this.props.c_deleteReserva();
      })
    ];
  }

  /**
   * COMPONENT WILL UNMOUNT
   * @description Acciones cuando se desmonta el componente
   */
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
    console.log("RESERVE, Desmontado");
    this.props.c_deleteReserva();
  }

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

  setCreditCard = value => {
    this.setState({ id_credit_card: value });
  };

  registerBooking = async () => {
    this.setState({ loading_reserve: true });
    bookingJSON = {
      token: this.props.appJson.userdata.token,
      reserve_date: this.state.fechaReserva,
      reserve_time: this.state.horaReserva,
      diners: this.state.comensales,
      id_restaurant: this.props.restaurantJson.data.id,
      id_credit_card: this.state.id_credit_card
    };
    console.log("id_credit_card", this.state.id_credit_card);
    response = await YAY_Api.fetchInternetDataAsync(
      AppConsts.URL_BOOKINGS_REGISTER,
      await YAY_Api.getRequestPostAsync(bookingJSON)
    );
    console.log(response);
    if (response.status === "success") {
      this.props.c_addBookings(response);
      setTimeout(() => {
        this.setState({ loading_reserve: false });
        this.props.navigation.navigate("ReserveConfirmed");
      }, 300);
    } else {
      console.log("Algo va mal", response);
      this.setState({ loading_reserve: false });
    }
    
  };

  render() {
    return (
      <View style={ReserveStyles.container}>
        {NaviteBaseMenu.menuGoBack(
          this,
          this.props.reservaJSON
            ? this.props.reservaJSON.restaurant_name
            : this.props.restaurantJson.data.name
        )}
        <ScrollView>
          <View style={{ flex: 1, margin: 20 }}>
            <Content>
              <Card style={{ paddingBottom: 20 }}>
                <CardItem cardBody>
                  <Image
                    source={{
                      uri: this.props.reservaJSON
                        ? this.props.reservaJSON.restaurant_logo
                        : this.props.restaurantJson.data.logo
                    }}
                    style={{ flex: 1, height: 200, width: null }}
                  />
                </CardItem>
                <CardItem
                  cardBody
                  style={{
                    marginTop: 30,
                    alignContent: "center",
                    justifyContent: "center"
                  }}
                >
                  <H3>Datos de la reserva</H3>
                </CardItem>
                <CardItem cardBody style={{ marginTop: 20 }}>
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
                              locale={"en"}
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
                              style={{ width: 200 }}
                              date={this.state.horaReserva}
                              mode="time"
                              format="HH:mm"
                              confirmBtnText="Confirm"
                              cancelBtnText="Cancel"
                              minuteInterval={10}
                              onDateChange={time => {
                                this.setState({ horaReserva: time });
                              }}
                              customStyles={{
                                dateInput: {
                                  borderColor: "#FFF",
                                  alignItems: "flex-start",
                                  marginLeft: 10,
                                  marginTop: 5
                                },
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
                            color="rgba(110, 120, 170, 1)"
                            size={25}
                          />
                        }
                        placeholder="Diners"
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
                            ? "Please, type how many diners"
                            : null
                        }
                        containerStyle={ReserveStyles.input_container}
                        inputContainerStyle={
                          ReserveStyles.input_container_style
                        }
                        placeholderTextColor="rgba(110, 120, 170, 1)"
                        inputStyle={ReserveStyles.input_style}
                        keyboardAppearance="light"
                        blurOnSubmit={false}
                      />
                    </View>
                  </Content>
                </CardItem>
                <CardItem
                  cardBody
                  style={{
                    marginTop: 30,
                    alignContent: "center",
                    justifyContent: "center"
                  }}
                >
                  <H3>Datos del contacto</H3>
                </CardItem>
                <CardItem cardBody style={{ marginTop: 20 }}>
                  <Content>
                    <View style={ReserveStyles.view_form}>
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
                        placeholderTextColor="rgba(110, 120, 170, 1)"
                        inputStyle={ReserveStyles.input_style}
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
                        placeholderTextColor="rgba(110, 120, 170, 1)"
                        inputStyle={ReserveStyles.input_style}
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
                        placeholderTextColor="rgba(110, 120, 170, 1)"
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
                              iosIcon={<Icon name="arrow-down" />}
                              style={{ marginLeft: 10 }}
                              placeholder={"Credit Card"}
                              placeholderStyle={{ color: "#6e78aa" }}
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
                <CardItem cardBody style={{ marginTop: 20 }}>
                  <Content>
                    <View style={ReserveStyles.view_form}>
                      {this.props.reservaJSON == null ? (
                        <Button
                          loading={this.state.loading_reserve}
                          title="REGISTER BOOKING"
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

const mapStateToProps = state => {
  return {
    appJson: state.mainReducer.appJson,
    loading_bar: state.mainReducer.loading,
    restaurantJson: state.mainReducer.restaurantJson,
    reservaJSON: state.mainReducer.reservaJSON
  };
};

const mapDispatchToProps = dispatch => {
  return {
    c_loadingTrue: () => dispatch(loadingTrue()),
    c_loadingFalse: () => dispatch(loadingFalse()),
    c_deleteReserva: () => dispatch(deleteReserva()),
    c_addBookings: reservaJSON => dispatch(addBookings(reservaJSON))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reserve);
