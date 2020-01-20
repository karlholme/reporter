import React from "react";

export default function () {
    function InputContent({
        title,
        value,
        type = 'text',
        style = { width: '300px' },
        placeholder,
        onChange
    }) {
        return (
            <fieldset>
                <label>{title}</label>
                <input
                    value={value}
                    type={type}
                    style={style}
                    placeholder={placeholder}
                    onChange={onChange} />
            </fieldset>
        );
    }

    return function Input(props) {
        return <InputContent {...props} />
    }
}