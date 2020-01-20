import React from "react";
import spinnerMaker from '../components/spinner';

const Spinner = spinnerMaker();

export default function () {
    function ButtonContent({
        value,
        className,
        type,
        style,
        disabled,
        spinner,
        onChange
    }) {
        return (
            <button
                className={className}
                disabled={disabled}
                type={type}
                style={style}
                onClick={onChange}>
                {value}
                {spinner &&
                    <Spinner />
                }
            </button>
        );
    }

    return function Button(props) {
        return <ButtonContent {...props} />
    }
}