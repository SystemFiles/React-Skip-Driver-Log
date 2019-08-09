// databaseReducer.js

import { OPEN_DATABASE } from '../actions/types';

const initialState = {
    database: null
};

function databaseReducer (state = initialState, action) {
    switch(action.type) {
        case OPEN_DATABASE:
            return {
                ...state,
                records: action.payload
            };
        default:
            return state;
    }
}

export {databaseReducer};