import * as core from '../core';
import _ from 'lodash';

const defaultState = {
    category: {
        all: true
    },
    reporter: {
        all: true
    },
    status: {
        all: true
    }
}

function filters(state = defaultState, action) {
    if (action.type === 'UPDATE_FILTER') {
        if (action.data.value === 'all') {
            return {
                ...state,
                [action.data.filter]: _.keys(state[action.data.filter]).reduce(function (acc, v) {
                    _.assign(acc, { [v]: true });
                    return acc;
                }, {})
            }
        }
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