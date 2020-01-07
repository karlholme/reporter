import { createStore, combineReducers } from 'redux';
import axios from 'axios';

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
    reporter: '',
    reporters: [
        'Solgården',
        'Solvik',
        'Starrbäcken'
    ]
}

function addReport(state = addReportDefaultState, action) {
    if (action.type === 'UPDATE_ADD_FAULT_REPORT_FORM') {
        return {
            ...state,
            [action.inputField]: action.data
        }
    } else if (action.type === 'CLEAN_ADD_FAULT_REPORT_FORM') {
        return addReportDefaultState;
    } else if (action.type === 'SEND_ADD_FORM') {
        axios.post('http://localhost:8081/api/addFaultReport', {
            header: state.header,
            description: state.description,
            propertyNumber: state.propertyNumber,
            location: state.location,
            reporter: state.reporter
        }).then((response) => {
            console.log('OK', response.data);
        }).catch((response) => {
            console.log('ERROR', response.status, response.response);
            console.log('With request', response.config.data);
        });
        return { ...state };
    }

    return addReportDefaultState;
}

const rootReducer = combineReducers({
    navigation: navigation,
    addReport: addReport
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
