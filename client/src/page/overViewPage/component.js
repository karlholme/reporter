import React, { useEffect } from "react";
import _ from 'lodash';
import serviceEndpoints from '../../../serviceEndpoints.json'
import spinnerMaker from '../../components/spinner';
import clickableCardMaker from '../../components/clickableCard';
import AlertMaker from '../../components/alert';
import * as core from '../../core';

export default function () {

    const Spinner = spinnerMaker();
    const ClickableCard = clickableCardMaker();
    const Alert = AlertMaker();

    function OverviewContent({ state, triggerEvent }) {

        useEffect(() => {
            triggerEvent({ name: 'COMPONENT_MOUNTED' })
        }, []);

        if (_.isEmpty(core.getFaultReports(state))) {
            return (
                <div className="d-flex justify-content-center m-5"><Spinner /></div>);
        }

        return (
            <div className="card">
                {core.getFaultReports(state).map(function (faultReport) {
                    return (
                        <ClickableCard
                            className="mb-2"
                            key={faultReport.createdOn + faultReport._id}
                            id={faultReport._id}
                            faultReport={faultReport}
                            onClick={function () {
                                triggerEvent({ name: 'CARD_PRESSED', id: faultReport._id })
                            }}
                        />
                    );
                })}
            </div>
        )
    }

    return function OverviewComponent(props) {
        return (
            <OverviewContent {...props} />
        );
    }
}
