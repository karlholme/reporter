import React from "react";

export default function () {

    function AddPageContent({ store, state }) {
        return (
            <div className="card-block">
                <h1>FELANMÄLAN</h1>

                <form>
                    <label>
                        Rubrik:
                        <br />
                        <input
                            value={state.addReport.header}
                            type="text"
                            name="Rubrik"
                            onChange={(event) => {
                                store.dispatch({ type: 'UPDATE_FORM', data: event.target.value, inputField: 'header' })
                            }}
                        />
                    </label>

                    <br />
                    <label>
                        <br />
                        Beskrivning:
                        <br />
                        <textarea
                            value={state.addReport.description}
                            type="text"
                            name="Beskrivning"
                            onChange={(event) => {
                                store.dispatch({ type: 'UPDATE_FORM', data: event.target.value, inputField: 'description' })
                            }}
                        />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
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
