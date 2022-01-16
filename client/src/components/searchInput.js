import React, { useState } from "react";
import _ from 'lodash';
import inputMaker from './input'

export default function () {
    const Input = inputMaker();

    function InputContent({
        title,
        className,
        placeholder,
        onChange,
        inputStyle,
        debounceTime = 500
    }) {
        const [searchValue, setSearchValue] = useState('');
        const [timer, setTimer] = useState(null);

        return (
            <fieldset className={className} style={{ position: 'relative' }}>
                {title && <label className="label">{title}</label>}
                <Input
                    value={searchValue}
                    style={inputStyle}
                    placeholder={placeholder}
                    onChange={function (e) {
                        const tempSearchValue = e.target.value;
                        setSearchValue(tempSearchValue);
                        if (timer) {
                            clearTimeout(timer);
                        }
                        setTimer(setTimeout(function () {
                            onChange(tempSearchValue)
                        }, debounceTime))
                    }}
                />
            </fieldset>
        );
    }

    return function Input(props) {
        return <InputContent {...props} />
    }
}