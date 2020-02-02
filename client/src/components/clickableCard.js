import React from "react";
import * as core from '../core';

export default function () {
    function DropdownContent({
        id,
        createdOn,
        header,
        location,
        description,
        reporter,
        status,
        onClick
    }) {
        return (
            <div
                key={createdOn + header}
                className="info-card"
                onClick={() => onClick()}>
                <div className="d-flex flex-row align-items-center info-card-header">
                    <h2 className="flex-grow-1">{(id || '') + '. ' + header}</h2>
                    <div className="d-flex flex-column text-right ml-1">
                        <span className="text-nowrap ml-2">
                            {status}
                        </span>
                        <span className="text-nowrap ml-2">
                            {core.formatDate(createdOn)}
                        </span>
                        <span className="text-nowrap ml-3 font-weight-bold">
                            {reporter}
                        </span>
                    </div>
                </div>
                <div className="px-4 py-2">
                    <label>Beskrivning:</label>
                    <p>{description}</p>
                    <label>Plats:</label>
                    <p>{location}</p>
                </div>
            </div>
        );
    }

    return function Dropdown(props) {
        return <DropdownContent {...props} />
    }
}