import {
  ADD_TEXT_JSON,
  DELETE_TEXT_JSON,
  AUTH_CHECK,
  AUTH_OK,
  AUTH_DENEGATE,
  LOADING_TRUE,
  LOADING_FALSE,
  FAVORITE_TRUE,
  FAVORITE_FALSE,
  ADD_USER,
  DELETE_USER,
  ADD_RESTAURANT,
  DELETE_RESTAURANT,
  ADD_CREDIT_CARD,
  DELETE_CREDIT_CARD,
  ADD_CATEGORIES_LIST,
  DELETE_CATEGORIES_LIST,
  ADD_BOOKINGS,
  DELETE_BOOKINGS,
  ADD_RESERVA,
  DELETE_RESERVA
} from "../actions/actionTypes";
import user from "../../../user.json";

// const add_text_to_json = (json, key, value) => {
//   /**
//    *  Add new key value to JSON Object
//    */
//   let tempJson = JSON.parse(json);
//   if (tempJson !== null) {
//     tempJson[key] = value;
//   } else {
//     tempJson = {};
//     tempJson[key] = value;
//   }
//   console.log(JSON.stringify(tempJson));
//   return JSON.stringify(tempJson);
// };

// const delete_text_to_json = (json, key) => {
//   /**
//    *  Delete key-value at JSON Object
//    */
//   let tempJson = JSON.parse(json);
//   if (tempJson !== null) {
//     delete tempJson[key];
//   }
//   return JSON.stringify(tempJson);
// };

// const initialState = {
//   appJson: null,
// };

const initialState = {
  loading: false,
  appJson: null,
  reservaJSON: null,
  restaurantJson: null,
  creditCardJSON: null,
  categoriesListJSON: null,
  bookingsJSON: null,
  auth: false,
  favorite: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_TEXT_JSON:
    //   return {
    //     ...state,
    //     appJson: add_text_to_json(
    //       state.appJson,
    //       action.keyToAdd,
    //       action.textToAdd
    //     )
    //   };
    // case DELETE_TEXT_JSON:
    //   return {
    //     ...state,
    //     appJson: delete_text_to_json(state.appJson, action.keyToDelete)
    //   };
    case AUTH_CHECK:
      return {
        ...state,
        auth: state.auth
      };
    case AUTH_OK:
      return {
        ...state,
        auth: true
      };
    case AUTH_DENEGATE:
      return {
        ...state,
        auth: false
      };
    case LOADING_TRUE: {
      return {
        ...state,
        loading: true
      };
    }
    case LOADING_FALSE: {
      return {
        ...state,
        loading: false
      };
    }
    case FAVORITE_TRUE: {
      return {
        ...state,
        favorite: true
      };
    }
    case FAVORITE_FALSE: {
      return {
        ...state,
        favorite: false
      };
    }
    case ADD_USER: {
      return {
        ...state,
        appJson: action.userJSON
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        appJson: null
      };
    }
    case ADD_RESTAURANT: {
      return {
        ...state,
        restaurantJson: action.restaurantJSON
      };
    }
    case DELETE_RESTAURANT: {
      return {
        ...state,
        restaurantJson: null
      };
    }
    case ADD_CREDIT_CARD: {
      return {
        ...state,
        creditCardJSON: action.creditCardJSON
      };
    }
    case DELETE_CREDIT_CARD: {
      return {
        ...state,
        creditCardJSON: null
      };
    }
    case ADD_CATEGORIES_LIST: {
      return {
        ...state,
        categoriesListJSON: action.categoriesListJSON
      };
    }
    case DELETE_CATEGORIES_LIST: {
      return {
        ...state,
        categoriesListJSON: null
      };
    }
    case ADD_BOOKINGS: {
      return {
        ...state,
        bookingsJSON: action.bookingsJSON
      };
    }
    case DELETE_BOOKINGS: {
      return {
        ...state,
        bookingsJSON: null
      };
    }
    case ADD_RESERVA: {
      return {
        ...state,
        reservaJSON: action.reservaJSON
      };
    }
    case DELETE_RESERVA: {
      return {
        ...state,
        reservaJSON: null
      };
    }
    default:
      return state;
  }
};

export default reducer;
