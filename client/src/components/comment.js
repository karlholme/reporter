import React from 'react';

import * as core from '../core'
import buttonMaker from './button';

export default function () {
    const Button = buttonMaker();

    function CommentContent({ comment, triggerEvent }) {
        const { _id, reporter, createdOn, message } = comment;
        return (
            <div className="mb-3">
                <div className="my-2 pl-2" key={_id}>
                    <div
                        className="my-2 d-flex align-items-center"
                        style={{ fontStyle: "italic" }}>
                        <i className="align-items-baseline"
                            style={{ fontSize: "1rem" }}
                            className="material-icons">
                            mode_comment
                    </i>
                        <strong className="ml-1">
                            {" " + reporter}
                        </strong>
                        <p className="ml-1">
                            {" lade till en kommentar - " +
                                core.formatDate(createdOn) +
                                ":"}
                        </p>
                        <Button
                            className="ml-auto"
                            type="delete"
                            onClick={function () {
                                triggerEvent({
                                    name: "REMOVE-COMMENT",
                                    data: {
                                        faultReportId: _id,
                                        commentId: _id
                                    }
                                });
                            }}
                        />
                    </div>
                    <p className="my-2 ml-2">{message}</p>
                </div>
                <hr />
            </div>
        );
    }

    return function (props) {
        return <CommentContent {...props} />
    }
}