import React, { useEffect } from "react";
import { Select, MenuItem } from '@material-ui/core';
import * as requestProvider from '../requestProvider'
import serviceEndpoints from '../../serviceEndpoints.json'
import inputMaker from '../components/input';
import textAreaMaker from '../components/textArea';
import dropDownMaker from '../components/dropdown';

export default function () {

    const Input = inputMaker();
    const TextArea = textAreaMaker();
    const Dropdown = dropDownMaker();

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
                    <h1>FELANM�LAN</h1>
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

                            <Input
                                title={'Rubrik'}
                                value={state.addReport.header}
                                placeholder="Rubrik:"
                                onChange={(event) => {
                                    event.preventDefault();
                                    store.dispatch({
                                        type: 'UPDATE_ADD_FAULT_REPORT_FORM',
                                        data: event.target.value,
                                        inputField: 'header'
                                    })
                                }} />

                            <Input
                                title={'Fastighetsnummer:'}
                                value={state.addReport.propertyNumber}
                                type="number"
                                placeholder="Ex. 123"
                                onChange={(event) => {
                                    event.preventDefault();
                                    store.dispatch({
                                        type: 'UPDATE_ADD_FAULT_REPORT_FORM',
                                        data: event.target.value,
                                        inputField: 'propertyNumber'
                                    })
                                }} />
                        </div>


                        <Input value={state.addReport.location}
                            style={{ width: '300px' }}
                            placeholder="Tex K�ket"
                            onChange={(event) => {
                                event.preventDefault();
                                store.dispatch({
                                    type: 'UPDATE_ADD_FAULT_REPORT_FORM',
                                    data: event.target.value,
                                    inputField: 'location'
                                })
                            }} />

                        <fieldset>
                            <label id="demo-simple-select-label">G�rd:</label>
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
                </div >
            </div >
        )
    }

    return function addPageComponent(props) {
        return (
            <AddPageContent {...props} />
        );
    }
}
