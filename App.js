/**
 * Yay React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import SignIn from './src/screens/SignIn/SignIn';
import SignUp from './src/screens/SignUp/SignUp';
import {AppDrawerNavigator} from './src/screens/DrawerNavigator/DrawerNavigator';

import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';

// Configuration with Redux implemented
import configureStore from './src/store/configureStore';

// Init the Store configuration
const store = configureStore();

const AuthStackNavigator = createStackNavigator(
  {
    SignIn: SignIn,
    SignUp: SignUp
  },
  {
    initialRouteName: "SignIn",
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "rgba(46, 50, 72, 1)",
      },
    },
  }
);

// Create our stack navigator
let RootStack = createSwitchNavigator({
  AuthStack: AuthStackNavigator,
  AppDrawer: AppDrawerNavigator
},
{
  initialRouteName: "AuthStack"
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