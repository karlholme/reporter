import React from "react";

export default function () {
    function ButtonContent({
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
                onClick={onChange} />
        );
    }

    return function Button(props) {
        return <ButtonContent {...props} />
    }
}