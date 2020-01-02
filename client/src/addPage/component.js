import React from "react";

export default function () {

    function AddPageContent({ store, state }) {
        return (
            <div className="card-block">
                <h1>FELANMÄLAN</h1>

                <form>
                    <div id="wrapper">

                        <div id="left">
                            <fieldset>
                                <label>Rubrik:</label>
                                <input value={state.addReport.header}
                                    type="text"
                                    name="header"
                                    style={{ width: '300px' }}
                                    onChange={(event) => {
                                        store.dispatch({ type: 'UPDATE_FORM', data: event.target.value, inputField: 'header' })
                                    }} />
                            </fieldset>
                        </div>

                        <div id="right">
                            <fieldset className="mb-5">
                                <label className="float-right">Fastighetsnummer:</label>
                                <input
                                    className="float-right"
                                    value={state.addReport.propertyNumber}
                                    style={{ width: '150px' }}
                                    type="number"
                                    name="propertynumber"
                                    onChange={(event) => {
                                        store.dispatch({ type: 'UPDATE_FORM', data: event.target.value, inputField: 'propertyNumber' })
                                    }} />
                            </fieldset>
                        </div>
                    </div>

                    <fieldset>
                        <label>Plats:</label>
                        <input value={state.addReport.place}
                            type="text"
                            name="place"
                            style={{ width: '300px' }}
                            onChange={(event) => {
                                store.dispatch({ type: 'UPDATE_FORM', data: event.target.value, inputField: 'place' })
                            }} />
                    </fieldset>

                    <fieldset>
                        <label>Beskrivning:</label>
                        <textarea
                            value={state.addReport.description}
                            type="text"
                            name="Beskrivning"
                            maxLength="700"
                            rows="4"
                            placeholder="Beskriv felet här..."
                            onChange={(event) => {
                                store.dispatch({ type: 'UPDATE_FORM', data: event.target.value, inputField: 'description' })
                            }} />
                    </fieldset>
                    <input className="btn-primary" type="submit" value="Skicka" />
                </form>
            </div>
        )
    }

    return function addPageComponent(props) {
        return (
            <AddPageContent {...props} />
        );
    }
}
