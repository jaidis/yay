import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import {
  addCreditCard,
  deleteCreditCard,
  addUser
} from "../../store/actions/index";

import { Icon, Button } from "react-native-elements";
import { CreditCardInput } from "react-native-credit-card-input";

import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";
import * as AppConsts from "../../../config/app_consts";
import * as YAY_Api from "../../functions/YAY_Api_helper";

import CreditCardStyles from "./CreditCardStyles";

class CreditCard extends Component {
  static navigationOptions = {
    title: "CreditCard"
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
        console.log("inicio CreditCard");
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
        console.log("me voy CreditCard");
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
    console.log("Desmontado CreditCard");
    //Do Something
  }

  creditCard = creditCard => {
    console.log(creditCard);
    if (creditCard.valid) {
      this.props.c_addCreditCard(creditCard.values);
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }
  };

  encryptedCard = creditCard => {
    let temp = creditCard.split(" ");
    return temp[0] + " xxxx xxxx " + temp[3];
  };

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
            }
          })
          .catch(error => {
            console.log(error);
          })
      : this.setState({ button_add_loading: false });
  };

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
            }
          })
          .catch(error => {
            console.log(error);
          })
      : this.setState({ button_add_loading: false });
  };

  render() {
    return (
      <View style={CreditCardStyles.container}>
        {NaviteBaseMenu.menuGoBack(this, "CreditCard")}
        <ScrollView>
          <View style={{ flex: 1, marginTop: 50 }}>
            <CreditCardInput
              onChange={this.creditCard}
              labelStyle={{ color: "#FFF" }}
              inputStyle={{ color: "white" }}
              inputContainerStyle={{
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "rgba(110, 120, 170, 1)",
                paddingTop: 5,
                paddingLeft: 10,
                marginLeft: 10,
                marginRight: 5
              }}
              labels={{
                number: "NÚMERO DE TARJETA",
                expiry: "EXPIRA",
                cvc: "CCV",
                name: "PROPIETARIO/A"
              }}
              allowScroll={true}
              requiresName={true}
              ref={input => (this.CCInput = input)}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            {this.state.update ? (
              <Button
                loading={this.state.button_update_loading}
                disabled={false}
                title="Update credit card"
                containerStyle={CreditCardStyles.button_profile_container_style}
                buttonStyle={CreditCardStyles.button_profile_style}
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
                title="Add credit card"
                containerStyle={CreditCardStyles.button_profile_container_style}
                buttonStyle={CreditCardStyles.button_profile_style}
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

const mapStateToProps = state => {
  return {
    appJson: state.mainReducer.appJson,
    loading_bar: state.mainReducer.loading,
    creditCard: state.mainReducer.creditCardJSON
  };
};

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
