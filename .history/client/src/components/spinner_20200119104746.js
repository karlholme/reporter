import React from "react";

export default function () {
    function SpinnerContent({
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

    return function Spinner(props) {
        return <SpinnerContent {...props} />
    }
}