import React, { useEffect } from "react";
import serviceEndpoints from '../../../serviceEndpoints.json'
import inputMaker from '../../components/input';
import textAreaMaker from '../../components/textArea';
import dropDownMaker from '../../components/dropdown';
import buttonMaker from '../../components/button';
import spinnerMaker from '../../components/spinner';

import * as core from '../../core';
import * as serviceCallUtil from '../../serviceCallUtil';

export default function () {

    const Input = inputMaker();
    const TextArea = textAreaMaker();
    const Dropdown = dropDownMaker();
    const Button = buttonMaker();
    const Spinner = spinnerMaker();

    function AddPageContent({ state, triggerEvent }) {

        if (!serviceCallUtil.getServiceResponse(state, serviceEndpoints.getReporters)) {
            return (<div className="d-flex justify-content-center m-5"><Spinner /></div>);
        }

        return (
            <div className="card">
                <div className="card-header">
                    <h1 className="mb-1 mt-2">Lägg till ny felanmälan</h1>
                </div>
                <div className="card-block float-center">
                    <form onSubmit={function (e) {
                        e.preventDefault();
                        triggerEvent({ name: 'FORM_SUBMITTED' })
                    }}>
                        <div className="d-flex">
                            <Input
                                className="mt-2"
                                title={'Rubrik:'}
                                value={core.getFormField(state, 'addPage', 'header')}
                                placeholder="Kort sammanfattning av ärendet"
                                required
                                onChange={(event) => {
                                    event.preventDefault();
                                    triggerEvent({
                                        name: 'FORM_UPDATED',
                                        data: event.target.value,
                                        page: 'addPage',
                                        inputField: 'header'
                                    })
                                }} />
                            <Input
                                className="mt-2 mx-2"
                                title={'Fastighetsnummer:'}
                                value={core.getFormField(state, 'addPage', 'propertyNumber')}
                                type="number"
                                placeholder="t.ex. 750"
                                style={{ width: '13.2rem' }}
                                onChange={(event) => {
                                    event.preventDefault();
                                    triggerEvent({
                                        name: 'FORM_UPDATED',
                                        data: event.target.value,
                                        page: 'addPage',
                                        inputField: 'propertyNumber'
                                    })
                                }} />
                        </div>
                        <Input
                            className="m-1 mt-3"
                            value={core.getFormField(state, 'addPage', 'location')}
                            title={'Plats:'}
                            style={{ width: '300px' }}
                            placeholder="Plats där problemet uppstått"
                            onChange={(event) => {
                                event.preventDefault();
                                triggerEvent({
                                    name: 'FORM_UPDATED',
                                    data: event.target.value,
                                    page: 'addPage',
                                    inputField: 'location'
                                })
                            }} />
                        <Dropdown
                            className="m-1 mt-3"
                            style={{ width: '300px', height: '2.5rem' }}
                            title="Gård:"
                            value={core.getFormField(state, 'addPage', 'reporter')}
                            required
                            onChange={(event) => {
                                event.preventDefault();
                                triggerEvent({
                                    name: 'FORM_UPDATED',
                                    data: event.target.value,
                                    page: 'addPage',
                                    inputField: 'reporter'
                                })
                            }}
                            alternatives={core.getReporters(state).map((reporter) => reporter.reporter)}
                            placeholder="Välj din gård.."
                        />
                        <TextArea
                            className="m-1 mt-3"
                            value={core.getFormField(state, 'addPage', 'description')}
                            title="Beskrivning"
                            placeholder="Ge en så utförlig beskrivning av problemet som ni kan.."
                            required
                            onChange={(event) => {
                                event.preventDefault();
                                triggerEvent({
                                    name: 'FORM_UPDATED',
                                    data: event.target.value,
                                    page: 'addPage',
                                    inputField: 'description'
                                })
                            }} />
                        <div className="d-flex row">
                            <Button
                                label="Skicka"
                                type="submit"
                                spinner={!!serviceCallUtil.isCallingService(state, serviceEndpoints.addFaultReport)}
                                disabled={!!serviceCallUtil.isCallingService(state, serviceEndpoints.addFaultReport)}
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
