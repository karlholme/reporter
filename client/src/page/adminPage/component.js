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

        if (!core.getServiceResponse(state, serviceEndpoints.getReporters)
            || !core.getServiceResponse(state, serviceEndpoints.getStatuses)) {
            return (<div className="d-flex justify-content-center m-5"><Spinner /></div>);
        }

        return (
            <div className="card">
                <div className="card-header">
                    <h1>Admin</h1>
                </div>
                <div className="card-block">
                    <div>
                        <h2 className="ml-1 h4">Gårdar:</h2>
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
                            value={core.getFormField(state, core.pages.admin, 'addReporter')}
                            style={{ width: '200px' }}
                            placeholder="Lägg till gård"
                            onChange={(event) => {
                                event.preventDefault();
                                triggerEvent({
                                    name: 'FORM_UPDATED',
                                    data: event.target.value,
                                    page: core.pages.admin,
                                    inputField: 'addReporter'
                                })
                            }} />
                        <Button
                            className="ml-2"
                            type='primary'
                            label="Lägg till"
                            spinner={core.isCallingService(state, serviceEndpoints.addReporter)}
                            disabled={core.isCallingService(state, serviceEndpoints.addReporter)}
                            onClick={function () {
                                triggerEvent({
                                    name: 'REPORTER_ADDED',
                                    reporter: core.getFormField(state, core.pages.admin, 'addReporter')
                                });
                            }}
                        />
                    </div>
                </div>

                <div className="card-block">
                    <div>
                        <h2 className="ml-1 h4">Statusar:</h2>
                        {core.getStatuses(state).map(function (status) {
                            return (
                                <div style={{ maxWidth: '200px' }}
                                    className="d-flex row justify-content-between ml-2"
                                    key={status._id}>
                                    <p>{status.status}</p>
                                    <Button
                                        type="delete"
                                        onClick={function () {
                                            triggerEvent({
                                                name: 'REMOVE_STATUS_CLICKED',
                                                id: status._id
                                            })
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="d-flex row d-flex align-items-center mt-2">
                        <Input
                            value={core.getFormField(state, core.pages.admin, 'addStatus')}
                            style={{ width: '200px' }}
                            placeholder="Lägg till status"
                            onChange={(event) => {
                                event.preventDefault();
                                triggerEvent({
                                    name: 'FORM_UPDATED',
                                    data: event.target.value,
                                    page: core.pages.admin,
                                    inputField: 'addStatus'
                                })
                            }} />
                        <Button
                            className="ml-2"
                            type='primary'
                            label="Lägg till"
                            spinner={core.isCallingService(state, serviceEndpoints.addStatus)}
                            disabled={core.isCallingService(state, serviceEndpoints.addStatus)}
                            onClick={function () {
                                triggerEvent({
                                    name: 'STATUS_ADDED',
                                    status: core.getFormField(state, core.pages.admin, 'addStatus')
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
