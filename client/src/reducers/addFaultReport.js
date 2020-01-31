const defaultState = {
    header: '',
    description: '',
    propertyNumber: '',
    location: '',
    reporter: ''
}

function addReport(state = defaultState, action) {
    if (action.type === 'UPDATE_ADD_FAULT_REPORT_FORM') {
        return {
            ...state,
            [action.inputField]: action.data
        }
    } else if (action.type === 'CLEAN_ADD_FAULT_REPORT_FORM') {
        return defaultState;
    }

    return state;
}

export default addReport;