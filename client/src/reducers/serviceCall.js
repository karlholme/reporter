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
    [serviceEndpoints.updateFaultReport]: {
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
        axios.get(action.data.service, action.data.request)
            .then((response) => {
                if (action.data.sideEffectWhenOkResponse) {
                    action.data.sideEffectWhenOkResponse();
                }
                store.dispatch({
                    type: 'RECEIVE_SERVICE_RESPONSE',
                    data: {
                        service: action.data.service,
                        response: response.data
                    }
                })
            }).catch((error) => {
                if (action.data.sideEffectWhenFailedResponse) {
                    action.data.sideEffectWhenFailedResponse();
                }
                store.dispatch({
                    type: 'RECEIVE_ERROR',
                    data: {
                        service: action.data.service,
                        error: error.response,
                    }
                })
            });
        return {
            ...state,
            [action.data.service]: {
                ...state[action.data.service],
                isCalling: true
            }
        };
    } if (action.type === 'MAKE_PUT_SERVICE_CALL') {
        axios.put(action.data.service, action.data.request)
            .then((response) => {
                if (action.data.sideEffectWhenOkResponse) {
                    action.data.sideEffectWhenOkResponse();
                }
                store.dispatch({
                    type: 'RECEIVE_SERVICE_RESPONSE',
                    data: {
                        service: action.data.service,
                        response: response.data
                    }
                })
            }).catch((error) => {
                if (action.data.sideEffectWhenFailedResponse) {
                    action.data.sideEffectWhenFailedResponse();
                }
                store.dispatch({
                    type: 'RECEIVE_ERROR',
                    data: {
                        service: action.data.service,
                        error: error,
                    }
                })
            });
        return {
            ...state,
            [action.data.service]: {
                ...state[action.data.service],
                isCalling: true
            }
        };
    } if (action.type === 'MAKE_POST_SERVICE_CALL') {
        axios.post(action.data.service, action.data.request)
            .then((response) => {
                store.dispatch({
                    type: 'RECEIVE_SERVICE_RESPONSE',
                    data: {
                        service: action.data.service,
                        response: response.data
                    }
                })
                if (action.data.sideEffectWhenOkResponse) {
                    action.data.sideEffectWhenOkResponse();
                }
            }).catch((error) => {
                store.dispatch({
                    type: 'RECEIVE_ERROR',
                    data: {
                        service: action.data.service,
                        error: error,
                    }
                })
                if (action.data.sideEffectWhenFailedResponse) {
                    action.data.sideEffectWhenFailedResponse();
                }
            });
        return {
            ...state,
            [action.data.service]: {
                ...state[action.data.service],
                isCalling: true
            }
        };
    } else if (action.type === 'RECEIVE_SERVICE_RESPONSE') {
        console.group('SUCCESS -', action.data.service);
        console.info(action.data.response);
        console.groupEnd('SUCCESS', action.data.service);
        return {
            ...state,
            [action.data.service]: {
                isCalling: false,
                response: action.data.response
            }
        }
    } else if (action.type === 'RECEIVE_ERROR') {
        console.group('ERROR -', action.data.service);
        console.error(action.data.error);
        console.groupEnd('ERROR -', action.data.service);
        return {
            ...state,
            [action.data.service]: {
                isCalling: false,
                error: action.data.error
            }
        }
    }

    return state;
}

export default serviceCall;
