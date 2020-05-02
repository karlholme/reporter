import React, { useState } from "react";
import buttonMaker from './button';

export default function () {

    const Button = buttonMaker();
    const invalidInputBordeColor = getComputedStyle(document.documentElement).getPropertyValue('--input-invalid-border-color');
    const invalidInputBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--input-invalid-background-color');

    function TextAreaContent({
        title,
        className,
        placeholder,
        style,
        value,
        required,
        onChange,
        onSaveAction,
        onClearAction
    }) {
        const [invalid, setInvalid] = useState(false);
        return (
            <fieldset style={{ maxWidth: '30rem' }} className={className}>
                <div className="d-flex">
                    <label className="label">{title}</label>
                    {required && (<span style={{ marginLeft: '5px', color: invalidInputBordeColor }}>*</span>)}
                </div>
                <textarea
                    style={_.extend({}, style,
                        invalid ? {
                            borderBottomColor: invalidInputBordeColor,
                            backgroundColor: invalidInputBackgroundColor
                        } : null)}
                    value={value}
                    type="text"
                    maxLength="700"
                    placeholder={placeholder}
                    rows="4"
                    required={required}
                    onInvalid={function (e) {
                        setInvalid(true);
                    }}
                    onChange={function (e) {
                        onChange(e)
                        setInvalid(false)
                    }} />

                {onSaveAction &&
                    <div className="d-flex align-items-center justify-content-end">
                        <Button
                            className="mr-1"
                            type='small'
                            onClick={onSaveAction}
                            icon="check"
                        />
                        {onClearAction &&
                            <Button
                                type='small'
                                onClick={onClearAction}
                                icon="close"
                            />
                        }
                    </div>
                }

            </fieldset>
        );
    }

    return function TextArea(props) {
        return <TextAreaContent {...props} />
    }
}