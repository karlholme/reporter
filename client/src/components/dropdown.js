import React, { useState } from "react";
import _ from 'lodash';

export default function () {
    const invalidInputBordeColor = getComputedStyle(document.documentElement).getPropertyValue('--input-invalid-border-color');
    const invalidInputBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--input-invalid-background-color');

    function DropdownContent({
        title,
        className,
        style,
        value,
        onChange,
        placeholder,
        required,
        alternatives = [],
    }) {
        const [invalid, setInvalid] = useState(false);
        return (
            <fieldset className={className}>
                {title &&
                    <label className="mr-1" id={title}>{title}</label>
                }
                <select
                    style={_.extend({},
                        style,
                        !value ? { color: '#757575' } : null,
                        invalid ? {
                            borderBottomColor: invalidInputBordeColor,
                            backgroundColor: invalidInputBackgroundColor
                        } : null)
                    }
                    id={title}
                    value={value || ''}
                    required={required}
                    onChange={function (e) {
                        onChange(e)
                        setInvalid(false)
                    }}
                    onInvalid={function (e) {
                        setInvalid(true);
                    }}>
                    <option
                        disabled
                        style={{ display: 'none' }}
                        value="">
                        {placeholder}
                    </option>
                    {alternatives.map((alternative) => {
                        return <option key={alternative} value={alternative}>{alternative}</option>
                    })}
                </select>
            </fieldset >
        );
    }

    return function Dropdown(props) {
        return <DropdownContent {...props} />
    }
}