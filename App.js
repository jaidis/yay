/**
 * Yay React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

// IMPORTAR LAS SCREENS DEL AUTHSTACKNAVIGATOR
import SignIn from "./src/screens/SignIn/SignIn";
import SignUp from "./src/screens/SignUp/SignUp";

// IMPORTAR LAS SCREEN DEL DRAWERNAVIGATOR
import Home from "./src/screens/Home/Home";
import Profile from "./src/screens/Profile/Profile";
import Payments from "./src/screens/Payments/Payments";
import CreditCard from "./src/screens/CreditCard/CreditCard";
import Favorites from "./src/screens/Favorites/Favorites";
import DetailView from "./src/screens/DetailView/DetailView";
import Categories from "./src/screens/Categories/Categories";
import CategoriesList from "./src/screens/CategoriesList/CategoriesList";
import MyBase from "./src/screens/MyBase/MyBase";
import DrawerNavigator from "./src/screens/DrawerNavigator/DrawerNavigator";

import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
// import { createStore, combineReducers } from 'redux';
// import { Provider, connect } from 'react-redux';
import { Provider } from "react-redux";

// Configuration with Redux implemented
import configureStore from "./src/store/configureStore";

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
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "rgba(46, 50, 72, 1)"
      }
    }
  }
);

const FavoritesStackNavigator = createStackNavigator(
  {
    DetailView: DetailView,
    Favorites: Favorites
  },
  {
    headerMode: "none",
    initialRouteName: "Favorites",
    defaultNavigationOptions: {
      headerVisible: false
    }
  }
);

const PaymentsStackNavigator = createStackNavigator(
  {
    Payments: Payments,
    CreditCard: CreditCard
  },
  {
    headerMode: "none",
    initialRouteName: "Payments",
    defaultNavigationOptions: {
      headerVisible: false
    }
  }
);

const CategoriesStackNavigator = createStackNavigator(
  {
    Categories: Categories,
    CategoriesList: CategoriesList,
    DetailView: DetailView
  },
  {
    headerMode: "none",
    initialRouteName: "Categories",
    defaultNavigationOptions: {
      headerVisible: false
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: Home,
    DetailView: DetailView,
    Profile: Profile,
    PaymentsNavigator: PaymentsStackNavigator,
    Reservations: MyBase,
    FavoritesNavigator: FavoritesStackNavigator,
    CategoriesNavigator: CategoriesStackNavigator
  },
  {
    contentComponent: DrawerNavigator
  }
);

// Create our stack navigator
let RootStack = createSwitchNavigator(
  {
    AuthStack: AuthStackNavigator,
    AppDrawer: AppDrawerNavigator
  },
  {
    initialRouteName: "AuthStack"
  }
);

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

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Encountered an error loading page", // WebView uri: result.url and url failing to load - "bloomberg suneq" https://github.com/facebook/react-native/issues/7839#issuecomment-224111608
  "Deprecation warning: moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  "Task orphaned for request ",
  "Remote debugger is in a background tab which may cause apps to perform slowly",
  "ViewPagerAndroid"
]);
