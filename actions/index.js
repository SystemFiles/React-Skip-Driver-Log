
import {ADD_RECORD, OPEN_DATABASE, OPEN_MENU, REM_RECORD} from './types';

// Add Record Action
export const addRecord = record => {
    return {
        type: ADD_RECORD,
        payload: record
    }
}

// Remove Record Action
export const remRecord = index => {
    return {
        type: REM_RECORD,
        payload: index
    }
}

// Open a realm database
export const openDatabase = database => {
    return {
        type: OPEN_DATABASE,
        payload: database
    }
}

// Toggle menu display property for navigation menu
export const openMenu = () => {
    return {
        type: OPEN_MENU,
        payload: null
    }
}