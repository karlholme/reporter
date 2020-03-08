import serviceEndpoints from '../../serviceEndpoints.json'
import axios from 'axios';
import store from '../stores/configureStore';
import * as core from '../core';

function getDefaultState() {
    return _.values(serviceEndpoints).reduce(function (acc, curr) {
        return _.merge(acc, {
            [curr]: {
                requested: false,
                isCalling: false,
                response: null
            }
        })
    }, {})
}


function logServiceCall(action, state) {
    console.groupCollapsed('SERVICE CALL - ', action.data.service);
    console.info(action.type);
    console.info('Request: ', action.data.request);
    console.info('Staet: ', state);
    console.groupEnd('SERVICE CALL - ', action.data.service);
}

function serviceCall(state = getDefaultState(), action) {
    console.log('defaultState', getDefaultState());

    if (action.type === 'MAKE_GET_CALL_SERVICE') {
        logServiceCall(action, state);
        axios.get(action.data.service)
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
        logServiceCall(action);
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
        logServiceCall(action);
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
        console.groupCollapsed('SUCCESS -', action.data.service);
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
