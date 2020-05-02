import * as core from '../core';

const defaultState = {
    category: {},
    reporter: {},
    status: {}
}

function filters(state = defaultState, action) {
    if (action.type === 'UPDATE_FILTER') {
        return {
            ...state,
            [action.data.filter]: {
                ...state[action.data.filter],
                [action.data.value]: action.data.show
            }
        }
    } else if (action.type === 'ADD_FILTERS') {
        return {
            ...state,
            [action.data.type]: action.data.values.reduce(function (acc, v) {
                _.assign(acc, { [v]: true });
                return acc;
            }, {})
        }
    }

    return state;
}

export default filters;