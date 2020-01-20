import React, { useEffect } from "react";
import * as requestProvider from '../../requestProvider'
import serviceEndpoints from '../../../serviceEndpoints.json'
import inputMaker from '../../components/input';
import textAreaMaker from '../../components/textArea';
import dropDownMaker from '../../components/dropdown';
import buttonMaker from '../../components/button';
import spinnerMaker from '../../components/spinner';

import * as core from '../../core';

export default function () {

    const Input = inputMaker();
    const TextArea = textAreaMaker();
    const Dropdown = dropDownMaker();
    const Button = buttonMaker();
    const Spinner = spinnerMaker();

    function OverviewContent({ }) {
        <div>HEJSAN!</div>
    }

    return function OverviewComponent(props) {
        return (
            <OverviewContent {...props} />
        );
    }
}
