import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons";
import { addText } from "../../store/actions/index";
import { connect } from "react-redux";

import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";

class Home extends Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    appJson: "",
    search: "",
    searchLoading: false
  };

  updateSearch = buscar => {
    if (buscar != "")
      this.setState({ search: buscar, searchLoading: true });
    else
      this.setState({ searchLoading: false });
  };

  render() {
    return (
      <View>
        {NaviteBaseMenu.menuLogo(this)}
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={this.state.search}
          showLoading={this.state.searchLoading}
        />
        <Text>Home</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

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

export default connect(mapStateToProps)(Home);
