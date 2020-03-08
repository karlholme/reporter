import * as core from '../core';

const defaultState = {
    [core.pages.add]: {
        header: '',
        description: '',
        propertyNumber: '',
        location: '',
        reporter: ''
    },
    [core.pages.admin]: {
        addReporter: '',
        addStatus: ''
    },
    [core.pages.details]: {}
}

function addReport(state = defaultState, action) {
    if (action.type === 'UPDATE_FORMS') {
        return {
            ...state,
            [action.data.page]: {
                ...state[action.data.page],
                [action.data.inputField]: action.data.data
            }
        }
    } else if (action.type === 'CLEAN_FORMS') {
        return defaultState;
    }

    return state;
}

export default addReport;