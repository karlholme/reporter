import serviceEndpoints from '../../serviceEndpoints.json'
import axios from 'axios';
import store from '../stores/configureStore';

const defaultState = {
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
    },
    [serviceEndpoints.addReporter]: {
        isCalling: false,
        response: null
    }
};

function serviceCall(state = defaultState, action) {
    if (action.type === 'MAKE_GET_CALL_SERVICE') {
        axios.get(action.service, action.request)
            .then((response) => {
                if (action.sideEffectWhenOkResponse) {
                    action.sideEffectWhenOkResponse();
                }
                store.dispatch({
                    type: 'RECEIVE_SERVICE_RESPONSE',
                    service: action.service,
                    response: response.data
                })
            }).catch((error) => {
                if (action.sideEffectWhenFailedResponse) {
                    action.sideEffectWhenFailedResponse();
                }
                store.dispatch({
                    type: 'RECEIVE_ERROR',
                    service: action.service,
                    error: error.response,
                })
            });
        return {
            ...state,
            [action.service]: {
                ...state[action.service],
                isCalling: true
            }
        };
    } if (action.type === 'MAKE_PUT_SERVICE_CALL') {
        axios.put(action.service, action.request)
            .then((response) => {
                if (action.sideEffectWhenOkResponse) {
                    action.sideEffectWhenOkResponse();
                }
                store.dispatch({
                    type: 'RECEIVE_SERVICE_RESPONSE',
                    service: action.service,
                    response: response.data
                })
            }).catch((error) => {
                if (action.sideEffectWhenFailedResponse) {
                    action.sideEffectWhenFailedResponse();
                }
                store.dispatch({
                    type: 'RECEIVE_ERROR',
                    service: action.service,
                    error: error,
                })
            });
        return {
            ...state,
            [action.service]: {
                ...state[action.service],
                isCalling: true
            }
        };
    } if (action.type === 'MAKE_POST_SERVICE_CALL') {
        axios.post(action.service, action.request)
            .then((response) => {
                store.dispatch({
                    type: 'RECEIVE_SERVICE_RESPONSE',
                    service: action.service,
                    response: response.data
                })
                if (action.sideEffectWhenOkResponse) {
                    action.sideEffectWhenOkResponse();
                }
            }).catch((error) => {
                store.dispatch({
                    type: 'RECEIVE_ERROR',
                    service: action.service,
                    error: error,
                })
                if (action.sideEffectWhenFailedResponse) {
                    action.sideEffectWhenFailedResponse();
                }
            });
        return {
            ...state,
            [action.service]: {
                ...state[action.service],
                isCalling: true
            }
        };
    } else if (action.type === 'RECEIVE_SERVICE_RESPONSE') {
        console.group('SUCCESS -', action.service);
        console.info(action.response);
        console.groupEnd('SUCCESS', action.service);
        return {
            ...state,
            [action.service]: {
                isCalling: false,
                response: action.response
            }
        }
    } else if (action.type === 'RECEIVE_ERROR') {
        console.error(action.error);
        return {
            ...state,
            [action.service]: {
                isCalling: false,
                error: action.error
            }
        }
    }

    return state;
}

export default serviceCall;
