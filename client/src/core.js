import serviceEndpoints from '../serviceEndpoints.json';
import * as serviceCallUtil from './serviceCallUtil';
import _ from 'lodash';

export const pages = {
    overview: 'OVERVIEW_PAGE',
    add: 'ADD_PAGE',
    details: 'DETAILS_PAGE',
    admin: 'ADMIN_PAGE'
};

export function getStartPage() {
    return pages.overview;
}

export function maybeCallSideEffect(state, store) {
    if (serviceCallUtil.shouldCallService(state, serviceEndpoints.getFaultReports)) {
        store.dispatch({
            type: 'MAKE_GET_CALL_SERVICE',
            data: {
                service: serviceEndpoints.getFaultReports
            }
        })
    } else if (serviceCallUtil.shouldCallService(state, serviceEndpoints.getStatuses)) {
        store.dispatch({
            type: 'MAKE_GET_CALL_SERVICE',
            data: {
                service: serviceEndpoints.getStatuses,
                sideEffectWhenOkResponse: function (response) {
                    store.dispatch({
                        type: 'ADD_FILTERS',
                        data: {
                            type: 'status',
                            values: response.data.map(function (s) {
                                return s.status;
                            })
                        }
                    })
                }
            }
        });
    } else if (serviceCallUtil.shouldCallService(state, serviceEndpoints.getReporters)) {
        store.dispatch({
            type: 'MAKE_GET_CALL_SERVICE',
            data: {
                service: serviceEndpoints.getReporters,
                sideEffectWhenOkResponse: function (response) {
                    store.dispatch({
                        type: 'ADD_FILTERS',
                        data: {
                            type: 'reporter',
                            values: response.data.map(function (r) {
                                return r.reporter;
                            })
                        }
                    })
                }
            }
        })
    } else if (serviceCallUtil.shouldCallService(state, serviceEndpoints.getCategories)) {
        store.dispatch({
            type: 'MAKE_GET_CALL_SERVICE',
            data: {
                service: serviceEndpoints.getCategories,
                sideEffectWhenOkResponse: function (response) {
                    store.dispatch({
                        type: 'ADD_FILTERS',
                        data: {
                            type: 'category',
                            values: response.data.map(function (s) {
                                return s.category;
                            })
                        }
                    })
                }
            }
        })
    }
}

export function translateFaultReportField(field) {
    return {
        location: 'Plats',
        description: 'Beskrivning',
        header: 'Rubrik',
        propertyNumber: 'Fastightetsnummer',
        reporter: 'Gård',
        status: 'Status'
    }[field];
}

export function getActivePage(state) {
    return state.navigation.page;
}

export function getReporters(state) {
    return serviceCallUtil.getServiceResponse(state, [serviceEndpoints.getReporters]);
}

export function getStatuses(state) {
    return serviceCallUtil.getServiceResponse(state, [serviceEndpoints.getStatuses]);
}

export function getCategories(state) {
    return serviceCallUtil.getServiceResponse(state, [serviceEndpoints.getCategories]);
}

export function getAddFaultReportRequest(state) {
    return {
        header: state.forms.addPage.header,
        description: state.forms.addPage.description,
        propertyNumber: state.forms.addPage.propertyNumber,
        location: state.forms.addPage.location,
        reporter: state.forms.addPage.reporter,
        category: state.forms.addPage.category,
        status: 'new'
    };
}

export function getAddCommentRequest(state) {
    return {
        id: state.navigation.selectedFaultReport,
        comment: {
            message: state.forms[pages.details]['addComment' + state.navigation.selectedFaultReport],
            // TODO: When users are added, the right user shall be sent
            reporter: 'Solgården'
        }
    };
}

export function getUpdateFaultReportResponse(state) {
    return {
        id: '1',
        fieldToUpdate: 'description',
        newValue: 'Nu har jag uppdaterat felanmälan än en gång'
    };
}

export function getCurrentPage(state) {
    return state.navigation.page;
}

export function getFormField(state, page, field) {
    return (state.forms[page] && state.forms[page][field]) || '';
}

export function getFaultReports(state) {
    return serviceCallUtil.getServiceResponse(state, serviceEndpoints.getFaultReports);
}

export function getFaultReportFilterCategories(state) {
    return _.keys(state.filters);
}

export function getStatusValues(state) {
    return _.keys(state.filters.status);
}

export function getReportersFilterValues(state) {
    return _.keys(state.filters.reporter);
}

export function getCategoryFilterValues(state) {
    return _.keys(state.filters.category);
}

export function getFaultReportsFiltered(faultReports, filters) {
    function faultReportsFilterNotIncludedInAllFilters(faultReport, filter) {
        return !_.includes(_.keys(filters[filter]), faultReport[filter]);
    }

    _.keys(filters).map(function (filter) {
        faultReports = faultReports.filter(function (faultReport) {
            if (faultReportsFilterNotIncludedInAllFilters(faultReport, filter)) {
                return true;
            }
            return filters[filter][faultReport[filter]];
        })
    })
    return faultReports;
}

function getActiveFaultReportSorting(sortBy) {
    return {
        Gård: 'reporter',
        Status: 'status',
        Kategori: 'category',
        Skapad: 'createdOn'
    }[sortBy];
}

export function getFaultReportsSorted(faultReports, sortOn) {
    const mappedSorting = getActiveFaultReportSorting(sortOn)
    if (mappedSorting === 'date') {
        return _.sortBy(faultReports, function (fr) {
            return new Date(fr[mappedSorting]);
        })
    }
    return _.sortBy(faultReports, function (fr) {
        return fr[mappedSorting];
    })
}

export function getFaultReportsFilteredBySearchString(faultReports, searchString) {
    if (!searchString) {
        return faultReports;
    }

    return faultReports.filter(function (f) {
        const stringToCompareTo =
            f.description
            + f.reporter
            + f.header
            + f.propertyNumber
            + f.location
            + f._id
            + f.category
            + f.status;
        return stringToCompareTo.match(new RegExp('(\\w*' + searchString + '\\w*)', 'gi'))
    })
}

export function getSortOnValue(state) {
    return getFormField(state, pages.overview, 'sortOrder');
}

export function getSearchString(state) {
    return getFormField(state, pages.overview, 'search');
}

export function getFilteredAndSortedFaultReports(state) {
    var faultReports = getFaultReports(state);

    faultReports = getFaultReportsFiltered(faultReports, state.filters);
    faultReports = getFaultReportsSorted(faultReports, getSortOnValue(state));
    faultReports = getFaultReportsFilteredBySearchString(faultReports, getSearchString(state));

    return faultReports;
}

export function isFilterActive(state, filter, value) {
    return state.filters[filter][value];
}

export function isAllFiltersActive(state, filterCategory) {
    return _.values(state.filters[filterCategory]).every(function (f) {
        return f;
    });
}

export function formatDate(date) {
    const parsedDate = new Date(date);
    return (
        parsedDate.getDate() + '/' +
        parsedDate.getMonth() + '-' +
        parsedDate.getFullYear() + '  - ' +
        parsedDate.getHours() + ':' +
        parsedDate.getMinutes()
    );
}

export function getAddedFaultReport(state) {
    return serviceCallUtil.getServiceResponse(state, serviceEndpoints.addFaultReport);
}

export function getChosenFaultReport(state) {
    return _.find(serviceCallUtil.getServiceResponse(state, serviceEndpoints.getFaultReports), function (faultReport) {
        return faultReport._id === state.navigation.selectedFaultReport;
    });
}

export function truncateText(text, maxLength) {
    return text.length > (maxLength - 3) ? text.substring(0, maxLength) + '...' : text;
}
