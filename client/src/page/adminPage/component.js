import React, { useEffect } from "react";
import serviceEndpoints from '../../../serviceEndpoints.json'
import * as core from '../../core';
import * as serviceCallUtil from '../../serviceCallUtil';

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

        if (!serviceCallUtil.getServiceResponse(state, serviceEndpoints.getReporters)
            || !serviceCallUtil.getServiceResponse(state, serviceEndpoints.getStatuses)) {
            return (<div className="d-flex justify-content-center m-5"><Spinner /></div>);
        }

        return (
            <div className="card">
                <div className="card-header">
                    <h1 className="mb-1 mt-2">Admin</h1>
                </div>

                <div className="card-block">
                    <div className="d-flex row">

                        <div className="flex-fill mr-5">
                            <h2 className="ml-1 h4 my-1">Gårdar:</h2>
                            {core.getReporters(state).map(function (reporter) {
                                return (
                                    <div style={{
                                        paddingLeft: '0.2rem',
                                        fontWeight: '700'
                                    }}
                                        className="d-flex row align-items-center ml-2 my-1"
                                        key={reporter._id}>
                                        <p className="flex-grow-1">{reporter.reporter}</p>
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
                            <div className="d-flex justify-content-end row align-items-center mt-2">
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
                                    className="mt-1"
                                    spinner={serviceCallUtil.isCallingService(state, serviceEndpoints.addReporter)}
                                    disabled={serviceCallUtil.isCallingService(state, serviceEndpoints.addReporter)}
                                    type='small'
                                    icon="check"
                                    onClick={function () {
                                        triggerEvent({
                                            name: 'REPORTER_ADDED',
                                            reporter: core.getFormField(state, core.pages.admin, 'addReporter')
                                        });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex-fill">
                            <h2 className="ml-1 h4 my-1">Statusar:</h2>
                            {core.getStatuses(state).map(function (status) {
                                return (
                                    <div style={{
                                        paddingLeft: '0.2rem',
                                        fontWeight: '700'
                                    }}
                                        className="d-flex row align-items-center ml-2 my-1"
                                        key={status._id}>
                                        <p className="flex-grow-1">{status.status}</p>
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
                            <div className="align-items-center mt-2">
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
                                    className="mt-1 float-right"
                                    type='primary'
                                    label="Lägg till"
                                    spinner={serviceCallUtil.isCallingService(state, serviceEndpoints.addStatus)}
                                    disabled={serviceCallUtil.isCallingService(state, serviceEndpoints.addStatus)}
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
