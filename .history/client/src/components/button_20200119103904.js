import React from "react";

export default function () {
    function ButtonContent({
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

    return function Button(props) {
        return <ButtonContent {...props} />
    }
}