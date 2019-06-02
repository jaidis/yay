import AsyncStorage from "@react-native-community/async-storage";

import { createStore, combineReducers, compose } from "redux";
import reducer from "./reducers/actions";

import { persistStore, persistReducer } from "redux-persist";

// Recompile all custom reducers
const rootReducer = combineReducers({
  mainReducer: reducer
});

// Create configuration for Redux persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Using compose extension for debug the code with React Native Debugger tools
let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

//Init the reducer
const configureStore = () => {
    let store = createStore(persistedReducer, composeEnhancers())
    let persistor = persistStore(store)
    return { store, persistor }
}

export default configureStore;
