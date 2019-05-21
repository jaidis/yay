/**
 * Yay React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

// IMPORTAR LAS SCREENS DEL AUTHSTACKNAVIGATOR
import SignIn from './src/screens/SignIn/SignIn';
import SignUp from './src/screens/SignUp/SignUp';

// IMPORTAR LAS SCREEN DEL DRAWERNAVIGATOR
import Home from "./src/screens/Home/Home";
import DetailView from "./src/screens/DetailView/DetailView";
import Favorites from "./src/screens/Favorites/Favorites";
import TabFirst from "./src/screens/TabFirst/TabFirst";
import TabSecond from "./src/screens/TabSecond/TabSecond";
import DrawerNavigator from './src/screens/DrawerNavigator/DrawerNavigator'

import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
// import { createStore, combineReducers } from 'redux';
// import { Provider, connect } from 'react-redux';
import { Provider } from 'react-redux';

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

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: Home,
    DetailView: DetailView,
    Favorites: Favorites,
    TabFirst: TabFirst,
    TabSecond: TabSecond
  },
  {
    contentComponent: DrawerNavigator
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