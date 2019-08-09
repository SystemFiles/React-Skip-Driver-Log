// recordReducer.js

import { ADD_RECORD, REM_RECORD } from '../actions/types';

const initialState = {
    records: new Array()
};

function recordReducer (state = initialState, action) {
    switch(action.type) {
        case ADD_RECORD:
            return {
                ...state,
                records: state.records.concat(action.payload)
            };
        case REM_RECORD:
            return {
                ...state,
                records: [
                    ...state.records.slice(0, action.payload),
                    ...state.records.slice(action.payload + 1)
                ]
            }
        default:
            return state;
    }
}

export {recordReducer};