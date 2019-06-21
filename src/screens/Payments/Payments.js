import React, { Component } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { connect } from "react-redux";

import { Icon, Button } from "react-native-elements";
import { Content, Card, CardItem } from "native-base";
import { addCreditCard, deleteCreditCard } from "../../store/actions/index";

import { Grid, Row, Col } from "react-native-easy-grid";

// FUNCTIONS OR HELPERS
import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";

// LANGUAGES LIBRARY
import { setI18nConfig } from "../../../languages/i18n";
var i18n = setI18nConfig();

// STYLES
import PaymentsStyles from "./PaymentsStyles";

class Payments extends Component {
  static navigationOptions = {
    title: i18n.t("payments_view_title")
  };

  state = {
    appJson: ""
  };

  /**
   * COMPONENT DID MOUNT
   * @description Acciones cuando se carga el componente
   */
  async componentDidMount() {
    this.props.c_deleteCreditCard();
    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        // console.log("inicio");
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

  encryptedCard = creditCard => {
    let temp = creditCard.split(" ");
    return temp[0] + " xxxx xxxx " + temp[3];
  };

  render() {
    return (
      <View style={PaymentsStyles.container}>
        {NaviteBaseMenu.menuGoHome(this, i18n.t("payments_view_title"))}
        <ScrollView
          contentContainerStyle={PaymentsStyles.payments_scroll_view_container}
        >
          <View style={PaymentsStyles.payments_view_container}>
            <Grid style={PaymentsStyles.payments_grid_style}>
              <Row>
                <Content>
                  <Card style={PaymentsStyles.payments_card_style}>
                    <CardItem
                      header
                      style={PaymentsStyles.payments_card_item_header_style}
                    >
                      <Text style={PaymentsStyles.payments_card_item_text}>
                        {i18n.t("payments_view_card_header").toUpperCase()}
                      </Text>
                    </CardItem>
                    {this.props.appJson.userdata.credit_card.length > 0 ? (
                      this.props.appJson.userdata.credit_card.map(
                        (tarjeta, i) => (
                          <CardItem
                            key={i}
                            button
                            onPress={() => {
                              this.props.c_addCreditCard(tarjeta);
                              this.props.navigation.navigate("CreditCard");
                            }}
                          >
                            <Icon name="credit-card" type="font-awesome" />
                            <Text
                              style={
                                PaymentsStyles.payments_card_item_number_style
                              }
                            >
                              {this.encryptedCard(tarjeta.number)}
                            </Text>
                          </CardItem>
                        )
                      )
                    ) : (
                      <CardItem>
                        <Icon name="info-circle" type="font-awesome" />
                        <Text
                          style={PaymentsStyles.payments_card_item_number_style}
                        >
                          {i18n.t("payments_view_card_not_found").toUpperCase()}
                        </Text>
                      </CardItem>
                    )}
                  </Card>
                </Content>
              </Row>
            </Grid>
          </View>

          <Button
            loading={this.state.update_data_loading}
            disabled={false}
            title={i18n.t("payments_view_add_credit_card").toUpperCase()}
            containerStyle={PaymentsStyles.button_profile_container_style}
            buttonStyle={PaymentsStyles.button_credit_card_style}
            titleStyle={PaymentsStyles.button_title_style}
            onPress={() => {
              this.props.navigation.navigate("CreditCard");
            }}
            icon={
              <Icon
                name="credit-card-alt"
                type="font-awesome"
                color={"white"}
              />
            }
          />
          <Button
            loading={this.state.update_data_loading}
            disabled={false}
            title={i18n.t("payments_view_add_paypal").toUpperCase()}
            containerStyle={PaymentsStyles.button_profile_container_style}
            buttonStyle={PaymentsStyles.button_paypal_style}
            titleStyle={PaymentsStyles.button_title_style}
            onPress={() => {
              Alert.alert(
                i18n.t("next_feature_word"),
                i18n.t("next_feature_message"),
                [{ text: "OK" }],
                { cancelable: false }
              );
            }}
            icon={<Icon name="paypal" type="font-awesome" color={"white"} />}
          />
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
    creditCard: state.mainReducer.creditCardJSON
  };
};

/**
 * @description
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    c_addCreditCard: creditCard => dispatch(addCreditCard(creditCard)),
    c_deleteCreditCard: () => dispatch(deleteCreditCard())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payments);
