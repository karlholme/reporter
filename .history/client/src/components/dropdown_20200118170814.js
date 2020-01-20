import React from "react";
import { Select, MenuItem } from '@material-ui/core';

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
                <Select
                    displayEmpty
                    placeholder={placeholder}
                    id="label"
                    value={value || placeholder}
                    onChange={onChange}>
                    {[<MenuItem key={placeholder} value="placeholder" disabled>
                        {placeholder}
                    </MenuItem>]
                        .concat(alternatives.map((alternative) => {
                            return <MenuItem
                                key={alternative}
                                value={alternative}>
                                {alternative}
                            </MenuItem>
                        }))}
                </Select>
            </fieldset>
        );
    }

    return function Dropdown(props) {
        return <DropdownContent {...props} />
    }
}