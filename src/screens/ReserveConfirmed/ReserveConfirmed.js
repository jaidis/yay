import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { loadingTrue, loadingFalse } from "../../store/actions/index";

import { Button } from "react-native-elements";
import ResponsiveImage from "react-native-responsive-image";

// LANGUAGES LIBRARY
import { setI18nConfig } from "../../../languages/i18n";
var i18n = setI18nConfig();

// STYLES
import ReserveConfirmedStyles from "./ReserveConfirmedStyles";

class ReserveConfirmed extends Component {
  static navigationOptions = {
    title: i18n.t("reserve_confirmed_view_title")
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
        // console.log("inicio");
        //Do Something
      }),
      this.props.navigation.addListener("willBlur", async () => {
        // console.log("me voy");
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
    // console.log("Desmontado");
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
          <Text style={ReserveConfirmedStyles.view_empty_text}>
            {i18n.t("reserve_confirmed_view_text_1")}
          </Text>
          <Text style={ReserveConfirmedStyles.view_empty_text}>
            {i18n.t("reserve_confirmed_view_text_2")}
          </Text>
          <Button
            loading={false}
            title={i18n.t("reserve_confirmed_button").toUpperCase()}
            containerStyle={
              ReserveConfirmedStyles.button_reserve_container_style
            }
            buttonStyle={ReserveConfirmedStyles.button_reserve_style}
            titleStyle={ReserveConfirmedStyles.button_title_style}
            onPress={() => {
              this.props.navigation.navigate("DetailView");
            }}
            disabled={false}
          />
        </View>
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
    loading_bar: state.mainReducer.loading
  };
};

/**
 * @description
 * @param {*} dispatch
 */
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
