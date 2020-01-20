import React from "react";
import { Select, MenuItem, InputLabel } from '@material-ui/core';

export default function () {
    function DropdownContent({
        title,
        value,
        onChange,
        alternatives,
        placeholder
    }) {
        return (
            <fieldset>
                <label id="label">{title}</label>
                <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                <Select
                    placeholder={placeholder}
                    labelId="label"
                    id="simple-select"
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