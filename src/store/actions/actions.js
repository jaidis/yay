import {ADD_TEXT_JSON, DELETE_TEXT_JSON, AUTH_CHECK, AUTH_OK, AUTH_DENEGATE} from './actionTypes'

export const addText = (new_key, add_Text) => {
    return {
        type: ADD_TEXT_JSON,
        keyToAdd: new_key,
        textToAdd: add_Text
    }
}

export const deleteText = (delete_key) => {
    return {
        type: DELETE_TEXT_JSON,
        keyToDelete: delete_key
    }
}

export const authCheck = () => {
    return {
        type: AUTH_CHECK
    }
}

export const authValidated = () => {
    return {
        type: AUTH_OK
    }
}

export const authDenegated = () => {
    return {
        type: AUTH_DENEGATE
    }
}