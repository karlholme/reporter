import React from "react";
import { Select, MenuItem } from '@material-ui/core';

export default function () {
    function DropdownContent({
        title,
        value,
        onChange,
        alternatives,
    }) {
        return (
            <fieldset>
                <label id="label">{title}</label>
                <Select
                    displayEmpty
                    id="label"
                    value={value}
                    onChange={onChange}>
                    {alternatives.map((alternative) => {
                        return <MenuItem
                            key={alternative}
                            value={alternative}>
                            {alternative}
                        </MenuItem>
                    })}
                </Select>
            </fieldset>
        );
    }

    return function Dropdown(props) {
        return <DropdownContent {...props} />
    }
}