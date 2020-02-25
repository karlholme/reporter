import * as core from '../core';

const defaultState = {
    page: core.getStartPage(),
    selectedFaultReport: null
};

function navigation(state = defaultState, action) {

    if (action.type === 'GO_TO_PAGE') {
        return {
            ...state,
            page: action.data.page
        }
    } else if (action.type === 'SET_CHOSEN_FAULT_REPORT') {
        return {
            ...state,
            selectedFaultReport: action.data.id
        }
    }

    return state;
}

export default navigation;