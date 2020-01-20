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
            <button
                type={type}
                style={style}
                onClick={onChange} />
        );
    }

    return function Button(props) {
        return <ButtonContent {...props} />
    }
}