// menuReducer.js

import { OPEN_MENU } from '../actions/types';

const initialState = {
    menuOpen: false
};

function menuReducer (state = initialState, action) {
    switch(action.type) {
        case OPEN_MENU:
            return {
                ...state,
                menuOpen: true
            };
        default:
            return state;
    }
}

export {menuReducer};