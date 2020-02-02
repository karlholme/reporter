import React, { useEffect } from "react";
import * as requestProvider from '../requestProvider'
import serviceEndpoints from '../../serviceEndpoints.json'
import inputMaker from '../components/input';
import textAreaMaker from '../components/textArea';
import dropDownMaker from '../components/dropdown';
import buttonMaker from '../components/button';
import spinnerMaker from '../components/spinner';

export default function () {

    const Input = inputMaker();
    const TextArea = textAreaMaker();
    const Dropdown = dropDownMaker();
    const Button = buttonMaker();
    const Spinner = spinnerMaker();

    function AddPageContent({ store, state }) {

        useEffect(() => {
            store.dispatch({
                type: 'CALL_SERVICE',
                request: { hej: 1 },
                service: serviceEndpoints.getReporters
            })
        }, []);

        if (!state.serviceCalls[serviceEndpoints.getReporters].response) {
            return <Spinner />;
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
                            <Input title={'Fastighetsnummer:'}
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
                            title={'Plats:'}
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
                        <Dropdown title="G�rd:"
                            value={state.addReport.reporter}
                            onChange={(event) => {
                                event.preventDefault();
                                store.dispatch({
                                    type: 'UPDATE_ADD_FAULT_REPORT_FORM',
                                    data: event.target.value,
                                    inputField: 'reporter'
                                })
                            }}
                            alternatives={state.serviceCalls[serviceEndpoints.getReporters].response.map((reporter) => reporter.reporter)}
                            placeholder={'V�lj din g�rd..'}
                        />
                        <TextArea
                            value={state.addReport.description}
                            title="Beskrivning"
                            placeholder="Beskriv felet..."
                            onChange={(event) => {
                                event.preventDefault();
                                store.dispatch({
                                    type: 'UPDATE_ADD_FAULT_REPORT_FORM',
                                    data: event.target.value,
                                    inputField: 'description'
                                })
                            }} />

                        <Button
                            className="btn-primary"
                            type="submit"
                            value="Skicka"
                            spinner={true}
                        />
                        <Button
                            value={'Rensa'}
                            className="btn-link"
                            onClick={(event) => {
                                event.preventDefault();
                                store.dispatch({
                                    type: 'CLEAN_ADD_FAULT_REPORT_FORM',
                                })
                            }} />
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