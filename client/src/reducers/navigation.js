import * as core from '../core';

const defaultState = {
    page: core.getStartPage(),
};

function navigation(state = defaultState, action) {

    if (action.type === 'GO_TO_ADD_PAGE') {
        return {
            ...state,
            page: 'addPage'
        }
    } else if (action.type === 'GO_TO_RECEIPT_PAGE') {
        return {
            ...state,
            page: 'receiptPage'
        }
    }

    return state;
}

export default navigation;