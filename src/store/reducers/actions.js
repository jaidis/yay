import { ADD_TEXT_JSON, DELETE_TEXT_JSON, AUTH_CHECK, AUTH_OK, AUTH_DENEGATE, LOADING_TRUE, LOADING_FALSE } from "../actions/actionTypes";

const add_text_to_json = (json, key, value) => {
  /**
   *  Add new key value to JSON Object
   */
  let tempJson = JSON.parse(json);
  if (tempJson !== null) {
    tempJson[key] = value;
  } else {
    tempJson = {};
    tempJson[key] = value;
  }
  console.log(JSON.stringify(tempJson));
  return JSON.stringify(tempJson);
};

const delete_text_to_json = (json, key) => {
  /**
   *  Delete key-value at JSON Object
   */
  let tempJson = JSON.parse(json);
  if (tempJson !== null) {
    delete tempJson[key];
  }
  return JSON.stringify(tempJson);
}

const initialState = {
  loading:false,
  appJson: null,
  auth: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TEXT_JSON:
      return {
        ...state,
        appJson: add_text_to_json(state.appJson, action.keyToAdd, action.textToAdd)
      };
    case DELETE_TEXT_JSON:
      return {
        ...state,
        appJson: delete_text_to_json(state.appJson, action.keyToDelete)
      };
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
    case LOADING_TRUE:{
      return {
        ...state,
        loading:true
      }
    }
    case LOADING_FALSE:{
      return {
        ...state,
        loading:false
      }
    }
    default:
      return state;
  }
};

export default reducer;
