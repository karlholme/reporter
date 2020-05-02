import React, { useState } from "react";
import _ from 'lodash';

export default function () {
    const invalidInputBordeColor = getComputedStyle(document.documentElement).getPropertyValue('--input-invalid-border-color');
    const invalidInputBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--input-invalid-background-color');

    function InputContent({
        title,
        className,
        value,
        type = 'text',
        style = { width: '300px' },
        placeholder,
        onChange,
        required
    }) {
        const [invalid, setInvalid] = useState(false);
        return (
            <fieldset className={className} style={{ position: 'relative' }}>
                {title && <label className="label">{title}</label>}
                {(title && required) && (<span style={{ marginLeft: '5px', color: invalidInputBordeColor }}>*</span>)}
                {(!title && required) && (
                    <div style={{
                        marginLeft: '5px',
                        color: invalidInputBordeColor,
                        position: 'absolute',
                        top: '3px',
                        right: '5px'
                    }}>*</div>
                )}
                <input
                    value={value}
                    type={type}
                    style={_.extend({}, style,
                        invalid ? {
                            borderBottomColor: invalidInputBordeColor,
                            backgroundColor: invalidInputBackgroundColor
                        } : null)}
                    placeholder={placeholder}
                    onChange={function (e) {
                        e.preventDefault();
                        onChange(e)
                        setInvalid(false)
                    }}
                    required={required}
                    onInvalid={function (e) {
                        setInvalid(true);
                    }}
                />

            </fieldset>
        );
    }

    return function Input(props) {
        return <InputContent {...props} />
    }
}