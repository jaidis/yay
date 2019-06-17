import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { loadingTrue, loadingFalse } from "../../store/actions/index";

import { Icon, Button } from "react-native-elements";
import { H1 } from "native-base";
import ResponsiveImage from "react-native-responsive-image";

import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";

import ReserveConfirmedStyles from "./ReserveConfirmedStyles";

class ReserveConfirmed extends Component {
  static navigationOptions = {
    title: "ReserveConfirmed"
  };

  state = {
    appJson: ""
  };

  /**
   * COMPONENT DID MOUNT
   * @description Acciones cuando se carga el componente
   */
  async componentDidMount() {
    //Do Something

    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        console.log("inicio");
        //Do Something
      }),
      this.props.navigation.addListener("willBlur", async () => {
        console.log("me voy");
        //Do Something
      })
    ];
  }

  /**
   * COMPONENT WILL UNMOUNT
   * @description Acciones cuando se desmonta el componente
   */
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
    console.log("Desmontado");
    //Do Something
  }

  render() {
    return (
      <View style={ReserveConfirmedStyles.container}>
        <View style={ReserveConfirmedStyles.view_empty}>
          <View style={ReserveConfirmedStyles.logo}>
            <ResponsiveImage
              source={require("../../../assets/img/yay-logo-rounded.png")}
              initWidth="200"
              initHeight="200"
            />
          </View>
          <Text style={ReserveConfirmedStyles.view_empty_text}>¡Genial!</Text>
          <Text style={ReserveConfirmedStyles.view_empty_text}>
            Tu petición se ha enviado correctamente, revisa el apartado de
            reservas, en breve el restaurante confirmará la reserva
          </Text>
          <Button
            loading={false}
            title="VOLVER AL INICIO"
            containerStyle={
              ReserveConfirmedStyles.button_reserve_container_style
            }
            buttonStyle={ReserveConfirmedStyles.button_reserve_style}
            titleStyle={ReserveConfirmedStyles.button_title_style}
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
            disabled={false}
          />
        </View>
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
)(ReserveConfirmed);
