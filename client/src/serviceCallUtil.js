
export function shouldCallService(state, service) {
    return state.serviceCall[service].requested
        && !state.serviceCall[service].isCalling
        && !state.serviceCall[service].response;
}

export function getServiceResponse(state, service) {
    return state.serviceCall[service].response
}

export function isCallingService(state, service) {
    return state.serviceCall[service].isCalling
}

export function serviceHasBeenCalled(state, service) {
    return !!getServiceResponse(state, service)
        || isCallingService(state, service);
}