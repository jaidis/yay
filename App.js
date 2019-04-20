/**
 * Yay React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import TabFirst from './src/screens/TabFirst/TabFirst';
import TabSecond from './src/screens/TabSecond/TabSecond';
import SignIn from './src/screens/SignIn/SignIn';

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
  TabSecond: TabSecond,
  SignIn: SignIn
});

// And the app container
let Navigation = createAppContainer(RootStack);

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;