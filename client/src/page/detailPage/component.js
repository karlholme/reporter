import React, { useEffect } from "react";
import _ from "lodash";
import * as serviceEndpoints from "../../../serviceEndpoints.json";

import buttonMaker from "../../components/button";
import spinnerMaker from "../../components/spinner";
import textAreaEditorMaker from "../../components/textAreaEditor";
import textAreaMaker from "../../components/textArea";
import alertMaker from "../../components/alert";
import dropDownMaker from "../../components/dropdown";

import * as core from "../../core";
import * as serviceCallUtil from "../../serviceCallUtil";

export default function() {
  const Alert = alertMaker();
  const Button = buttonMaker();
  const Spinner = spinnerMaker();
  const TextArea = textAreaMaker();
  const Dropdown = dropDownMaker();
  const TextAreaEditor = textAreaEditorMaker();

  function DetailsContent({ state, triggerEvent }) {
    const {
      _id,
      header,
      status,
      createdOn,
      reporter,
      location,
      description,
      propertyNumber,
      comments
    } = core.getChosenFaultReport(state);

    useEffect(() => {
      triggerEvent({
        name: "FORM_UPDATED",
        data: status,
        page: core.pages.details,
        inputField: "currentStatus" + _id
      });
    }, []);

    return (
      <React.Fragment>
        <Button
          type="back"
          label="Tillbaka till รถversikten"
          onClick={function() {
            triggerEvent({ name: "BACK_PRESSED" });
          }}
        />

        <div className="card mt-0">
          <div className="card-header">
            <h2 className="mt-2 mb-1">{_id + ". " + header}</h2>
          </div>
          <div className="card-block">
            <div className="mb-4">
              <h3 className="h4 mb-2 mt-0">Detaljer:</h3>
              <div className="d-flex pl-2">
                <div className="font-weight-bold">
                  <p className="my-1">Gård:</p>
                  <p className="my-1 ">Plats:</p>
                  <p className="my-1">Rapporterat:</p>
                  <p className="my-1">Fast. nr:</p>
                  <p className="my-1">Prioritet:</p>
                  <p className="my-1">Status:</p>
                </div>

                <div className="ml-5">
                  <div className="ml-1">
                    <p className="my-1">{reporter || "-"}</p>
                    <p className="my-1">{location || "-"}</p>
                    <p className="my-1">{core.formatDate(createdOn) || "-"}</p>
                    <p className="my-1">{propertyNumber || "-"}</p>
                    <p className="my-1">{false || "-"}</p>
                  </div>
                  <div className="d-flex">
                    <Dropdown
                      style={{ width: "200px" }}
                      value={core.getFormField(
                        state,
                        core.pages.details,
                        "currentStatus" + _id
                      )}
                      onChange={event => {
                        event.preventDefault();
                        triggerEvent({
                          name: "FORM_UPDATED",
                          data: event.target.value,
                          page: core.pages.details,
                          inputField: "currentStatus" + _id
                        });
                      }}
                      alternatives={core
                        .getStatuses(state)
                        .map(status => status.status)}
                    />
                    <Button
                      className="ml-1"
                      disabled={
                        core.getFormField(
                          state,
                          core.pages.details,
                          "currentStatus" + _id
                        ) === status
                      }
                      type="small"
                      onClick={() =>
                        triggerEvent({
                          name: "UPDATE_STATUS",
                          id: _id,
                          newValue: core.getFormField(
                            state,
                            core.pages.details,
                            "currentStatus" + _id
                          )
                        })
                      }
                      icon="check"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="h4 mt-2 mb-2">Beskrivning:</h3>
              <div className="pl-1">
                <TextAreaEditor
                  initialValue={description}
                  value={core.getFormField(
                    state,
                    core.pages.details,
                    "description" + _id
                  )}
                  textUpdated={newValue => {
                    triggerEvent({
                      name: "UPDATE-DESCRIPTION",
                      id: _id,
                      newValue: newValue
                    });
                  }}
                />
              </div>
            </div>

            <div>
              <h3 className="h4 mt-2 mb-3">Kommentarer:</h3>
              {!_.isEmpty(comments) ? (
                comments.map(function(comment) {
                  return (
                    <div className="mb-3">
                      <div className="my-2 pl-2" key={comment._id}>
                        <div
                          className="my-2 d-flex align-items-center"
                          style={{ fontStyle: "italic" }}>
                          <i
                            className="align-items-baseline"
                            style={{ fontSize: "1rem" }}
                            className="material-icons">
                            mode_comment
                          </i>
                          <strong className="ml-1">
                            {" " + comment.reporter}
                          </strong>
                          <p className="ml-1">
                            {" lade till en kommentar - " +
                              core.formatDate(comment.createdOn) +
                              ":"}
                          </p>
                          <Button
                            className="ml-auto"
                            type="delete"
                            onClick={function() {
                              triggerEvent({
                                name: "REMOVE-COMMENT",
                                data: {
                                  faultReportId: _id,
                                  commentId: comment._id
                                }
                              });
                            }}
                          />
                        </div>
                        <p className="my-2 ml-2">{comment.message}</p>
                      </div>
                      <hr />
                    </div>
                  );
                })
              ) : (
                <div className="mb-3 font-italic">
                  Inga kommentarer har lagts till än..
                </div>
              )}
              <TextArea
                className="m-1"
                value={core.getFormField(
                  state,
                  core.pages.details,
                  "addComment" + _id
                )}
                title="Lägg till kommentar:"
                placeholder="Kommentar..."
                onSaveAction={function() {
                  triggerEvent({
                    name: "ADD-COMMENT-CLICKED",
                    id: _id,
                    message: core.getFormField(
                      state,
                      core.pages.details,
                      "addComment"
                    )
                  });
                }}
                onClearAction={function() {
                  triggerEvent({
                    name: "CLEAR-COMMENT-PRESSED"
                  });
                }}
                onChange={function(event) {
                  event.preventDefault();
                  triggerEvent({
                    name: "FORM_UPDATED",
                    data: event.target.value,
                    page: core.pages.details,
                    inputField: "addComment" + _id
                  });
                }}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return function DetailsComponent(props) {
    if (
      serviceCallUtil.isCallingService(
        props.state,
        serviceEndpoints.getFaultReports
      )
    ) {
      return <Spinner />;
    }

    return (
      <React.Fragment>
        {serviceCallUtil.getServiceResponse(
          props.state,
          serviceEndpoints.updateFaultReport
        ) &&
          serviceCallUtil.getServiceResponse(
            props.state,
            serviceEndpoints.updateFaultReport
          ).id === core.getChosenFaultReport(props.state)._id && (
            <Alert
              type="success"
              header={
                core.translateFaultReportField(
                  serviceCallUtil.getServiceResponse(
                    props.state,
                    serviceEndpoints.updateFaultReport
                  ).updatedField
                ) + " uppdaterad!"
              }
            />
          )}
        <DetailsContent {...props} />
      </React.Fragment>
    );
  };
}
