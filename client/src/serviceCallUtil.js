export function shouldCallService(state, service) {
   return (
      state.serviceCall[service].requested
      && !state.serviceCall[service].isCalling
      && !state.serviceCall[service].response
   );
}

export function getServiceResponse(state, service) {
   return state.serviceCall[service].response;
}

export function isCallingService(state, service) {
   return state.serviceCall[service].isCalling;
}

export function serviceHasBeenRequested(state, service) {
   return state.serviceCall[service].requested;
}

export function hasOkServiceResponse(state, service) {
   state.serviceCall[service].response !== null;
}
