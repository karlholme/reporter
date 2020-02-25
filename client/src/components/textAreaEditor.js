import React, { useState, useEffect } from "react";
import buttonMaker from './button';

export default function () {
    function TextAreaContent({
        title,
        className,
        placeHolder,
        initialValue,
        textUpdated
    }) {
        const [editing, setEditing] = useState(false);
        const [hover, setHover] = useState(false);
        const [value, setValue] = useState(initialValue);
        const Button = buttonMaker();

        return (
            <fieldset className={className}>
                {title && <label>{title}</label>}

                {editing ?
                    (
                        <div style={{ maxWidth: '523px' }}>
                            <textarea
                                value={value}
                                autoFocus
                                type="text"
                                maxLength="700"
                                rows="4"
                                placeholder={placeHolder}
                                onChange={function (event) {
                                    setValue(event.target.value)
                                }}
                            />

                            <div className="d-flex align-items-center justify-content-end">
                                <Button
                                    type='small'
                                    onClick={function () {
                                        textUpdated(value)
                                    }}
                                    icon="check"
                                />

                                <Button
                                    type='small'
                                    onClick={function () {
                                        setEditing(false);
                                        setValue(initialValue);
                                    }}
                                    icon="close"
                                />
                            </div>
                        </div>
                    )
                    : <div className=""
                        style={{
                            position: 'relative',
                            borderRadius: '0.2rem',
                            padding: '0.2rem 2rem 0.2rem 0.1rem',
                            maxWidth: '523px',
                            cursor: 'text',
                            border: hover ? 'solid 1px rgba(9, 30, 66, 0.13)' : 'solid 1px rgba(9, 30, 66, 0)'
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onClick={function () {
                            setEditing(true);
                        }}>
                        {value}
                        <span>
                            {hover &&
                                <i style={{
                                    fontSize: '1.2rem',
                                    backgroundColor: 'rgba(9, 30, 66, 0.13)',
                                    position: 'absolute',
                                    right: '0',
                                    top: '0',
                                    height: '100%',
                                    borderRadius: '0 0.2rem 0.2rem 0',
                                    cursor: 'pointer'
                                }} className="material-icons">edit</i>
                            }
                        </span>
                    </div>
                }
            </fieldset >
        );
    }

    return function TextArea(props) {
        return <TextAreaContent {...props} />
    }
}