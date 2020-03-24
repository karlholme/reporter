import React from "react";

export default function () {
    function DropdownContent({
        title,
        className,
        style,
        value,
        onChange,
        alternatives = [],
    }) {
        return (
            <fieldset className={className}>
                {title &&
                    <label className="mr-1" id={title}>{title}</label>
                }
                <select
                    style={style}
                    id={title}
                    value={value || ''}
                    onChange={onChange}>
                    <option
                        disabled
                        style={{ display: 'none' }}
                        value="">
                        {'Välj gård:'}
                    </option>
                    {alternatives.map((alternative) => {
                        return <option key={alternative} value={alternative}>{alternative}</option>
                    })}
                </select>
            </fieldset>
        );
    }

    return function Dropdown(props) {
        return <DropdownContent {...props} />
    }
}