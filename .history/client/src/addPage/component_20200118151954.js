import React, { useEffect } from "react";
import { Select, MenuItem } from '@material-ui/core';
import * as requestProvider from '../requestProvider'
import serviceEndpoints from '../../serviceEndpoints.json'

export default function () {
    function AddPageContent({ store, state }) {

        useEffect(() => {
            store.dispatch({
                type: 'CALL_SERVICE',
                request: { hej: 1 },
                service: serviceEndpoints.getReporters
            })
        }, []);

        // console.log('hej', state)

        if (!state.serviceCalls[serviceEndpoints.getReporters].response) {
            return <div>hej</div>;
        }

        return (
            <div className="card">
                <div className="card-header">
                    <h1>FELANMÄLAN</h1>
                </div>

                <div className="card-block">
                    <form onSubmit={function (e) {
                        e.preventDefault();
                        store.dispatch({
                            type: 'CALL_SERVICE',
                            request: requestProvider.getAddFaultReportRequest(state),
                            service: serviceEndpoints.addFaultReport
                        })
                    }}>
                        <div className="p-0 d-flex flex-row">
                            <fieldset>
                                <label>Rubrik:</label>
                                <input value={state.addReport.header}
                                    type="text"
                                    name="header"
                                    style={{ width: '300px' }}
                                    placeholder="Rubrik"
                                    onChange={(event) => {
                                        event.preventDefault();
                                        store.dispatch({
                                            type: 'UPDATE_ADD_FAULT_REPORT_FORM',
                                            data: event.target.value,
                                            inputField: 'header'
                                        })
                                    }} />
                            </fieldset>
                            <fieldset>
                                <label>Fastighetsnummer:</label>
                                <input
                                    value={state.addReport.propertyNumber}
                                    type="number"
                                    name="propertynumber"
                                    placeholder="Ex. 123"
                                    onChange={(event) => {
                                        event.preventDefault();
                                        store.dispatch({
                                            type: 'UPDATE_ADD_FAULT_REPORT_FORM',
                                            data: event.target.value,
                                            inputField: 'propertyNumber'
                                        })
                                    }} />
                            </fieldset>
                        </div>

                        <fieldset>
                            <label>Plats:</label>
                            <input value={state.addReport.location}
                                type="text"
                                name="location"
                                style={{ width: '300px' }}
                                placeholder="Tex Köket"
                                onChange={(event) => {
                                    event.preventDefault();
                                    store.dispatch({
                                        type: 'UPDATE_ADD_FAULT_REPORT_FORM',
                                        data: event.target.value,
                                        inputField: 'location'
                                    })
                                }} />
                        </fieldset>

                        <fieldset>
                            <label id="demo-simple-select-label">Gård:</label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={state.addReport.reporter}
                                onChange={(event) => {
                                    event.preventDefault();
                                    store.dispatch({
                                        type: 'UPDATE_ADD_FAULT_REPORT_FORM',
                                        data: event.target.value,
                                        inputField: 'reporter'
                                    })
                                }}>
                                {state.serviceCalls[serviceEndpoints.getReporters].response.map((reporter) => {
                                    return <MenuItem
                                        key={reporter.reporter}
                                        value={reporter.reporter}>
                                        {reporter.reporter}
                                    </MenuItem>
                                })}
                            </Select>
                        </fieldset>

                        <fieldset>
                            <label>Beskrivning:</label>
                            <textarea
                                value={state.addReport.description}
                                type="text"
                                name="Beskrivning"
                                maxLength="700"
                                rows="4"
                                placeholder="Beskriv felet..."
                                onChange={(event) => {
                                    event.preventDefault();
                                    store.dispatch({
                                        type: 'UPDATE_ADD_FAULT_REPORT_FORM',
                                        data: event.target.value,
                                        inputField: 'description'
                                    })
                                }} />
                        </fieldset>
                        <input className="btn-primary" type="submit" value="Skicka" />
                        <button className="btn-link" onClick={(event) => {
                            event.preventDefault();
                            store.dispatch({
                                type: 'CLEAN_ADD_FAULT_REPORT_FORM',
                            })
                        }}> Rensa</button>
                    </form>
                </div>
            </div >
        )
    }

    return function addPageComponent(props) {
        return (
            <AddPageContent {...props} />
        );
    }
}
