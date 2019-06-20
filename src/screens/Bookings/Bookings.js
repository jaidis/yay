import React, { Component } from "react";
import { View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import {
  addBookings,
  addReserva,
  deleteReserva
} from "../../store/actions/index";

import { Icon } from "react-native-elements";
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";

// FUNCTIONS OR HELPERS
import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";
import * as AppConsts from "../../../config/app_consts";
import * as YAY_Api from "../../functions/YAY_Api_helper";

// LANGUAGES LIBRARY
import { setI18nConfig } from "../../../languages/i18n";
var i18n = setI18nConfig();

// STYLES
import BookingsStyles from "./BookingsStyles";

class Bookings extends Component {
  static navigationOptions = {
    title: i18n.t("bookings_title")
  };

  state = {
    appJson: "",
    bookings: null,
    reservas_disponibles: null
  };

  async loadContent() {
    if (this.props.bookingsJSON != null) {
      this.setState({
        reservas_disponibles: true,
        bookings: this.props.bookingsJSON
      });
    } else {
      this.setState({ reservas_disponibles: false });
    }

    NetInfo.isConnected
      .fetch()
      .then(async isConnected => {
        if (isConnected) {
          try {
            bookingJSON = { token: this.props.appJson.userdata.token };
            let response = await YAY_Api.fetchInternetDataAsync(
              AppConsts.URL_BOOKINGS_SEARCH,
              await YAY_Api.getRequestPostAsync(bookingJSON)
            );
            if (response.status === "success") {
              this.props.c_addBookings(response);
              this.setState({ reservas_disponibles: true, bookings: response });
            } else {
              console.log(response);
            }
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * COMPONENT DID MOUNT
   * @description Acciones cuando se carga el componente
   */
  async componentDidMount() {
    // this.loadContent();

    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        // console.log("BOOKINGS, inicio");
        this.loadContent();
      }),
      this.props.navigation.addListener("willBlur", async () => {
        // console.log("BOOKINGS, me voy");
      })
    ];
  }

  /**
   * COMPONENT WILL UNMOUNT
   * @description Acciones cuando se desmonta el componente
   */
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
    // console.log("BOOKINGS, Desmontado");
    this.props.c_deleteReserva();
  }
  /**
   * @description Cambia la fecha a formato español
   * @param {*} date
   */
  formatDate(date) {
    let splitedDate = date.split("-");
    return splitedDate[2] + "-" + splitedDate[1] + "-" + splitedDate[0];
  }

  /**
   * @description Guarda la reserva en Redux y muestra la pantalla de Reserva
   * @param {*} reserva
   */
  detailBooking(reserva) {
    this.props.c_addReserva(reserva);
    this.props.navigation.navigate("Reserve");
  }

  /**
   * @description Devuelve elementos de una lista con la información de la reserva maquetada
   * @param {*} reserva
   * @param {*} index
   */
  renderReservas(reserva, index) {
    return (
      <ListItem
        avatar
        key={index}
        button
        onPress={() => {
          this.detailBooking(reserva);
        }}
      >
        <Left>
          <Thumbnail source={{ uri: reserva.restaurant_logo }} />
        </Left>
        <Body>
          <Text>{reserva.restaurant_name}</Text>
          <Text note>
            {i18n.t("bookings_list_item_diners")} {reserva.diners}
          </Text>
          <Text note>
            {i18n.t("bookings_list_item_date")}
            {this.formatDate(reserva.reserve_date)}
          </Text>
          <Text note>
            {i18n.t("bookings_list_item_hour")}
            {reserva.reserve_time}
          </Text>
          <Text note>
            {i18n.t("bookings_list_item_status")}
            {reserva.status}
          </Text>
        </Body>
        <Right style={BookingsStyles.bookings_list_right}>
          <Icon name="chevron-right" size={30} />
        </Right>
      </ListItem>
    );
  }

  /**
   * @description
   */
  renderEmpty = () => {
    return (
      <View style={BookingsStyles.bookings_empty}>
        <Text style={BookingsStyles.bookings_empty_text}>
        {i18n.t("bookings_list_item_date")}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={BookingsStyles.container}>
        {NaviteBaseMenu.menuGoHome(this, i18n.t("bookings_title"))}
        {this.state.reservas_disponibles ? (
          <Container style={BookingsStyles.bookings_container}>
            <Content>
              <List style={BookingsStyles.bookings_list}>
                {this.state.bookings.data.map((reserva, index) => {
                  return this.renderReservas(reserva, index);
                })}
              </List>
            </Content>
          </Container>
        ) : (
          this.renderEmpty()
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    appJson: state.mainReducer.appJson,
    loading_bar: state.mainReducer.loading,
    bookingsJSON: state.mainReducer.bookingsJSON
  };
};

const mapDispatchToProps = dispatch => {
  return {
    c_loadingTrue: () => dispatch(loadingTrue()),
    c_loadingFalse: () => dispatch(loadingFalse()),
    c_addBookings: reservaJSON => dispatch(addBookings(reservaJSON)),
    c_addReserva: reserva => dispatch(addReserva(reserva)),
    c_deleteReserva: () => dispatch(deleteReserva())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bookings);
