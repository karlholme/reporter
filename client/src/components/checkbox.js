import React, { useState } from "react";
import _ from 'lodash';

export default function () {
    const invalidInputBordeColor = getComputedStyle(document.documentElement).getPropertyValue('--input-invalid-border-color');
    const invalidInputBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--input-invalid-background-color');

    function CheckboxContent({
        label,
        checked,
        className,
        style,
        onChange,
        required
    }) {
        const [invalid, setInvalid] = useState(false);
        const [hover, setHover] = useState(false);
        const id = 'checkbox' + label;

        function getHoverOpacity(hover, checked) {
            if (checked) {
                return '1'
            } else if (hover) {
                return '0.2'
            } else {
                return '0';
            }
        }

        return (
            <fieldset className={className} style={{ position: 'relative', cursor: "pointer" }}>
                <input
                    id={id}
                    checked={checked || false}
                    style={{ display: 'none' }}
                    type="checkbox"
                    onChange={function (e) {
                        e.preventDefault();
                        onChange(e.target.checked)
                        setInvalid(false)
                    }}
                    required={required}
                    onInvalid={function (e) {
                        setInvalid(true);
                    }}
                />
                <div className="d-flex"
                    onMouseEnter={function () {
                        setHover(true);
                    }}
                    onMouseLeave={function () {
                        setHover(false);
                    }}
                    onClick={function () {
                        onChange(!checked)
                        setInvalid(false)
                    }}>
                    <div style={{
                        border: '2px solid var(--dark-night)',
                        width: '20px',
                        height: '20px',
                        borderRadius: '3px',
                        boxShadow: '0px 0.1rem 0px rgba(0, 0, 0, 0.1)',
                        position: 'relative'
                    }}>
                        <svg
                            style={{
                                opacity: getHoverOpacity(hover, checked),
                                transition: 'opacity 0.05s ease',
                                fill: 'var(--dark-night)',
                                filter: 'drop-shadow(0px 0.1rem 0px rgba(0, 0, 0, 0.1))',
                                position: 'absolute',
                                top: '2px',
                                left: '2px'
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24" >
                            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                        </svg>
                    </div>
                    <label style={{
                        fontWeight: '500',
                        verticalAlign: 'text-bottom',
                        color: 'var(--dark-night)',
                        textShadow: '0px 0.1rem 0px rgba(0, 0, 0, 0.1)',
                        cursor: "pointer",
                        paddingTop: '1px'
                    }} className="pl-1">{label}</label>
                    {required && (<span style={{ marginLeft: '5px', color: invalidInputBordeColor }}>*</span>)}
                </div>
            </fieldset>
        );
    }

    return function Checkbox(props) {
        return <CheckboxContent {...props} />
    }
}