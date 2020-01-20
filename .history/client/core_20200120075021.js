import serviceEndpoints from './serviceEndpoints';

export function getServiceResponse(state, service) {
    return state.serviceCalls[service].response
}

export function isCallingService(state, service) {
    return state.serviceCalls[service].isCalling
}

export function getReporters(state) {
    return getServiceResponse(state, [serviceEndpoints.getReporters])
        .map((reporter) => reporter.reporter);
}