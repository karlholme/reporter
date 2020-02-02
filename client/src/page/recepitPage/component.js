import React, { useEffect } from "react";
import serviceEndpoints from '../../../serviceEndpoints.json'
import clickableCardMaker from '../../components/clickableCard'
import * as core from '../../core';

export default function () {

    const ClickableCard = clickableCardMaker();

    function ReceiptContent({ store, state, triggerEvent }) {
        return (
            <div className="card">
                <div className="card-header">
                    <h1>Felanmälan tillagd</h1>
                </div>
                <div className="card-block">
                    <ClickableCard
                        id={core.getAddedFaultReport(state)._id}
                        createdOn={core.getAddedFaultReport(state).createdOn}
                        header={core.getAddedFaultReport(state).header}
                        location={core.getAddedFaultReport(state).location}
                        description={core.getAddedFaultReport(state).description}
                        reporter={core.getAddedFaultReport(state).reporter}
                    />
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
