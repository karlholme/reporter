import React, { useEffect } from "react";
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

    function AddPageContent({ state, triggerEvent }) {

        useEffect(() => {
            triggerEvent({ name: 'PAGE_MOUNTED' })
        }, []);

        if (!core.getServiceResponse(state, serviceEndpoints.getReporters)) {
            return (<div className="d-flex justify-content-center m-5"><Spinner /></div>);
        }

        return (
            <div className="card">
                <div className="card-header">
                    <h1>Lägg till ny felanmälan</h1>
                </div>
                <div className="card-block float-center">
                    <form onSubmit={function (e) {
                        e.preventDefault();
                        triggerEvent({ name: 'FORM_SUBMITTED' })
                    }}>
                        <div className="d-flex mt-1">
                            <Input
                                className="m-1"
                                title={'Rubrik'}
                                value={core.getFaultReportField(state, 'header')}
                                placeholder="Rubrik:"
                                onChange={(event) => {
                                    event.preventDefault();
                                    triggerEvent({
                                        name: 'FORM_UPDATED',
                                        data: event.target.value,
                                        inputField: 'header'
                                    })
                                }} />
                            <Input
                                className="mx-2 my-1"
                                title={'Fastighetsnummer:'}
                                value={core.getFaultReportField(state, 'propertyNumber')}
                                type="number"
                                placeholder="Ex. 123"
                                style={{ width: '13.2rem' }}
                                onChange={(event) => {
                                    event.preventDefault();
                                    triggerEvent({
                                        name: 'FORM_UPDATED',
                                        data: event.target.value,
                                        inputField: 'propertyNumber'
                                    })
                                }} />
                        </div>
                        <Input
                            className="m-1"
                            value={core.getFaultReportField(state, 'location')}
                            title={'Plats:'}
                            style={{ width: '300px' }}
                            placeholder="Tex Köket"
                            onChange={(event) => {
                                event.preventDefault();
                                triggerEvent({
                                    name: 'FORM_UPDATED',
                                    data: event.target.value,
                                    inputField: 'location'
                                })
                            }} />
                        <Dropdown
                            className="m-1"
                            style={{ width: '300px' }}
                            title="Gård:"
                            value={core.getFaultReportField(state, 'reporter')}
                            onChange={(event) => {
                                event.preventDefault();
                                triggerEvent({
                                    name: 'FORM_UPDATED',
                                    data: event.target.value,
                                    inputField: 'reporter'
                                })
                            }}
                            alternatives={core.getReporters(state).map((reporter) => reporter.reporter)}
                            placeholder={'Välj din gård..'}
                        />
                        <TextArea
                            className="m-1"
                            value={core.getFaultReportField(state, 'description')}
                            title="Beskrivning"
                            placeholder="Beskriv felet..."
                            onChange={(event) => {
                                event.preventDefault();
                                triggerEvent({
                                    name: 'FORM_UPDATED',
                                    data: event.target.value,
                                    inputField: 'description'
                                })
                            }} />
                        <div className="d-flex row">
                            <Button
                                label="Skicka"
                                type="submit"
                                spinner={!!core.isCallingService(state, serviceEndpoints.addFaultReport)}
                                disabled={!!core.isCallingService(state, serviceEndpoints.addFaultReport)}
                            />
                            <Button
                                className="pt-2 pr-1"
                                type="link"
                                label={'Rensa'}
                                onClick={(event) => {
                                    event.preventDefault();
                                    triggerEvent({
                                        name: 'CLEAN_PRESSED',
                                    })
                                }} />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return function addPageComponent(props) {
        return (
            <AddPageContent {...props} />
        );
    }
}
