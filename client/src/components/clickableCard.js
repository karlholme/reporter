import React, { useState } from 'react';
import * as core from '../core';
import dropDownMaker from '../components/dropdown';
import buttonMaker from '../components/button';
import spinnerMaker from '../components/spinner';
import textAreaEditorMaker from '../components/textAreaEditor';
import textAreaMaker from '../components/textArea';
import alertMaker from '../components/alert';
import commentMaker from '../components/comment'

export default function () {
    function ClickableCardContent({
        className,
        id,
        faultReport,
        onClick,
        state
    }) {
        const [open, setOpen] = useState(false);

        const Alert = alertMaker();
        const Button = buttonMaker();
        const Comment = commentMaker();
        const Spinner = spinnerMaker();
        const TextArea = textAreaMaker();
        const Dropdown = dropDownMaker();
        const TextAreaEditor = textAreaEditorMaker();

        const {
            _id,
            header,
            reporter,
            location,
            propertyNumber,
            createdOn,
            priority,
            description,
            status,
            comments
        } = faultReport;

        return (
            <div key={id} className={'info-card ' + className}>
                <div
                    onClick={() => onClick()}
                    className="d-flex flex-row align-items-center info-card-header">
                    <h2 className="h3 flex-grow-1 mt-2 mb-1">{id + '. ' + header}</h2>
                    <div>{priority || '-'}</div>
                </div>
                <div className="mx-3 my-1">
                    <div className="d-flex mb-3">
                        <div className="flex-fill mr-4" style={{ width: '55%' }}>
                            <h3 className="h4 mb-2 mt-1">Beskrivning:</h3>
                            <p className="ml-2" style={!open ? {
                                display: '-webkit-box',
                                WebkitLineClamp: '5',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            } : {}}>{description}</p>
                        </div>
                        <div className="" style={{ width: '40%' }}>
                            <h3 className="h4 mt-1 mb-2">Detaljer:</h3>
                            <div className="d-flex">
                                <div className="font-weight-bold ml-1">
                                    <p className="mb-1">Status:</p>
                                    <p className="mb-1">Rapporterat:</p>
                                    <p className="mb-1">Gård:</p>
                                    <p className="mb-1 ">Plats:</p>
                                    {open && (
                                        <React.Fragment>
                                            <p className="mb-1">Fast. nr:</p>
                                            <p className="mb-1">Prioritet:</p>
                                        </React.Fragment>
                                    )}
                                </div>

                                <div className="ml-5">
                                    <div className="ml-1">
                                        <p className="mb-1">{status || '-'}</p>
                                        <p className="mb-1">{core.formatDate(createdOn) || '-'}</p>
                                        <p className="mb-1">{reporter || '-'}</p>
                                        <p className="mb-1">{location || '-'}</p>
                                        {open && (
                                            <React.Fragment>
                                                <p className="mb-1">{propertyNumber || '-'}</p>
                                                <p className="mb-1">{priority || '-'}</p>
                                            </React.Fragment>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {open &&
                        <div className="">
                            <h3 className="h4 mt-2 mb-3">Kommentarer:</h3>
                            {(!_.isEmpty(comments) ? (
                                comments.map(function (comment) {
                                    return (
                                        <Comment
                                            key={comment._id}
                                            comment={comment}
                                            triggerEvent={
                                                function () {
                                                    triggerEvent({
                                                        name: "REMOVE-COMMENT",
                                                        data: {
                                                            faultReportId: _id,
                                                            commentId: comment._id
                                                        }
                                                    })
                                                }
                                            }
                                        />)
                                })) : (
                                    <div className="mb-3 font-italic">
                                        Inga kommentarer har lagts till än..
                                    </div>
                                ))}
                        </div>
                    }
                </div>


                <div
                    onClick={function () {
                        setOpen(!open);
                    }}
                    className="info-card-footer">
                    {open ? (
                        <i style={{ fontSize: '1rem' }} className="material-icons">
                            keyboard_arrow_down
                        </i>
                    ) : (
                            <i style={{ fontSize: '1rem' }} className="material-icons">
                                keyboard_arrow_up
                            </i>
                        )}
                </div>
            </div>
        );
    }

    return function ClickableCard(props) {
        return <ClickableCardContent {...props} />;
    };
}
