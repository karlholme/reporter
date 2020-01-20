import React from "react";

export default function () {
    function SpinnerContent({
        className = '',
        style = {},
    }) {
        return (
            <div
                className={loader + className}
                style={style}
                onClick={onChange}>
            </div>
        );
    }

    return function Spinner(props) {
        return <SpinnerContent {...props} />
    }
}