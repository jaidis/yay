import React from "react";

/**
 * @description Funcion para validar un E-mail, devuelve True o False
 * @param {*} email
 * @returns boolean
 * */
export function validateEmail(email) {
  // FORMATO DE EMAIL
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // COMPROBACIÓN DEVUELVE TRUE O FALSE
  if (email.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

/**
 * @description Función para validar una contraseña de débil de al menos 7 caracteres
 * @param {*} password
 * @returns boolean
 */
export function validatePasswordWeak(password) {
  var passwordformat = /^.{7,}$/;
  if (password.match(passwordformat)) {
    return true;
  } else {
    return false;
  }
}

/**
 * @description  Función para validar una contraseña de fuerte de al menos 8 caracteres (mayúscula, minúscula, números y signos de puntuación). Devuelve True o False
 * @param {*} password
 * @returns boolean
 */
export function validatePasswordStrong(password) {
  var passwordformat = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
  if (password.match(passwordformat)) {
    return true;
  } else {
    return false;
  }
}

/**
 * MÉTODO DE VALIDACIÓN DEL NÚMERO DE TELÉFONO (MÍNIMO 10 DÍGITOS, MÁXIMO 11 DÍGITOS) INTRODUCIDO PARA EL REGISTRO
 * @param {*} phoneNumber
 * @returns boolean
 */
export function validatePhoneNumber(phoneNumber) {
  var phoneNumberFormat = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10,11}$)/;
  if (phoneNumber.match(phoneNumberFormat)) {
    return true;
  } else {
    return false;
  }
}
