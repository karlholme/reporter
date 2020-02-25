import React, { useState } from "react";
import * as core from '../core';

export default function () {
    function ClickableCardContent({
        className,
        id,
        faultReport,
        onClick,
    }) {
        const [open, setOpen] = useState(false);

        return (
            <div key={id}
                className={'info-card ' + className}>
                <div onClick={() => onClick()}
                    className="d-flex flex-row align-items-center info-card-header">
                    <h2 className="h3 flex-grow-1">{id + '. ' + faultReport.header}</h2>
                    <div>{faultReport.priority || '-'}</div>
                </div>
                <div className="d-flex">
                    <div className="m-2"
                        style={{
                            width: '60%'
                        }}>
                        <label>Beskrivning:</label>
                        <div className="ml-1"
                            style={{
                                display: 'block',
                                whiteSpace: open ? '' : 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                transition: 'height 0.15s ease-out'
                            }}>
                            {faultReport.description || '-'}
                        </div>
                    </div>
                    <div className="px-4 py-2 d-flex flex-column">
                        <div className="text-nowrap pl-1">
                            {faultReport.status || '-'}
                        </div>
                        <label className="text-nowrap">
                            {faultReport.reporter}
                        </label>
                        <div className="text-nowrap pl-1">
                            {core.formatDate(faultReport.createdOn) || '-'}
                        </div>
                        {open &&
                            <React.Fragment>
                                <label className="text-nowrap">
                                    Fastighetsnummer:
                            </label>
                                <div className="text-nowrap pl-1">
                                    {faultReport.propertyNumber || '-'}
                                </div>
                                <label className="text-nowrap">
                                    Plats:
                                </label>
                                <div className="text-nowrap pl-1">
                                    {faultReport.location || '-'}
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
                <div
                    onClick={function () {
                        setOpen(!open);
                    }}
                    className="info-card-footer">
                    {open
                        ? <i style={{ fontSize: '1rem' }} className="material-icons">keyboard_arrow_down</i>
                        : <i style={{ fontSize: '1rem' }} className="material-icons">keyboard_arrow_up</i>
                    }
                </div>
            </div >
        );
    }

    return function ClickableCard(props) {
        return <ClickableCardContent {...props} />
    }
}