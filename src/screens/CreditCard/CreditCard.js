import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";

import { Icon, Button } from "react-native-elements";
import { Content, Card, CardItem } from "native-base";
import {
  loadingTrue,
  loadingFalse,
  addCreditCard,
  deleteCreditCard
} from "../../store/actions/index";

import { CreditCardInput } from "react-native-credit-card-input";
import { Grid, Row, Col } from "react-native-easy-grid";

import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";

import CreditCardStyles from "./CreditCardStyles";

class CreditCard extends Component {
  static navigationOptions = {
    title: "CreditCard"
  };

  state = {
    appJson: "",
    update: false
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
          console.log("algo tiene");
          this.CCInput.setValues({
            number: this.props.creditCard.number,
            expiry: this.props.creditCard.expiry,
            cvc: this.props.creditCard.cvc,
            type: this.props.creditCard.type,
            name: this.props.creditCard.name
          });
          this.setState({ update: true });
        } else {
          console.log("nada");
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
    creditCard.valid ? this.props.c_addCreditCard(creditCard.values) : null;
  };

  encryptedCard = creditCard => {
    let temp = creditCard.split(" ");
    return temp[0] + " xxxx xxxx " + temp[3];
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
          <View style={{alignItems:"center"}}>
            {this.state.update ? (
              <Button
                loading={this.state.update_data_loading}
                disabled={false}
                title="Update credit card"
                containerStyle={CreditCardStyles.button_profile_container_style}
                buttonStyle={CreditCardStyles.button_profile_style}
                titleStyle={CreditCardStyles.button_title_style}
                onPress={() => {
                  console.log("Actualizar");
                }}
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
                loading={this.state.update_data_loading}
                disabled={false}
                title="Add credit card"
                containerStyle={CreditCardStyles.button_profile_container_style}
                buttonStyle={CreditCardStyles.button_profile_style}
                titleStyle={CreditCardStyles.button_title_style}
                onPress={() => {
                  console.log("Añadir");
                }}
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
    c_loadingTrue: () => dispatch(loadingTrue()),
    c_loadingFalse: () => dispatch(loadingFalse())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditCard);
