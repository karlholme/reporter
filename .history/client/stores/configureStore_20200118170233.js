import { createStore, combineReducers } from 'redux';
import axios from 'axios';
import * as serviceEndpoints from '../serviceEndpoints.json';

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


const serviceCallsState = {
    [serviceEndpoints.addFaultReport]: {
        isCalling: false,
        response: null
    },
    [serviceEndpoints.getReporters]: {
        isCalling: false,
        response: null
    },
    [serviceEndpoints.getFaultReports]: {
        isCalling: false,
        response: null
    },
    [serviceEndpoints.addFaultReport]: {
        isCalling: false,
        response: null
    }
};

function serviceCalls(state = serviceCallsState, action) {
    if (action.type === 'CALL_SERVICE') {
        console.info('Service called', action.service, 'with request', action.request);
        axios.get(action.service, action.request)
            .then((response) => {
                console.log('OK', response)
                store.dispatch({
                    type: 'RECEIVE_SERVICE_RESPONSE',
                    service: action.service,
                    response: response.data
                })
            }).catch((response) => {
                store.dispatch({
                    type: 'RECEIVE_SERVICE_RESPONSE',
                    service: action.service,
                    response: response.response
                })
            });
        return {
            ...state,
            [action.service]: {
                ...state[action.service],
                isCalling: true
            }
        };
    } else if (action.type === 'RECEIVE_SERVICE_RESPONSE') {
        // console.log(action.response);
        return {
            ...state,
            [action.service]: {
                isCalling: false,
                response: action.response
            }
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
    if (action.type === 'UPDATE_ADD_FAULT_REPORT_FORM') {
        return {
            ...state,
            [action.inputField]: action.data
        }
    } else if (action.type === 'CLEAN_ADD_FAULT_REPORT_FORM') {
        return addReportDefaultState;
    }

    return addReportDefaultState;
}

const rootReducer = combineReducers({
    navigation,
    serviceCalls,
    addReport
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
