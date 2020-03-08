import React, { useState } from "react";
import _ from 'lodash';
import * as serviceEndpoints from '../../../serviceEndpoints.json';

import buttonMaker from '../../components/button'
import spinnerMaker from '../../components/spinner'
import textAreaEditorMaker from '../../components/textAreaEditor'
import textAreaMaker from '../../components/textArea'
import alertMaker from '../../components/alert'
import dropDownMaker from '../../components/dropdown'

import * as core from '../../core';

export default function () {

    const Alert = alertMaker();
    const Button = buttonMaker();
    const Spinner = spinnerMaker();
    const TextArea = textAreaMaker();
    const Dropdown = dropDownMaker();
    const TextAreaEditor = textAreaEditorMaker();

    function DetailsContent({ state, triggerEvent }) {
        const { _id,
            header,
            status,
            createdOn,
            reporter,
            location,
            description,
            propertyNumber,
            comments } = core.getChosenFaultReport(state);

        return (
            <React.Fragment>
                <Button
                    type="back"
                    label="Tillbaka till översikten"
                    onClick={function () {
                        triggerEvent({ name: 'BACK_PRESSED' })
                    }} />

                {core.getServiceResponse(state, serviceEndpoints.updateFaultReport)
                    && core.getServiceResponse(state, serviceEndpoints.updateFaultReport).id === _id
                    && (
                        <Alert
                            type="success"
                            header={core.translateFaultReportField(core.getServiceResponse(state, serviceEndpoints.updateFaultReport).updatedField) + ' uppdaterad!'}
                        />
                    )
                }

                <div className="card mt-0">
                    <div className="card-header d-flex flex-row align-items-center">
                        <h2 className="flex-grow-1">{_id + '. ' + header}</h2>
                        <div className="d-flex flex-column text-right ml-1">
                            <span className="text-nowrap ml-2 text-white">
                                {status}
                            </span>
                            <span className="text-nowrap ml-2 text-white">
                                {core.formatDate(createdOn)}
                            </span>
                            <span className="text-nowrap ml-3 font-weight-bold text-white">
                                {reporter}
                            </span>
                        </div>
                    </div>
                    <div className="card-block">
                        <div className="mb-4">
                            <h3 className="h4">Detaljer:</h3>
                            <div className="d-flex pl-2">
                                <div className="font-weight-bold">
                                    <p className="mb-1">Gård:</p>
                                    <p className="mb-1">Plats:</p>
                                    <p className="mb-1">Rapporterat:</p>
                                    <p className="mb-1">Fast. nr:</p>
                                    <p className="mb-1">Prioritet</p>
                                    <p className="mb-1">Status:</p>
                                </div>

                                <div className="ml-5">
                                    <p className="mb-1">{reporter || '-'}</p>
                                    <p className="mb-1">{location || '-'}</p>
                                    <p className="mb-1">{core.formatDate(createdOn) || '-'}</p>
                                    <p className="mb-1">{propertyNumber || '-'}</p>
                                    <p className="mb-1">{false || '-'}</p>
                                    <p className="mb-1">
                                        <Dropdown
                                            className="m-1"
                                            style={{ width: '300px' }}
                                            value={core.getFormField(state, core.pages.details, 'currentStatus')}
                                            onChange={(event) => {
                                                event.preventDefault();
                                                triggerEvent({
                                                    name: 'FORM_UPDATED',
                                                    data: event.target.value,
                                                    page: core.pages.details,
                                                    inputField: 'currentStatus'
                                                })
                                            }}
                                            alternatives={core.getStatuses(state).map((status) => status.status)}
                                            placeholder={'Välj din gård..'}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="h4">Beskrivning:</h3>
                            <div className="pl-1">
                                <TextAreaEditor
                                    initialValue={description}
                                    value={core.getFormField(state, core.pages.details, 'description' + _id)}
                                    textUpdated={(newValue) => {
                                        triggerEvent({
                                            name: 'UPDATE-DESCRIPTION',
                                            id: _id,
                                            newValue: newValue
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="h4 mb-3">Kommentarer:</h3>
                            <div className="pl-2">
                                {!_.isEmpty(comments)
                                    ? comments.map(function (comment) {
                                        return (
                                            <div className="mb-4" key={comment._id}>
                                                <div className="mb-1" style={{ fontStyle: 'italic' }}>
                                                    <strong>
                                                        <i className="align-items-baseline" style={{
                                                            fontSize: '1rem',
                                                        }} className="material-icons">mode_comment</i>
                                                        {' ' + comment.reporter}
                                                    </strong>
                                                    {' lade till en kommentar - '
                                                        + core.formatDate(comment.createdOn)
                                                        + ':'}
                                                </div>
                                                <hr />
                                                <div className="d-flex">
                                                    <div className="flex-grow-1">
                                                        {comment.message}
                                                    </div>
                                                    <div className="">
                                                        <Button
                                                            type="delete"
                                                            onClick={function () {
                                                                triggerEvent({
                                                                    name: 'REMOVE-COMMENT',
                                                                    data: {
                                                                        faultReportId: _id,
                                                                        commentId: comment._id
                                                                    }
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                    : (<div className="mb-3 font-italic">Inga kommentarer har lagts till än..</div>)
                                }
                            </div>
                            <TextArea
                                className="m-1"
                                value={core.getFormField(state, core.pages.details, 'addComment' + _id)}
                                title="Lägg till kommentar:"
                                placeholder="Kommentar..."
                                onSaveAction={function () {
                                    triggerEvent({
                                        name: 'ADD-COMMENT-CLICKED',
                                        id: _id,
                                        message: core.getFormField(state, core.pages.details, 'addComment')
                                    })
                                }}
                                onClearAction={function () {
                                    triggerEvent({
                                        name: 'CLEAR-COMMENT-PRESSED'
                                    })
                                }}
                                onChange={function (event) {
                                    event.preventDefault();
                                    triggerEvent({
                                        name: 'FORM_UPDATED',
                                        data: event.target.value,
                                        page: core.pages.details,
                                        inputField: 'addComment' + _id
                                    })
                                }} />

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    return function DetailsComponent(props) {
        if (core.isCallingService(props.state, serviceEndpoints.getFaultReports)) {
            return <Spinner />
        }
        return (
            <DetailsContent {...props} />
        );
    }
}
