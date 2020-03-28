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
            comments,
            category
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
                            <table className="first-column-bold break-last-column" style={{
                                width: '100%',
                            }}>
                                <tbody>
                                    <tr>
                                        <td>Status:</td>
                                        <td>{status || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Rapporterat:</td>
                                        <td>{core.formatDate(createdOn) || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Gård:</td>
                                        <td>{reporter || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Plats:</td>
                                        <td>{core.truncateText(location, 20) || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Kategori:</td>
                                        <td>{category || '-'}</td>
                                    </tr>
                                    {open && (
                                        <React.Fragment>
                                            <tr>
                                                <td>Fast. nr:</td>
                                                <td>{propertyNumber || '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Prioritet:</td>
                                                <td>{priority || '-'}</td>
                                            </tr>
                                        </React.Fragment>

                                    )}
                                </tbody>
                            </table>
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
