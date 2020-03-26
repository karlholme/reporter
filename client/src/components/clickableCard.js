import React, { useState } from 'react';
import * as core from '../core';
import dropDownMaker from '../components/dropdown';
import buttonMaker from '../components/button';
import spinnerMaker from '../components/spinner';
import textAreaEditorMaker from '../components/textAreaEditor';
import textAreaMaker from '../components/textArea';
import alertMaker from '../components/alert';

export default function() {
  function ClickableCardContent({
    className,
    id,
    faultReport,
    onClick,
    state
  }) {
    const [open, setOpen] = useState(false);

    const Alert = alertMaker();
    const Button = buttonMaker();
    const Spinner = spinnerMaker();
    const TextArea = textAreaMaker();
    const Dropdown = dropDownMaker();
    const TextAreaEditor = textAreaEditorMaker();

    const {
      _id,
      header,
      reporter,
      location,
      propertyNumber,
      createdOn,
      priority
    } = faultReport;

    return (
      <div key={id} className={'info-card ' + className}>
        <div
          onClick={() => onClick()}
          className="d-flex flex-row align-items-center info-card-header">
          <h2 className="h3 flex-grow-1 mt-2 mb-1">{id + '. ' + header}</h2>
          <div>{priority || '-'}</div>
        </div>
        <div className="d-flex">
          <div
            className="m-2"
            style={{
              width: '60%'
            }}>
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
                    <p className="my-1">{reporter || '-'}</p>
                    <p className="my-1">{location || '-'}</p>
                    <p className="my-1">{core.formatDate(createdOn) || '-'}</p>
                    <p className="my-1">{propertyNumber || '-'}</p>
                    <p className="my-1">{false || '-'}</p>
                  </div>
                  <div className="d-flex">
                    <Dropdown
                      style={{ width: '200px' }}
                      value={core.getFormField(
                        state,
                        core.pages.details,
                        'currentStatus' + _id
                      )}
                      onChange={event => {
                        event.preventDefault();
                        triggerEvent({
                          name: 'FORM_UPDATED',
                          data: event.target.value,
                          page: core.pages.details,
                          inputField: 'currentStatus' + _id
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
                          'currentStatus' + _id
                        ) === status
                      }
                      type="small"
                      onClick={() =>
                        triggerEvent({
                          name: 'UPDATE_STATUS',
                          id: _id,
                          newValue: core.getFormField(
                            state,
                            core.pages.details,
                            'currentStatus' + _id
                          )
                        })
                      }
                      icon="check"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 d-flex flex-column">
            <div className="text-nowrap pl-1">{status || '-'}</div>
            <label className="text-nowrap">{reporter}</label>
            <div className="text-nowrap pl-1">
              {core.formatDate(createdOn) || '-'}
            </div>
            {open && (
              <React.Fragment>
                <label className="text-nowrap">Fastighetsnummer:</label>
                <div className="text-nowrap pl-1">{propertyNumber || '-'}</div>
                <label className="text-nowrap">Plats:</label>
                <div className="text-nowrap pl-1">{location || '-'}</div>
              </React.Fragment>
            )}
          </div>
        </div>
        <div
          onClick={function() {
            setOpen(!open);
          }}
          className="info-card-footer">
          {open ? (
            <i style={{ fontSize: '1rem' }} className="material-icons">
              keyboard_arrow_down
            </i>
          ) : (
            <i style={{ fontSize: '1rem' }} className="material-icons">
              keyboard_arrow_up
            </i>
          )}
        </div>
      </div>
    );
  }

  return function ClickableCard(props) {
    return <ClickableCardContent {...props} />;
  };
}
