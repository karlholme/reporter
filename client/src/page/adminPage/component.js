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

        if (!serviceCallUtil.getServiceResponse(state, serviceEndpoints.getReporters) ||
            !serviceCallUtil.getServiceResponse(state, serviceEndpoints.getStatuses) ||
            !serviceCallUtil.getServiceResponse(state, serviceEndpoints.getCategories)) {
            return (<div className="d-flex justify-content-center m-5"><Spinner /></div>);
        }

        return (
            <div className="card">
                <div className="card-header">
                    <h1 className="mb-1 mt-2">Admin</h1>
                </div>

                <div className="card-block">
                    <div className="mb-3">
                        <h2 className="h4 mt-0">Gårdar:</h2>
                        {core.getReporters(state).map(function (reporter) {
                            return (
                                <div style={{ fontWeight: '500' }}
                                    className="d-flex row align-items-center my-1"
                                    key={reporter._id}>
                                    <Button
                                        type="delete"
                                        onClick={function () {
                                            console.log('press');
                                            triggerEvent({
                                                name: 'REMOVE_REPORTER_CLICKED',
                                                id: reporter._id
                                            })
                                        }}
                                    />
                                    <p className="ml-2">{reporter.reporter}</p>
                                </div>
                            );
                        })}
                        <form onSubmit={function () {
                            triggerEvent({
                                name: 'REPORTER_ADDED',
                                reporter: core.getFormField(state, core.pages.admin, 'addReporter')
                            });
                        }}>
                            <div className="d-flex align-items-center">
                                <Input
                                    value={core.getFormField(state, core.pages.admin, 'addReporter')}
                                    style={{ width: '200px' }}
                                    placeholder="Lägg till gård"
                                    required
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
                                    label="Lägg till"
                                    spinner={serviceCallUtil.isCallingService(state, serviceEndpoints.addReporter)}
                                    disabled={serviceCallUtil.isCallingService(state, serviceEndpoints.addReporter)}
                                    icon="check"
                                    type='submit'
                                />
                            </div>
                        </form>
                    </div>
                    <div className="mb-3">
                        <h2 className="h4">Statusar:</h2>
                        {core.getStatuses(state).map(function (status) {
                            return (
                                <div style={{ fontWeight: '500' }}
                                    className="d-flex row align-items-center my-1"
                                    key={status._id}>
                                    <Button
                                        type="delete"
                                        onClick={function () {
                                            triggerEvent({
                                                name: 'REMOVE_STATUS_CLICKED',
                                                id: status._id
                                            })
                                        }}
                                    />
                                    <p className="ml-2">{status.status}</p>
                                </div>
                            );
                        })}
                        <form onSubmit={function () {
                            triggerEvent({
                                name: 'STATUS_ADDED',
                                status: core.getFormField(state, core.pages.admin, 'addStatus')
                            });
                        }}>
                            <div className="d-flex align-items-center mt-2">
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
                                    type='submit'
                                    label="Lägg till"
                                    spinner={serviceCallUtil.isCallingService(state, serviceEndpoints.addStatus)}
                                    disabled={serviceCallUtil.isCallingService(state, serviceEndpoints.addStatus)}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="mb-3">
                        <h2 className="h4">Kategorier:</h2>
                        {core.getCategories(state).map(function (c) {
                            return (
                                <div style={{ fontWeight: '500' }}
                                    className="d-flex row align-items-center my-1"
                                    key={c._id}>
                                    <Button
                                        type="delete"
                                        onClick={function () {
                                            triggerEvent({
                                                name: 'REMOVE_CATEGORY_CLICKED',
                                                id: c._id
                                            })
                                        }}
                                    />
                                    <p className="ml-2">{c.category}</p>
                                </div>
                            );
                        })}
                        <form onSubmit={function () {
                            triggerEvent({
                                name: 'ADD_CATEGORY_PRESSED',
                                category: core.getFormField(state, core.pages.admin, 'addCategory')
                            });
                        }}>
                            <div className="d-flex align-items-center mt-2">
                                <Input
                                    value={core.getFormField(state, core.pages.admin, 'addCategory')}
                                    style={{ width: '200px' }}
                                    placeholder="Lägg till kategori"
                                    onChange={(event) => {
                                        event.preventDefault();
                                        triggerEvent({
                                            name: 'FORM_UPDATED',
                                            data: event.target.value,
                                            page: core.pages.admin,
                                            inputField: 'addCategory'
                                        })
                                    }} />
                                <Button
                                    className="ml-2"
                                    type='submit'
                                    label="Lägg till"
                                    spinner={serviceCallUtil.isCallingService(state, serviceEndpoints.addCategory)}
                                    disabled={serviceCallUtil.isCallingService(state, serviceEndpoints.addCategory)}
                                />
                            </div>
                        </form>
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
