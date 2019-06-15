import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import {
  loadingTrue,
  loadingFalse,
  addBookings,
  addReserva,
  deleteReserva
} from "../../store/actions/index";

import { Icon } from "react-native-elements";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";

import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";
import * as AppConsts from "../../../config/app_consts";
import * as YAY_Api from "../../functions/YAY_Api_helper";

import BookingsStyles from "./BookingsStyles";

import reserva from "../../../reserva.json";

class Bookings extends Component {
  static navigationOptions = {
    title: "Bookings"
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

    try {
      bookingJSON = { token: this.props.appJson.userdata.token };
      let response = await YAY_Api.fetchInternetDataAsync(
        AppConsts.URL_BOOKINGS_SEARCH,
        await YAY_Api.getRequestPostAsync(bookingJSON)
      );

      if (response.data.length > 0) {
        this.props.c_addBookings(response);
        this.setState({ reservas_disponibles: true, bookings: response });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * COMPONENT DID MOUNT
   * @description Acciones cuando se carga el componente
   */
  async componentDidMount() {
    // this.loadContent();

    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        console.log("BOOKINGS, inicio");
        this.loadContent();
      }),
      this.props.navigation.addListener("willBlur", async () => {
        console.log("BOOKINGS, me voy");
      })
    ];
  }

  /**
   * COMPONENT WILL UNMOUNT
   * @description Acciones cuando se desmonta el componente
   */
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
    console.log("BOOKINGS, Desmontado");
    this.props.c_deleteReserva();
  }

  formatDate(date) {
    let splitedDate = date.split("-");
    return splitedDate[2] + "-" + splitedDate[1] + "-" + splitedDate[0];
  }

  detailBooking(reserva) {
    this.props.c_addReserva(reserva);
    this.props.navigation.navigate("Reserve");
  }

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
          <Text note>Diners: {reserva.diners}</Text>
          <Text note>Date: {this.formatDate(reserva.reserve_date)}</Text>
          <Text note>Hour: {reserva.reserve_time}</Text>
          <Text note>Status: {reserva.status}</Text>
        </Body>
        <Right style={{ justifyContent: "center", alignItems: "center" }}>
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
      <View style={BookingsStyles.favorites_empty}>
        <Text style={BookingsStyles.favorites_empty_text}>
          No existen reservas
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={BookingsStyles.container}>
        {NaviteBaseMenu.menuGoHome(this, "Bookings")}
        {this.state.reservas_disponibles ? (
          <Container style={{ backgroundColor: "#2E3248" }}>
            <Content>
              <List style={{ backgroundColor: "white" }}>
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
