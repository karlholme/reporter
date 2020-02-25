import serviceEndpoints from '../serviceEndpoints.json';

export const pages = {
    overview: 'OVERVIEW_PAGE',
    add: 'ADD_PAGE',
    receipt: 'RECEIPT_PAGE',
    details: 'DETAILS_PAGE',
    admin: 'ADMIN_PAGE'
}

export function getStartPage() {
    return pages.overview;
}

export function translateFaultReportField(field) {
    return {
        location: 'plats',
        description: 'beskrivning',
        header: 'rubrik',
        propertyNumber: 'fastightetsnummer',
        reporter: 'gård',
        status: 'status'
    }[field];
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
    return getServiceResponse(state, [serviceEndpoints.getReporters]);
}

export function getAddFaultReportRequest(state) {
    return {
        header: state.forms.addPage.header,
        description: state.forms.addPage.description,
        propertyNumber: state.forms.addPage.propertyNumber,
        location: state.forms.addPage.location,
        reporter: state.forms.addPage.reporter,
        status: 'new'
    }
}

export function getAddCommentRequest(state) {
    return {
        id: state.navigation.selectedFaultReport,
        comment: {
            message: state.forms[pages.details]['addComment' + state.navigation.selectedFaultReport],
            reporter: "Solgården"
        }
    }
}

export function getUpdateFaultReportResponse(state) {
    return {
        id: "1",
        fieldToUpdate: "description",
        newValue: "Nu har jag uppdaterat felanmälan än en gång"
    }
}

export function getCurrentPage(state) {
    return state.navigation.page;
}

export function getFormField(state, page, field) {
    return (state.forms[page]
        && state.forms[page][field])
        || '';
}

export function getFaultReports(state) {
    return getServiceResponse(state, serviceEndpoints.getFaultReports);
}

export function formatDate(date) {
    const paresedDate = new Date(date);
    return paresedDate.getDate()
        + '/' + paresedDate.getMonth()
        + '-' + paresedDate.getFullYear()
        + '  - ' + paresedDate.getHours()
        + ':' + paresedDate.getMinutes();
}

export function getAddedFaultReport(state) {
    return getServiceResponse(state, serviceEndpoints.addFaultReport);
}

export function getChosenFaultReport(state) {
    return getServiceResponse(state, serviceEndpoints.getFaultReports)[state.navigation.selectedFaultReport];
}
