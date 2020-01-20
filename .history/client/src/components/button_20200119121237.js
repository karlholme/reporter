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
                <span style={{ display: 'flex' }}>
                    <span style={{ marginRight: '1rem' }}>{value}</span>
                    {spinner &&
                        <Spinner className="loaderSmall" />
                    }
                </span>
            </button>
        );
    }

    return function Button(props) {
        return <ButtonContent {...props} />
    }
}