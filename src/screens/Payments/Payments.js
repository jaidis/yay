import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
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

import PaymentsStyles from "./PaymentsStyles";

const SCREEN_WIDTH = Dimensions.get("window").width;

class Payments extends Component {
  static navigationOptions = {
    title: "Payments"
  };

  state = {
    appJson: ""
  };

  /**
   * COMPONENT DID MOUNT
   * @description Acciones cuando se carga el componente
   */
  async componentDidMount() {
    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        console.log("inicio");
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

  creditCard = creditCard => {
    console.log(creditCard);
  };

  encryptedCard = creditCard => {
    let temp = creditCard.split(" ");
    return temp[0] + " xxxx xxxx " + temp[3];
  };

  render() {
    return (
      <View style={PaymentsStyles.container}>
        {NaviteBaseMenu.menuGoHome(this, "Payments")}
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View style={{ flex: 1, width: SCREEN_WIDTH * 0.8 }}>
            <Grid style={{ marginBottom: 20 }}>
              <Row>
                <Content>
                  <Card style={{ marginTop: 40 }}>
                    <CardItem header style={{ backgroundColor: "#6E78AA" }}>
                      <Text style={{ color: "white" }}>Payments</Text>
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
                            <Icon
                              name="credit-card"
                              type="font-awesome"
                              // color={}
                            />
                            <Text style={{ marginLeft: 10 }}>
                              {this.encryptedCard(tarjeta.number)}
                            </Text>
                          </CardItem>
                        )
                      )
                    ) : (
                      <CardItem>
                        <Icon
                          name="credit-card"
                          type="font-awesome"
                          // color={}
                        />
                        <Text style={{ marginLeft: 10 }}>
                          Not Credit Card Found
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
            title="Add Credit Card"
            containerStyle={PaymentsStyles.button_profile_container_style}
            buttonStyle={PaymentsStyles.button_profile_style}
            titleStyle={PaymentsStyles.button_title_style}
            onPress={() => {
              this.props.navigation.navigate("CreditCard");
            }}
            icon={
              <Icon name="credit-card-alt" type="font-awesome" color={"#FFF"} />
            }
          />
          <Button
            loading={this.state.update_data_loading}
            disabled={false}
            title="Add Paypal Account"
            containerStyle={PaymentsStyles.button_profile_container_style}
            buttonStyle={PaymentsStyles.button_profile_style}
            titleStyle={PaymentsStyles.button_title_style}
            onPress={() => {
              console.log("Todo");
            }}
            icon={<Icon name="paypal" type="font-awesome" color={"#FFF"} />}
          />
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
)(Payments);
