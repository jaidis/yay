/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';

import TabFirst from './src/screens/TabFirst/TabFirst'

// Configuration with Redux implemented
import configureStore from './src/store/configureStore';

// Init the Store configuration
const store = configureStore();

AppRegistry.registerComponent(appName, () => App);
