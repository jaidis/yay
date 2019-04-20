/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @todo Aplicación básica que contendrá un redux con varios json(stringify),
 * varios flags de control (boolean) y navegación por pestañas
 * Utilizar el elemento switch para controlar que se cargará y en que orden
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import TabFirst from './src/screens/TabFirst/TabFirst';
import TabSecond from './src/screens/TabSecond/TabSecond';

import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
// Configuration with Redux implemented
import configureStore from './src/store/configureStore';

// Init the Store configuration
const store = configureStore();

// Create our stack navigator
let RootStack = createStackNavigator({
  TabFirst: TabFirst,
  TabSecond: TabSecond
});

// And the app container
let Navigation = createAppContainer(RootStack);

type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Icon.Button name="facebook" backgroundColor="#3b5998">
//           Login with Facebook
//         </Icon.Button>
//       </View>
//     );
//   }
// }

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
