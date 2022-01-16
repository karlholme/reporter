import React, { useState, useRef } from "react";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import inputMaker from './input'
import * as core from '../core';

export default function DatePickerMaker() {
    const Input = inputMaker();

    function DatePickerContent({
        label,
        fromDate,
        toDate,
        onFromDateChosen,
        onToDateChosen
    }) {
        const [fromInFocus, setFromInFocus] = useState(false);
        const [toInFocus, setToInFocus] = useState(false);

        let fromDateComponent = useRef(null);
        let toDateComponent = useRef(null);

        const dayPickerWrapperStyle = {
            zIndex: 100,
            position: 'absolute',
            top: '2.1rem',
            left: '0.1rem',
            backgroundColor: 'white',
            border: '2px solid var(--dark-night)',
            boxShadow: '0 0 0.4rem var(--dark-night)',
            borderRadius: '1rem',
            opacity: fromInFocus ? 1 : 0
        };

        return (
            <div>
                <div>
                    {label && <label className="label">{label}</label>}
                </div>
                <div style={{ display: 'flex', position: 'relative' }}>
                    <Input
                        value={fromDate ? core.formatDate(fromDate) : '-'}
                        style={{ width: '100px', height: '2rem' }}
                        onFocus={function () {
                            setFromInFocus(true);
                            fromDateComponent.focus();
                        }}
                    />
                    <div style={dayPickerWrapperStyle}
                        onBlur={function () {
                            setFromInFocus(false);
                        }}>
                        <DayPicker
                            ref={el => fromDateComponent = el && el.wrapper}
                            showWeekNumbers
                            todayButton={'Dagens datum'}
                            locale="sv"
                            onDayClick={function (day) {
                                onFromDateChosen(day);
                                setFromInFocus(false);
                            }}
                            onBlur={function () {
                                setFromInFocus(false);
                            }}
                        />
                    </div>
                    <div style={{ marginLeft: '0.5rem', marginRight: '0.5rem', marginTop: '0.5rem' }}>
                        {' - '}
                    </div>
                    <Input
                        value={toDate ? core.formatDate(toDate) : '-'}
                        style={{ width: '100px', height: '2rem' }}
                        onChange={function (e) {
                            onChange(e)
                        }}
                        onFocus={function () {
                            setToInFocus(true);
                            console.log(toDateComponent);
                            // toDateComponent.focus();
                        }}
                    />
                    {toInFocus && (
                        <div
                            style={{
                                zIndex: 100,
                                position: 'absolute',
                                top: '2.1rem',
                                left: '0.1rem',
                                backgroundColor: 'white',
                                border: '2px solid var(--dark-night)',
                                boxShadow: '0 0 0.4rem var(--dark-night)',
                                borderRadius: '1rem',
                                opacity: toInFocus ? 1 : 0
                            }}
                            onBlur={function () {
                                setToInFocus(false);
                            }}>
                            <DayPicker
                                ref={el => toDateComponent = el && el.wrapper}
                                showWeekNumbers
                                todayButton={'Dagens datum'}
                                locale="sv"
                                onBlur={function () {
                                    setFromInFocus(false);
                                }}
                                onDayClick={function (day) {
                                    onToDateChosen(day);
                                    setToInFocus(false);
                                }} />
                        </div>
                    )
                    }
                </div>
            </div >
        );
    }

    return function DatePicker(props) {
        return <DatePickerContent {...props} />;
    }
}