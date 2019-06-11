import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import { Icon } from "react-native-elements";
import { Button } from "native-base";
import { loadingTrue, loadingFalse } from "../../store/actions/index";

import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";

import MyBaseStyles from "./MyBaseStyles";

class MyBase extends Component {
  static navigationOptions = {
    title: "MyBase"
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
      <View style={MyBaseStyles.container}>
        {NaviteBaseMenu.menuGoBack(this, "MyBase")}
        <Text>MyBase Screen!</Text>
        {/* <Text>{this.props.appJson}</Text> */}

        <Icon
          raised
          name="heartbeat"
          type="font-awesome"
          color="#f50"
          onPress={() => console.log("hello")}
        />

        <Button success>
          <Text> Success </Text>
        </Button>
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
)(MyBase);
