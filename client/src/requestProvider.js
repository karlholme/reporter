
export function getAddFaultReportRequest(state) {
    return {
        header: state.addReport.header,
        description: state.addReport.description,
        propertyNumber: state.addReport.propertyNumber,
        location: state.addReport.location,
        reporter: state.addReport.reporter
    }
}