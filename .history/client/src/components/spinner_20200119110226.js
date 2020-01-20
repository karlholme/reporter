import React from "react";

export default function () {
    function SpinnerContent({
        className = '',
        style = {},
        onChange
    }) {
        return (
            <div
                className={'loader' + className}
                style={style}
                onClick={onChange}>
            </div>
        );
    }

    return function Spinner(props) {
        return <SpinnerContent {...props} />
    }
}