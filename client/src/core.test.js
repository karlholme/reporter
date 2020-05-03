import * as core from './core';
import serviceEndpoints from '../serviceEndpoints.json';

describe('getFilterdFaultReports', () => {
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
});

describe('getSortedFaultReports', () => {
    test('sort by category', () => {
        expect(core.getSortedFaultReports([
            {
                category: 'Övrigt',
                _id: 0,
            }, {
                category: 'Avlopp & Vatten',
                _id: 0,
            }, {
                category: 'Båtar och bryggor',
                _id: 0,
            }
        ], 'category')).toEqual([
            {
                category: 'Avlopp & Vatten',
                _id: 0,
            }, {
                category: 'Båtar och bryggor',
                _id: 0,
            }, {
                category: 'Övrigt',
                _id: 0,
            }
        ])
    })


    test('sort by date', () => {
        expect(core.getSortedFaultReports([
            {
                category: 'Övrigt',
                createdOn: '2020-06-02T09:33:41.221Z',
                _id: 0,
            }, {
                category: 'Avlopp & Vatten',
                createdOn: '2020-02-02T09:33:41.221Z',
                _id: 0,
            }, {
                category: 'Båtar och bryggor',
                createdOn: '2020-01-02T09:33:41.221Z',
                _id: 0,
            }
        ], 'createdOn')).toEqual([
            {
                category: 'Båtar och bryggor',
                createdOn: '2020-01-02T09:33:41.221Z',
                _id: 0,
            }, {
                category: 'Avlopp & Vatten',
                createdOn: '2020-02-02T09:33:41.221Z',
                _id: 0,
            }, {
                category: 'Övrigt',
                createdOn: '2020-06-02T09:33:41.221Z',
                _id: 0,
            }
        ])
    })
});

    // [
        //     {
            //         category: 'Övrigt',
            //         _id: 0,
            //         reporter: 'Solvik',
            //         createdOn: '2020-02-02T09:33:41.221Z',
            //         status: 'done'
//     }, {
//         category: 'Avlopp & Vatten',
//         _id: 0,
//         reporter: 'Solvik',
//         createdOn: '2020-02-02T09:33:41.221Z',
//         status: 'done'
//     }, {
//         category: 'Båtar och bryggor',
//         _id: 0,
//         reporter: 'Solvik',
//         createdOn: '2020-02-02T09:33:41.221Z',
//         status: 'done'
//     }
// ]
