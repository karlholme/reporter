import React from "react";

export default function () {
    function AlertContent({
        header,
        body,
        type,
        className
    }) {
        const typeStyle = {
            error: {
                background: 'var(--dark-pink)'
            },
            success: {
                background: 'var(--dark-night)'
            },
            info: {
                background: 'var(--minigrisrosa)'
            }
        }

        return (
            <div style={{
                ...typeStyle[type],
                border: '3px solid rgba(0, 0, 0, 0.3)',
                width: '100%',
                color: 'white',
                borderRadius: '0.2rem'
            }}
                className={'p-2 my-1 ' + className}>
                <strong>{header}</strong>
                {body && (' - ' + body)}
            </div>
        );
    }


    return function Alert(props) {
        return <AlertContent {...props} />
    }
}