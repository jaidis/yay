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

  render() {
    return (
      <View style={MyBaseStyles.container}>
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
