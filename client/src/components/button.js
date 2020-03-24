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
        onClick,
        icon
    }) {
        return (
            <button
                className={{
                    link: 'btn-link',
                    primary: 'btn-primary',
                    submit: 'btn-primary',
                    back: 'btn-back align-items-center',
                    delete: 'btn-delete',
                    small: 'text-box-editor-button align-items-center'
                }[type] + ' ' + className}
                disabled={disabled}
                type={type}
                style={style}
                onClick={onClick} >
                <span className={'d-flex align-items-center' + (type != 'small' && '  p-1')}>
                    {type === 'back' && (<i className="material-icons">keyboard_backspace</i>)}
                    {type === 'delete' && (<i className="material-icons">close</i>)}
                    {type === 'small' && (icon && <i style={{ fontSize: '1.2rem' }} className="material-icons">{icon}</i>)}
                    <span className={{
                        link: '',
                        nav: 'add-text-shadow',
                        primary: 'add-text-shadow',
                        submit: 'add-text-shadow',
                        back: '',
                        small: ''
                    }[type]}>
                        {label && label}
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