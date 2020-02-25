import * as core from '../core';

const defaultState = {
    addPage: {
        header: '',
        description: '',
        propertyNumber: '',
        location: '',
        reporter: ''
    },
    adminPage: {
        addReporter: ''
    },
    [core.pages.details]: {}
}

function addReport(state = defaultState, action) {
    if (action.type === 'UPDATE_ADD_FAULT_REPORT_FORM') {
        return {
            ...state,
            [action.data.page]: {
                ...state[action.data.page],
                [action.data.inputField]: action.data.data
            }
        }
    } else if (action.type === 'CLEAN_ADD_FAULT_REPORT_FORM') {
        return defaultState;
    }

    return state;
}

export default addReport;