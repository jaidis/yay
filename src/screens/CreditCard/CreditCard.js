import React, { Component } from "react";
import { View, ScrollView, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import {
  addCreditCard,
  deleteCreditCard,
  addUser
} from "../../store/actions/index";

import { Icon, Button } from "react-native-elements";
import { CreditCardInput } from "react-native-credit-card-input";

// FUNCTIONS OR HELPERS
import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";
import * as AppConsts from "../../../config/app_consts";
import * as YAY_Api from "../../functions/YAY_Api_helper";

// LANGUAGES LIBRARY
import { setI18nConfig } from "../../../languages/i18n";
var i18n = setI18nConfig();

// STYLES
import CreditCardStyles from "./CreditCardStyles";

class CreditCard extends Component {
  static navigationOptions = {
    title: i18n.t("credit_card_title")
  };

  state = {
    id_credit_card: 0,
    update: false,
    valid: false,
    button_add_loading: false,
    button_update_loading: false
  };

  /**
   * COMPONENT DID MOUNT
   * @description Acciones cuando se carga el componente
   */
  async componentDidMount() {
    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        // console.log("inicio CreditCard");
        // Do Something
        if (this.props.creditCard != null) {
          // console.log("algo tiene");
          this.CCInput.setValues({
            number: this.props.creditCard.number,
            expiry: this.props.creditCard.expiry,
            cvc: this.props.creditCard.cvc,
            type: this.props.creditCard.type,
            name: this.props.creditCard.name
          });
          this.setState({
            update: true,
            id_credit_card: this.props.creditCard.id
          });
        } else {
          // console.log("nada");
        }
      }),
      this.props.navigation.addListener("willBlur", async () => {
        // console.log("me voy CreditCard");
        this.props.c_deleteCreditCard();
      })
    ];
  }

  /**
   * COMPONENT WILL UNMOUNT
   * @description Acciones cuando se desmonta el componente
   */
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
    // console.log("Desmontado CreditCard");
    //Do Something
  }

  /**
   * @description
   * @param {*} creditCard
   */
  creditCard = creditCard => {
    console.log(creditCard);
    if (creditCard.valid) {
      this.props.c_addCreditCard(creditCard.values);
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }
  };

  /**
   * @description
   * @param {*} creditCard
   */
  encryptedCard = creditCard => {
    let temp = creditCard.split(" ");
    return temp[0] + " xxxx xxxx " + temp[3];
  };

  /**
   * @description
   */
  addCreditCard = async () => {
    this.setState({ button_add_loading: true });
    this.state.valid
      ? NetInfo.isConnected
          .fetch()
          .then(async isConnected => {
            if (isConnected) {
              try {
                let addCreditCard = {
                  token: this.props.appJson.userdata.token,
                  number: this.props.creditCard.number,
                  expiry: this.props.creditCard.expiry,
                  cvc: this.props.creditCard.cvc,
                  type: this.props.creditCard.type,
                  name: this.props.creditCard.name
                };

                let response = await YAY_Api.fetchInternetDataAsync(
                  AppConsts.URL_CREDIT_CARD_REGISTER,
                  await YAY_Api.getRequestPostAsync(addCreditCard)
                );

                if (response.status === "success") {
                  this.props.c_addUser(response);
                  this.setState({ button_add_loading: false });
                } else {
                  console.log(response);
                  this.setState({ button_add_loading: false });
                }
              } catch (error) {
                console.log(error);
                this.setState({ button_add_loading: false });
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
          })
      : this.setState({ button_add_loading: false });
  };

  /**
   * @description
   */
  updateCreditCard = async () => {
    this.setState({ button_update_loading: true });
    console.log(this.state.id_credit_card);
    this.state.valid
      ? NetInfo.isConnected
          .fetch()
          .then(async isConnected => {
            if (isConnected) {
              try {
                let updateCreditCard = {
                  token: this.props.appJson.userdata.token,
                  number: this.props.creditCard.number,
                  expiry: this.props.creditCard.expiry,
                  cvc: this.props.creditCard.cvc,
                  type: this.props.creditCard.type,
                  name: this.props.creditCard.name,
                  id: this.state.id_credit_card
                };

                let response = await YAY_Api.fetchInternetDataAsync(
                  AppConsts.URL_CREDIT_CARD_UPDATE,
                  await YAY_Api.getRequestPostAsync(updateCreditCard)
                );

                if (response.status === "success") {
                  this.props.c_addUser(response);
                  this.setState({ button_update_loading: false });
                } else {
                  console.log(response);
                  this.setState({ button_update_loading: false });
                }
              } catch (error) {
                console.log(error);
                this.setState({ button_update_loading: false });
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
          })
      : this.setState({ button_add_loading: false });
  };

  /**
   * @description
   */
  render() {
    return (
      <View style={CreditCardStyles.container}>
        {NaviteBaseMenu.menuGoBack(this, i18n.t("credit_card_title"))}
        <ScrollView>
          <View style={CreditCardStyles.credit_card_view_container}>
            <CreditCardInput
              onChange={this.creditCard}
              labelStyle={CreditCardStyles.credit_card_input_label_style}
              inputStyle={CreditCardStyles.credit_card_input_input_style}
              inputContainerStyle={
                CreditCardStyles.credit_card_input_container_style
              }
              labels={{
                number: i18n.t("credit_card_input_number").toUpperCase(),
                expiry: i18n.t("credit_card_input_expiry").toUpperCase(),
                cvc: i18n.t("credit_card_input_cvc").toUpperCase(),
                name: i18n.t("credit_card_input_card_holder").toUpperCase()
              }}
              allowScroll={true}
              requiresName={true}
              ref={input => (this.CCInput = input)}
            />
          </View>
          <View style={CreditCardStyles.credit_card_view_button}>
            {this.state.update ? (
              <Button
                loading={this.state.button_update_loading}
                disabled={false}
                title={i18n.t("credit_card_button_update").toUpperCase()}
                containerStyle={
                  CreditCardStyles.button_credit_card_container_style
                }
                buttonStyle={CreditCardStyles.button_credit_card_style}
                titleStyle={CreditCardStyles.button_title_style}
                onPress={this.updateCreditCard}
                icon={
                  <Icon
                    name="credit-card-alt"
                    type="font-awesome"
                    color={"#FFF"}
                  />
                }
              />
            ) : (
              <Button
                loading={this.state.button_add_loading}
                disabled={false}
                title={i18n.t("credit_card_button_add").toUpperCase()}
                containerStyle={
                  CreditCardStyles.button_credit_card_container_style
                }
                buttonStyle={CreditCardStyles.button_credit_card_style}
                titleStyle={CreditCardStyles.button_title_style}
                onPress={this.addCreditCard}
                icon={
                  <Icon
                    name="credit-card-alt"
                    type="font-awesome"
                    color={"#FFF"}
                  />
                }
              />
            )}
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
    c_deleteCreditCard: () => dispatch(deleteCreditCard()),
    c_addUser: userJSON => dispatch(addUser(userJSON))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditCard);
