import { createStore, combineReducers } from 'redux';

const navigationDefaultState = {
    page: 'startPage',
};

function navigation(state = navigationDefaultState, action) {

    if (action.type === 'GO_TO_ADD_PAGE') {
        return {
            ...state,
            page: 'addPage'
        }
    }

    return state;
}

/**
 * Add reports part
 */
const addReportDefaultState = {
    header: '',
    description: '',
    propertyNumber: '',
    location: '',
    reporter: ''
}

function addReport(state = addReportDefaultState, action) {

    if (action.type === 'UPDATE_FORM') {
        return {
            ...state,
            [action.inputField]: action.data
        }
    }

    return state;
}

const rootReducer = combineReducers({
    navigation: navigation,
    addReport: addReport
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;