import React from "react";

export default function () {
    function SpinnerContent({
        className = '',
        style = {},
        onChange
    }) {
        return (
            <div className={'lds-ring' + className}
                style={style}
                onClick={onChange}><div></div><div></div><div></div><div></div></div>
        );
    }

    return function Spinner(props) {
        return <SpinnerContent {...props} />
    }
}