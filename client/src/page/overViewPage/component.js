import React, { useEffect } from "react";
import _ from 'lodash';
import serviceEndpoints from '../../../serviceEndpoints.json'
import inputMaker from '../../components/input';
import textAreaMaker from '../../components/textArea';
import dropDownMaker from '../../components/dropdown';
import buttonMaker from '../../components/button';
import spinnerMaker from '../../components/spinner';
import * as core from '../../core';

export default function () {

    const Input = inputMaker();
    const TextArea = textAreaMaker();
    const Dropdown = dropDownMaker();
    const Button = buttonMaker();
    const Spinner = spinnerMaker();

    function OverviewContent({ state, store }) {

        useEffect(() => {
            store.dispatch({
                type: 'MAKE_GET_CALL_SERVICE',
                request: {},
                service: serviceEndpoints.getFaultReports
            })
        }, []);

        if (_.isEmpty(core.getFaultReports(state))) {
            return <Spinner />;
        }

        return (
            <React.Fragment>
                {core.getFaultReports(state).map(function (faultReport) {
                    return (
                        <div key={faultReport.createdOn}>
                            <h2>{faultReport.header}</h2>
                            <p>{faultReport.createdOn}</p>
                            <p>{faultReport.location}</p>
                            <p>{faultReport.reporter}</p>
                            <p>{faultReport.description}</p>
                        </div>
                    );
                })}
            </React.Fragment>
        )
    }

    return function OverviewComponent(props) {
        return (
            <OverviewContent {...props} />
        );
    }
}
