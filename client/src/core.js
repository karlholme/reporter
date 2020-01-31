import serviceEndpoints from '../serviceEndpoints.json';

export const pages = {
    overViewPage: 'OVERVIEW_PAGE',
    detailsPage: 'DETAILS_PAGE',
    addPage: 'ADD_PAGE'
}

export function getStartPage() {
    return pages.overViewPage;
}

export function getActivePage(state) {
    return state.navigation.page;
}

export function getServiceResponse(state, service) {
    return state.serviceCall[service].response
}

export function isCallingService(state, service) {
    return state.serviceCall[service].isCalling
}

export function getReporters(state) {
    return getServiceResponse(state, [serviceEndpoints.getReporters])
        .map((reporter) => reporter.reporter);
}

export function getAddFaultReportRequest(state) {
    return {
        header: state.addFaultReport.header,
        description: state.addFaultReport.description,
        propertyNumber: state.addFaultReport.propertyNumber,
        location: state.addFaultReport.location,
        reporter: state.addFaultReport.reporter
    }
}

export function getCurrentPage(state) {
    return state.navigation.page;
}

export function getFaultReportField(state, field) {
    return state.addFaultReport[field];
}

export function getFaultReports(state) {
    return getServiceResponse(state, serviceEndpoints.getFaultReports);
}
