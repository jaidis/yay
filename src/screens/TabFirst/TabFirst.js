import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { addText } from "../../store/actions/index";
import { connect } from "react-redux";

import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";

const extension = Platform.select({
  ios: "ios-cloud-upload",
  android: "md-cloud-upload"
});

const extension2 = Platform.select({
  ios: "ios-cloud-download",
  android: "md-cloud-download"
});

class TabFirst extends Component {
  static navigationOptions = {
    title: "TabFirst"
  };

  state = {
    appJson: "",
    key: "",
    value: ""
  };

  keyChangedHandler = val => {
    this.setState({
      key: val
    });
  };

  valueChangedHandler = val => {
    this.setState({
      value: val
    });
  };

  f_addKey = () => {
    console.log(this.state.key);
    console.log(this.state.value);
    this.props.dispatch({
      type: "ADD_TEXT_JSON",
      keyToAdd: this.state.key,
      textToAdd: this.state.value
    });
    //this.props.addKeyValueJSON(this.state.key, this.state.value);
  };

  f_deleteKey = () => {
    console.log(this.state.key);
    console.log(this.state.value);
    this.props.dispatch({
      type: "DELETE_TEXT_JSON",
      keyToDelete: this.state.key
    });
    //this.props.addKeyValueJSON(this.state.key, this.state.value);
  };

  render() {
    return (
      <View>
      {NaviteBaseMenu.menuGoBack(this, "TabFirst")}
        <View style={styles.buttonStyle}>
          <TextInput
            placeholder="JSON Key"
            value={this.state.key}
            onChangeText={this.keyChangedHandler}
          />
          <TextInput
            placeholder="JSON Value"
            value={this.state.value}
            onChangeText={this.valueChangedHandler}
          />
          <Icon.Button name={extension} onPress={this.f_addKey}>
            Added values to JSON
          </Icon.Button>
          <Icon.Button
            name={extension2}
            onPress={this.f_deleteKey}
            backgroundColor="red"
          >
            Delete key to JSON
          </Icon.Button>

          <Icon.Button
            name="md-fastforward"
            onPress={() => this.props.navigation.navigate("TabSecond")}
            backgroundColor="green"
          >
            Go to TabSecond
          </Icon.Button>
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

const mapDispatchToProps = (dispatch, props) => {
  return {
    addKeyValueJSON: (key, value) => dispatch(addText(props.key, props.value))
  };
};

export default connect(mapStateToProps)(TabFirst);
