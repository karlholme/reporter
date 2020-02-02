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
            return <Spinner />;
        }

        return (
            <div className="card">
                <div className="card-header">
                    <h2>FELANMÄLAN</h2>
                </div>
                <div className="card-block float-center">
                    <form onSubmit={function (e) {
                        e.preventDefault();
                        triggerEvent({ name: 'FORM_SUBMITTED' })
                    }}>
                        <div className="d-flex">
                            <Input
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
                            <Input title={'Fastighetsnummer:'}
                                value={core.getFaultReportField(state, 'propertyNumber')}
                                type="number"
                                placeholder="Ex. 123"
                                style={{ width: '10rem' }}
                                onChange={(event) => {
                                    event.preventDefault();
                                    triggerEvent({
                                        name: 'FORM_UPDATED',
                                        data: event.target.value,
                                        inputField: 'propertyNumber'
                                    })
                                }} />
                        </div>
                        <Input value={core.getFaultReportField(state, 'location')}
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
                        <Dropdown title="Gård:"
                            value={core.getFaultReportField(state, 'reporter')}
                            onChange={(event) => {
                                event.preventDefault();
                                triggerEvent({
                                    name: 'FORM_UPDATED',
                                    data: event.target.value,
                                    inputField: 'reporter'
                                })
                            }}
                            alternatives={core.getReporters(state)}
                            placeholder={'Välj din gård..'}
                        />
                        <TextArea
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

                        <Button
                            label="Skicka"
                            type="submit"
                            spinner={!!core.isCallingService(state, serviceEndpoints.addFaultReport)}
                            disabled={!!core.isCallingService(state, serviceEndpoints.addFaultReport)}
                        />
                        <Button
                            type="link"
                            label={'Rensa'}
                            onClick={(event) => {
                                event.preventDefault();
                                triggerEvent({
                                    name: 'CLEAN_PRESSED',
                                })
                            }} />
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
