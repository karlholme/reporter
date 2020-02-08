import React, { useEffect } from "react";
import serviceEndpoints from '../../../serviceEndpoints.json'
import * as core from '../../core';

import spinnerMaker from '../../components/spinner';
import buttonMaker from '../../components/button';

export default function () {

    const Spinner = spinnerMaker();
    const Button = buttonMaker();

    function AdminContent({ store, state, triggerEvent }) {

        useEffect(() => {
            triggerEvent({ name: 'PAGE_MOUNTED' })
        }, []);

        if (!core.getServiceResponse(state, serviceEndpoints.getReporters)) {
            return (<div className="d-flex justify-content-center m-5"><Spinner /></div>);
        }

        return (
            <div className="card">
                <div className="card-header">
                    <h1>Admin</h1>
                </div>
                <div className="card-block">
                    <h3>
                        Gårdar:
                    </h3>
                    {core.getReporters(state).map(function (reporter) {
                        return (
                            <div style={{ maxWidth: '200px' }}
                                className="d-flex row justify-content-between"
                                key={reporter._id}>
                                <p>{reporter.reporter}</p>
                                <Button
                                    type="delete"
                                    onClick={function () {
                                        triggerEvent({
                                            name: 'REMOVE_REPORTER_CLICKED',
                                            id: reporter._id
                                        })
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }

    return function AdminPage(props) {
        return (
            <AdminContent {...props} />
        );
    }
}
