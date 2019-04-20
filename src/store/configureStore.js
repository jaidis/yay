import {createStore, combineReducers, compose} from 'redux';
import reducer from './reducers/actions';

// Recompile all custom reducers
const rootReducer = combineReducers({
    mainReducer: reducer
});

// Using compose extension for debug the code with React Native Debugger tools
let composeEnhancers = compose;

if (__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

//Init the reducer
const configureStore = () => {
    return createStore(rootReducer, composeEnhancers());
}

export default configureStore;