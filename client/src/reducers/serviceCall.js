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
    }
};

function serviceCall(state = defaultState, action) {
    if (action.type === 'MAKE_GET_CALL_SERVICE') {
        console.log('Service', action.service, 'called with request', action.request);
        axios.get(action.service, action.request)
            .then((response) => {
                console.log('OK', action.service, response.data)
                if (action.sideEffectWhenOkResponse) {
                    action.sideEffectWhenOkResponse();
                }
                store.dispatch({
                    type: 'RECEIVE_SERVICE_RESPONSE',
                    service: action.service,
                    response: response.data
                })
            }).catch((response) => {
                console.log('ERROR', action.service, response.data)
                if (action.sideEffectWhenFailedResponse) {
                    action.sideEffectWhenFailedResponse();
                }
                store.dispatch({
                    type: 'RECEIVE_ERROR',
                    service: action.service,
                    error: response.response.data,
                })
            });
        return {
            ...state,
            [action.service]: {
                ...state[action.service],
                isCalling: true
            }
        };
    } if (action.type === 'MAKE_PUT_CALL_SERVICE') {
        console.log('Delete -', action.service, ', request:', action.request);

        axios.put(action.service, action.request)
            .then((response) => {
                console.log('OK', action.service, response.data)
                console.log(action.sideEffectWhenOkResponse);
                if (action.sideEffectWhenOkResponse) {
                    action.sideEffectWhenOkResponse();
                }
                store.dispatch({
                    type: 'RECEIVE_SERVICE_RESPONSE',
                    service: action.service,
                    response: response.data
                })
            }).catch((response) => {
                console.log('ERROR', action.service, response.response.data)
                if (action.sideEffectWhenFailedResponse) {
                    action.sideEffectWhenFailedResponse();
                }
                store.dispatch({
                    type: 'RECEIVE_ERROR',
                    service: action.service,
                    error: response.response.data,
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
        console.log('Service', action.service, 'called with request', action.request);
        axios.post(action.service, action.request)
            .then((response) => {
                console.log('OK', action.service, response.data)
                store.dispatch({
                    type: 'RECEIVE_SERVICE_RESPONSE',
                    service: action.service,
                    response: response.data
                })
                if (action.sideEffectWhenOkResponse) {
                    action.sideEffectWhenOkResponse();
                }
            }).catch((response) => {
                console.log('ERROR', action.service, response.data)
                store.dispatch({
                    type: 'RECEIVE_ERROR',
                    service: action.service,
                    error: response.response.data,
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
        console.log('Response: ', action.service, action.response);
        return {
            ...state,
            [action.service]: {
                isCalling: false,
                response: action.response
            }
        }
    } else if (action.type === 'RECEIVE_ERROR') {
        console.log('Response: ', action.service, action.error);
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
