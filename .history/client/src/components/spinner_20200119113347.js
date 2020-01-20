import React from "react";

export default function () {
    function SpinnerContent({
        className = '',
        style = {},
        onChange
    }) {
        return (
            <div class="lds-ring"><div>
                );
            }
        
    return function Spinner(props) {
        return <SpinnerContent {...props} />
                }
}