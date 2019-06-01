import {ADD_TEXT_JSON, DELETE_TEXT_JSON, AUTH_CHECK, AUTH_OK, AUTH_DENEGATE, LOADING_TRUE, LOADING_FALSE, FAVORITE_TRUE, FAVORITE_FALSE, ADD_RESTAURANT, DELETE_RESTAURANT, ADD_CREDIT_CARD, DELETE_CREDIT_CARD} from './actionTypes';

export const addText = (new_key, add_Text) => {
  return {
    type: ADD_TEXT_JSON,
    keyToAdd: new_key,
    textToAdd: add_Text
  };
};

export const deleteText = delete_key => {
  return {
    type: DELETE_TEXT_JSON,
    keyToDelete: delete_key
  };
};

export const authCheck = () => {
  return {
    type: AUTH_CHECK
  };
};

export const authValidated = () => {
  return {
    type: AUTH_OK
  };
};

export const authDenegated = () => {
  return {
    type: AUTH_DENEGATE
  };
};

export const loadingTrue = () => {
  return {
    type: LOADING_TRUE
  };
};

export const loadingFalse = () => {
  return {
    type: LOADING_FALSE
  };
};

export const favoriteTrue = () => {
  return {
    type: FAVORITE_TRUE
  };
};

export const favoriteFalse = () => {
  return {
    type: FAVORITE_FALSE
  };
};

export const addRestaurant = restaurant => {
  return {
    type: ADD_RESTAURANT,
    restaurantJSON: restaurant
  };
};

export const deleteRestaurant = () => {
  return {
    type: DELETE_RESTAURANT
  };
};

export const addCreditCard = creditCard => {
  return {
    type: ADD_CREDIT_CARD,
    creditCardJSON: creditCard
  };
};

export const deleteCreditCard = () => {
  return {
    type: DELETE_CREDIT_CARD
  };
};