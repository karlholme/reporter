import React, { useEffect } from "react";
import _ from 'lodash';

import buttonMaker from '../../components/button'

import * as core from '../../core';

export default function () {

    const Button = buttonMaker();

    function DetailsContent({ state, triggerEvent }) {
        const { _id, header, status, createdOn, reporter, location, description } = core.getChosenFaultReport(state);

        return (
            <React.Fragment>
                <Button
                    type="back"
                    label="tillbaka till översikten"
                    onClick={function () {
                        triggerEvent({ name: 'BACK_PRESSED' })
                    }}
                >
                </Button>

                <div className="card">
                    <div className="d-flex flex-row align-items-center card-header">
                        <h2 className="flex-grow-1">{(_id || '') + '. ' + header}</h2>
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
                        <label>Plats:</label>
                        <p>{location}</p>
                        <p>{reporter}</p>
                        <label>Beskrivning:</label>
                        <p>{description}</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    return function DetailsComponent(props) {
        return (
            <DetailsContent {...props} />
        );
    }
}
