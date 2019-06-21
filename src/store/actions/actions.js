import {
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
} from "./actionTypes";

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

export const addUser = user => {
  return {
    type: ADD_USER,
    userJSON: user
  };
};

export const deleteUser = () => {
  return {
    type: DELETE_USER
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

export const addCategoriesList = categoriesList => {
  return {
    type: ADD_CATEGORIES_LIST,
    categoriesListJSON: categoriesList
  };
};

export const deleteCategoriesList = () => {
  return {
    type: DELETE_CATEGORIES_LIST
  };
};

export const addBookings = bookings => {
  return {
    type: ADD_BOOKINGS,
    bookingsJSON: bookings
  };
};

export const deleteBookings = () => {
  return {
    type: DELETE_BOOKINGS
  };
};

export const addReserva = reserva => {
  return {
    type: ADD_RESERVA,
    reservaJSON: reserva
  };
};

export const deleteReserva = () => {
  return {
    type: DELETE_RESERVA
  };
};
