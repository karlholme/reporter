import React, { useEffect } from "react";
import serviceEndpoints from '../../../serviceEndpoints.json'
import inputMaker from '../../components/input';
import textAreaMaker from '../../components/textArea';
import dropDownMaker from '../../components/dropdown';
import buttonMaker from '../../components/button';
import spinnerMaker from '../../components/spinner';
// import * as core from '../../core';

export default function () {

    const Input = inputMaker();
    const TextArea = textAreaMaker();
    const Dropdown = dropDownMaker();
    const Button = buttonMaker();
    const Spinner = spinnerMaker();

    function ReceiptContent({ store, state, triggerEvent }) {
        return (
            <div className="card">
                <div className="card-header">
                    <h1>FELANMÄLAN TILLAGD</h1>
                </div>
                <div className="card-block">
                    {core.get}
                </div>
            </div>
        )
    }

    return function ReceiptPage(props) {
        return (
            <ReceiptContent {...props} />
        );
    }
}
