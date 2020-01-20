import React from "react";

export default function () {
    function ButtonContent({
        value,
        className,
        type,
        style,
        onChange
    }) {
        return (
            <button
                className={className}
                type={type}
                style={style}
                onClick={onChange}>
                {value}
            </button>
        );
    }

    return function Button(props) {
        return <ButtonContent {...props} />
    }
}