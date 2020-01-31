import React from "react";
import { Select, MenuItem } from '@material-ui/core';

export default function () {
    function DropdownContent({
        createdOn,
        header,
        location,
        description
    }) {
        return (
            <div key={faultReport.createdOn}>
                <h2>{faultReport.header}</h2>
                <p>{faultReport.createdOn}</p>
                <p>{faultReport.location}</p>
                <p>{faultReport.reporter}</p>
                <p>{faultReport.description}</p>
            </div>
        );
    }

    return function Dropdown(props) {
        return <DropdownContent {...props} />
    }
}