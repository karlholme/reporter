import React from "react";

export default function () {
    function SpinnerContent({
        className = 'loader',
        style = {},
        onChange
    }) {
        return (
            <div
                className={className}
                style={style}
                onClick={onChange}>
            </div>
        );
    }

    return function Spinner(props) {
        return <SpinnerContent {...props} />
    }
}