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
                    back: 'btn-back align-items-center',
                    delete: 'btn-delete'
                }[type]}
                disabled={disabled}
                type={type}
                style={style}
                onClick={onClick} >
                <span className="d-flex p-1 align-items-center">
                    {type === 'back' && (<i className="material-icons">keyboard_backspace</i>)}
                    {type === 'delete' && (<i className="material-icons">close</i>)}
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
            </button>
        );
    }

    return function Button(props) {
        return <ButtonContent {...props} />
    }
}