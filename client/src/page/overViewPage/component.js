import React, { useEffect } from 'react';

import _ from 'lodash';
import serviceEndpoints from '../../../serviceEndpoints.json';
import spinnerMaker from '../../components/spinner';
import clickableCardMaker from '../../components/clickableCard';
import checkboxMaker from '../../components/checkbox';
import AlertMaker from '../../components/alert';

import * as core from '../../core';
import * as serviceCallUtil from '../../serviceCallUtil';

export default function () {
    const Spinner = spinnerMaker();
    const ClickableCard = clickableCardMaker();
    const Alert = AlertMaker();
    const Checkbox = checkboxMaker();

    function OverviewContent({ state, triggerEvent }) {
        useEffect(() => {
            triggerEvent({ name: 'COMPONENT_MOUNTED' })
        }, []);

        if (!(serviceCallUtil.getServiceResponse(state, serviceEndpoints.getStatuses)
            && serviceCallUtil.getServiceResponse(state, serviceEndpoints.getFaultReports))) {
            return (
                <div className='d-flex justify-content-center m-5'>
                    <Spinner />
                </div>
            );
        }

        const filterHeaderStyle = {
            fontSize: '1.2rem',
            color: 'var(--dark-night)',
            margin: '0',
            marginBottom: '0.3rem',
            textShadow: '0px 0.1rem 0px rgba(0, 0, 0, 0.1)'
        };

        const filtersClassName = 'mb-1';

        return (
            <React.Fragment>
                {serviceCallUtil.getServiceResponse(state, serviceEndpoints.addFaultReport) && (
                    <Alert
                        className='mb-3'
                        header={'Felanmälan tillagd'}
                        body={'Felanmälan med id: '
                            + serviceCallUtil.getServiceResponse(state, serviceEndpoints.addFaultReport)._id
                            + ' är nu  tillagd.'}
                        type='success'
                    />
                )}
                <div className="row">
                    <div className="col">
                        <h2 style={filterHeaderStyle}>Status:</h2>
                        {core.getStatusValues(state).map(function (v) {
                            return (<Checkbox
                                key={v}
                                label={v}
                                checked={core.isFilterActive(state, 'status', v)}
                                className={filtersClassName}
                                onChange={function (checked) {
                                    triggerEvent({
                                        name: "FILTER_SELECTED",
                                        data: {
                                            filter: 'status',
                                            status: v,
                                            checked: checked
                                        }
                                    });
                                }}
                            />)
                        })}
                    </div>
                    <div className="col">
                        <h2 style={filterHeaderStyle}>Gård:</h2>
                        {core.getReportersFilterValues(state).map(function (v) {
                            return (<Checkbox
                                key={v}
                                label={v}
                                className={filtersClassName}
                                checked={core.isFilterActive(state, 'reporter', v)}
                                onChange={function (checked) {
                                    triggerEvent({
                                        name: "FILTER_SELECTED",
                                        data: {
                                            filter: 'reporter',
                                            status: v,
                                            checked: checked
                                        }
                                    });
                                }}
                            />)
                        })}
                    </div>
                    <div className="col">
                        <h2 style={filterHeaderStyle}>Kategori:</h2>
                        {core.getCategoryFilterValues(state).map(function (v) {
                            return (<Checkbox
                                key={v}
                                label={v}
                                className={filtersClassName}
                                checked={core.isFilterActive(state, 'category', v)}
                                onChange={function (checked) {
                                    triggerEvent({
                                        name: "FILTER_SELECTED",
                                        data: {
                                            filter: 'category',
                                            status: v,
                                            checked: checked
                                        }
                                    });
                                }}
                            />)
                        })}
                    </div>
                </div>

                <div className='card'>
                    {core.getFilterdFaultReports(state).map(function (faultReport) {
                        return (
                            <ClickableCard
                                className='mb-2'
                                state={state}
                                key={faultReport.createdOn + faultReport._id}
                                id={faultReport._id}
                                faultReport={faultReport}
                                onClick={function () {
                                    triggerEvent({ name: 'CARD_PRESSED', id: faultReport._id });
                                }}
                            />
                        );
                    })}
                </div>
            </React.Fragment >
        );
    }

    return function OverviewComponent(props) {
        return <OverviewContent {...props} />;
    };
}
