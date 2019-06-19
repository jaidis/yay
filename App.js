/**
 * Yay React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
 */

import React, { Component } from "react";

import AuthCheck from "./src/screens/AuthCheck/AuthCheck";

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
import Bookings from "./src/screens/Bookings/Bookings";
import Reserve from "./src/screens/Reserve/Reserve";
import ReserveConfirmed from "./src/screens/ReserveConfirmed/ReserveConfirmed";
import MyBase from "./src/screens/MyBase/MyBase";
import DrawerNavigator from "./src/screens/DrawerNavigator/DrawerNavigator";

import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";

// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Configuration with Redux implemented
import configureStore from "./src/store/configureStore";

// Cargar libreria i18n
import * as RNLocalize from "react-native-localize";
import { setI18nConfig } from "./languages/i18n";
var i18n = setI18nConfig();

// Init the Redux Store configuration
let storeConfiguration = configureStore();
const store = storeConfiguration.store;
const persistor = storeConfiguration.persistor;

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

const DetailViewStackNavigator = createStackNavigator(
  {
    DetailView: DetailView,
    Reserve: Reserve
  },
  {
    headerMode: "none",
    initialRouteName: "DetailView",
    defaultNavigationOptions: {
      headerVisible: false
    }
  }
);

const FavoritesStackNavigator = createStackNavigator(
  {
    DetailViewNavigator: DetailViewStackNavigator,
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
    DetailViewNavigator: DetailViewStackNavigator
  },
  {
    headerMode: "none",
    initialRouteName: "Categories",
    defaultNavigationOptions: {
      headerVisible: false
    }
  }
);

const BookingsStackNavigator = createStackNavigator(
  {
    Bookings: Bookings,
    Reserve: Reserve
  },
  {
    headerMode: "none",
    initialRouteName: "Bookings",
    defaultNavigationOptions: {
      headerVisible: false
    }
  }
);

const ReserveStackNavigator = createStackNavigator(
  {
    ReserveConfirmed: ReserveConfirmed
  },
  {
    headerMode: "none",
    initialRouteName: "ReserveConfirmed",
    defaultNavigationOptions: {
      headerVisible: false
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: Home,
    DetailViewNavigator: DetailViewStackNavigator,
    Profile: Profile,
    PaymentsNavigator: PaymentsStackNavigator,
    BookingsNavigator: BookingsStackNavigator,
    FavoritesNavigator: FavoritesStackNavigator,
    CategoriesNavigator: CategoriesStackNavigator,
    ReserveNavigator: ReserveStackNavigator
  },
  {
    contentComponent: DrawerNavigator
  }
);

// Create our stack navigator
let RootStack = createSwitchNavigator(
  {
    AuthStack: AuthStackNavigator,
    AppDrawer: AppDrawerNavigator,
    AuthCheck: AuthCheck
  },
  {
    initialRouteName: "AuthCheck"
  }
);

// And the app container
let Navigation = createAppContainer(RootStack);

type Props = {};

class App extends Component<Props> {
  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    i18n = setI18nConfig();
    this.forceUpdate();
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
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
