import React, { useEffect } from "react";
import serviceEndpoints from '../../../serviceEndpoints.json'
import * as core from '../../core';

import spinnerMaker from '../../components/spinner';
import buttonMaker from '../../components/button';
import inputMaker from '../../components/input';

export default function () {

    const Spinner = spinnerMaker();
    const Button = buttonMaker();
    const Input = inputMaker();

    function AdminContent({ state, triggerEvent }) {

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
                    <div>
                        <h3 className="ml-1">Gårdar:</h3>
                        {core.getReporters(state).map(function (reporter) {
                            return (
                                <div style={{ maxWidth: '200px' }}
                                    className="d-flex row justify-content-between ml-2"
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
                    <div className="d-flex row d-flex align-items-center mt-2">
                        <Input
                            value={core.getFormField(state, 'detailsPage', 'addReporter')}
                            style={{ width: '200px' }}
                            placeholder="Lägg till gård"
                            onChange={(event) => {
                                event.preventDefault();
                                triggerEvent({
                                    name: 'FORM_UPDATED',
                                    data: event.target.value,
                                    page: 'adminPage',
                                    inputField: 'addReporter'
                                })
                            }} />
                        <Button
                            className="ml-2"
                            type='primary'
                            label="Lì±„gg till"
                            spinner={core.isCallingService(state, serviceEndpoints.addReporter)}
                            disabled={core.isCallingService(state, serviceEndpoints.addReporter)}
                            onClick={function () {
                                triggerEvent({
                                    name: 'REPORTER_ADDED',
                                    reporter: core.getFormField(state, 'addReporter')
                                });
                            }}
                        />
                    </div>
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
