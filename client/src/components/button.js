import React from "react";
import spinnerMaker from '../components/spinner';

const Spinner = spinnerMaker();

export default function () {
    function ButtonContent({
        label,
        className,
        type,
        style,
        disabled,
        spinner,
        onClick
    }) {
        return (
            <button
                className={{
                    link: 'btn-link',
                    nav: 'btn-nav',
                    primary: 'btn-primary',
                    submit: 'btn-primary',
                    back: 'btn-back align-items-center'
                }[type]}
                disabled={disabled}
                type={type}
                style={style}
                onClick={onClick} >
                <span className="d-flex p-1 align-items-center">
                    {type === 'back' && (<i class="material-icons">keyboard_backspace</i>)}
                    <span className={{
                        link: '',
                        nav: 'add-text-shadow',
                        primary: 'add-text-shadow',
                        submit: 'add-text-shadow',
                        back: ''
                    }[type]}>
                        {label}
                    </span>
                    {spinner && <Spinner className="ml-1 loaderSmall" />}
                </span>
            </button >
        );
    }

    return function Button(props) {
        return <ButtonContent {...props} />
    }
}