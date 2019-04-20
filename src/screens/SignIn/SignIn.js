import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import { Icon } from "react-native-elements";
import { Button } from "native-base";

import SignInStyles from "./SignInStyles";

class SignIn extends Component {
  static navigationOptions = {
    title: "SignIn"
  };

  state = {
    appJson: ""
  };

  render() {
    return (
      <View style={SignInStyles.container}>
        <Text>SignIn Screen!</Text>
        <Text>{this.props.appJson}</Text>

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
    appJson: state.mainReducer.appJson
  };
};

export default connect(mapStateToProps)(SignIn);
