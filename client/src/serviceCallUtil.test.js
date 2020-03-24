import * as serviceCallerUtil from './serviceCallUtil';

describe('serviceHasBeenCalled', () => {
    test('if there is an response, should return true', function () {
        expect(serviceCallerUtil.serviceHasBeenCalled({
            serviceCall: {
                service: {
                    response: {
                        hej: 'ok'
                    },
                    isCalling: false,
                    requested: false
                }
            }
        }, 'service')).toBe(true);
    })

    test('if no response, should return false', function () {
        expect(serviceCallerUtil.serviceHasBeenCalled({
            serviceCall: {
                service: {
                    response: null,
                    isCalling: false,
                    requested: false
                }
            }
        }, 'service')).toBe(false);
    })

    test('if no response but service is being called, then it should return true', function () {
        expect(serviceCallerUtil.serviceHasBeenCalled({
            serviceCall: {
                service: {
                    response: null,
                    isCalling: true,
                    requested: false
                }
            }
        }, 'service')).toBe(true);
    })
})

describe('shouldCallService', () => {
    test('If there is a response, it should return false', function () {
        expect(serviceCallerUtil.shouldCallService({
            serviceCall: {
                service: {
                    response: {
                        hej: 'ok'
                    },
                    isCalling: false,
                    requested: false
                }
            }
        }, 'service')).toBe(false);
    })

    test('If there is a response, and service is requested, it should return false', function () {
        expect(serviceCallerUtil.shouldCallService({
            serviceCall: {
                service: {
                    response: {
                        hej: 'ok'
                    },
                    isCalling: false,
                    requested: true
                }
            }
        }, 'service')).toBe(false);
    })

    test('If there is NO response, and service is requested, it should return true', function () {
        expect(serviceCallerUtil.shouldCallService({
            serviceCall: {
                service: {
                    response: null,
                    isCalling: false,
                    requested: true
                }
            }
        }, 'service')).toBe(true);
    })

    test('If there is NO response, but service is beeing called, it should return false', function () {
        expect(serviceCallerUtil.shouldCallService({
            serviceCall: {
                service: {
                    response: null,
                    isCalling: true,
                    requested: false
                }
            }
        }, 'service')).toBe(false);
    })
})
