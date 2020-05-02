import * as core from './core';
import serviceEndpoints from '../serviceEndpoints.json';

test('1. Only faultReports with filter set to true shall be returned', () => {
    expect(core.getFilterdFaultReports({
        filters: {
            status: {
                done: false,
                'in progress': true
            }
        },
        serviceCall: {
            [serviceEndpoints.getFaultReports]: {
                response: [{
                    header: 'should be filtered out',
                    status: 'done'
                }, {
                    header: 'should stay',
                    status: 'in progress'
                }]
            }
        }
    })).toEqual([{
        header: 'should stay',
        status: 'in progress'
    }]);
});

test('2. Only faultReports with filter set to true shall be returned', () => {
    expect(core.getFilterdFaultReports({
        filters: {
            status: {
                done: false,
                'in progress': false
            }
        },
        serviceCall: {
            [serviceEndpoints.getFaultReports]: {
                response: [{
                    header: 'should be filtered out',
                    status: 'done'
                }, {
                    header: 'should stay',
                    status: 'in progress'
                }]
            }
        }
    })).toEqual([]);
});

test('3. FaultReports with values that are not present as a filter shall be returned', () => {
    expect(core.getFilterdFaultReports({
        filters: {
            status: {
                done: false,
            }
        },
        serviceCall: {
            [serviceEndpoints.getFaultReports]: {
                response: [{
                    header: 'should be filtered out',
                    status: 'done'
                }, {
                    header: 'should stay',
                    status: 'in progress'
                }]
            }
        }
    })).toEqual([{
        header: 'should stay',
        status: 'in progress'
    }]);
});
