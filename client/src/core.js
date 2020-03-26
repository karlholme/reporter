import serviceEndpoints from '../serviceEndpoints.json';
import * as serviceCallUtil from './serviceCallUtil';

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
   if (serviceCallUtil.shouldCallService(state, serviceEndpoints.getStatuses)) {
      store.dispatch({
         type: 'MAKE_GET_CALL_SERVICE',
         data: {
            service: serviceEndpoints.getStatuses
         }
      });
   }
   else if (serviceCallUtil.shouldCallService(state, serviceEndpoints.getReporters)) {
      store.dispatch({
         type: 'MAKE_GET_CALL_SERVICE',
         data: {
            service: serviceEndpoints.getReporters
         }
      })
   } else if (serviceCallUtil.shouldCallService(state, serviceEndpoints.getFaultReports)) {
      store.dispatch({
         type: 'MAKE_GET_CALL_SERVICE',
         data: {
            service: serviceEndpoints.getFaultReports
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

export function getAddFaultReportRequest(state) {
   return {
      header: state.forms.addPage.header,
      description: state.forms.addPage.description,
      propertyNumber: state.forms.addPage.propertyNumber,
      location: state.forms.addPage.location,
      reporter: state.forms.addPage.reporter,
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

export function formatDate(date) {
   const paresedDate = new Date(date);
   return (
      paresedDate.getDate() +
      '/' +
      paresedDate.getMonth() +
      '-' +
      paresedDate.getFullYear() +
      '  - ' +
      paresedDate.getHours() +
      ':' +
      paresedDate.getMinutes()
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
