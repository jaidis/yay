import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, TextInput } from "react-native";
import { connect } from "react-redux";
import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";

class TabSecond extends Component {
  static navigationOptions = {
    title: "TabSecond"
  };

  state = {
    appJson: ""
  };

  render() {
    return (
      <View>
        {NaviteBaseMenu.menuGoBack(this, "TabSecond")}
        <View style={styles.buttonStyle}>
          <Text style={styles.textJson}>{this.props.appJson}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: "center",
    padding: 5
  },
  textJson: {
    margin: 20
  }
});

const mapStateToProps = state => {
  return {
    appJson: state.mainReducer.appJson
  };
};

export default connect(mapStateToProps)(TabSecond);
