import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default function DatePickerMaker() {

    function DatePickerContent() {
        return (<div></div>);
    }

    return function DatePicker() {
        return <DatePickerContent />;
    }
}