import React from "react";

export default function () {
    function TextAreaContent({
        title,
        className,
        placeHolder,
        value,
        onChange,
    }) {
        return (
            <fieldset className={className}>
                <label>{title}</label>
                <textarea
                    value={value}
                    type="text"
                    maxLength="700"
                    rows="4"
                    placeholder={placeHolder}
                    onChange={onChange} />
            </fieldset>
        );
    }

    return function TextArea(props) {
        return <TextAreaContent {...props} />
    }
}