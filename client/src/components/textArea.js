import React from "react";
import buttonMaker from './button';

export default function () {

    const Button = buttonMaker();

    function TextAreaContent({
        title,
        className,
        placeHolder,
        value,
        onChange,
        onSaveAction,
        onClearAction
    }) {
        return (
            <fieldset style={{ maxWidth: '30rem' }} className={className}>
                <label>{title}</label>
                <textarea
                    value={value}
                    type="text"
                    maxLength="700"
                    rows="4"
                    placeholder={placeHolder}
                    onChange={onChange} />

                {onSaveAction &&
                    <div className="d-flex align-items-center justify-content-end">
                        <Button
                            type='small'
                            onClick={onSaveAction}
                            icon="check"
                        />
                        {onClearAction &&
                            <Button
                                type='small'
                                onClick={onClearAction}
                                icon="close"
                            />
                        }
                    </div>
                }

            </fieldset>
        );
    }

    return function TextArea(props) {
        return <TextAreaContent {...props} />
    }
}