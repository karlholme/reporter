import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import serviceEndpoints from '../../../serviceEndpoints.json';
import spinnerMaker from '../../components/spinner';
import checkboxMaker from '../../components/checkbox';
import alertMaker from '../../components/alert';
import commentMaker from '../../components/comment';
import datePickerMaker from '../../components/datePicker';
import dropdownMaker from '../../components/dropdown';
import inputMaker from '../../components/input';

import * as core from '../../core';
import * as serviceCallUtil from '../../serviceCallUtil';

export default function () {
    const Spinner = spinnerMaker();
    const Alert = alertMaker();
    const Checkbox = checkboxMaker();
    const Dropdown = dropdownMaker();
    const Input = inputMaker();
    const Comment = commentMaker();
    const DatePicker = datePickerMaker();

    function FaultReportCard({
        className,
        id,
        faultReport,
        onClick,
    }) {
        const [open, setOpen] = useState(false);

        const {
            _id,
            header,
            reporter,
            location,
            propertyNumber,
            createdOn,
            priority,
            description,
            status,
            comments,
            category
        } = faultReport;

        return (
            <div key={id} className={'info-card ' + className}>
                <div
                    onClick={() => onClick()}
                    className="d-flex flex-row align-items-center info-card-header">
                    <h2 className="h3 flex-grow-1 mt-2 mb-1">{id + '. ' + header}</h2>
                    <div>{priority || '-'}</div>
                </div>
                <div className="mx-3 my-1">
                    <div className="d-flex mb-3">
                        <div className="flex-fill mr-4" style={{ width: '55%' }}>
                            <h3 className="h4 mb-2 mt-1">Beskrivning:</h3>
                            <p className="ml-2" style={!open ? {
                                display: '-webkit-box',
                                WebkitLineClamp: '5',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            } : {}}>{description}</p>
                        </div>
                        <div className="" style={{ width: '40%' }}>
                            <h3 className="h4 mt-1 mb-2">Detaljer:</h3>
                            <table className="first-column-bold break-last-column" style={{
                                width: '100%',
                            }}>
                                <tbody>
                                    <tr>
                                        <td>Status:</td>
                                        <td>{status || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Rapporterat:</td>
                                        <td>{core.formatDate(createdOn) || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Gård:</td>
                                        <td>{reporter || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Plats:</td>
                                        <td>{core.truncateText(location, 20) || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Kategori:</td>
                                        <td>{category || '-'}</td>
                                    </tr>
                                    {open && (
                                        <React.Fragment>
                                            <tr>
                                                <td>Fast. nr:</td>
                                                <td>{propertyNumber || '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Prioritet:</td>
                                                <td>{priority || '-'}</td>
                                            </tr>
                                        </React.Fragment>

                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {open &&
                        <div className="">
                            <h3 className="h4 mt-2 mb-3">Kommentarer:</h3>
                            {(!_.isEmpty(comments) ? (
                                comments.map(function (comment) {
                                    return (
                                        <Comment
                                            key={comment._id}
                                            comment={comment}
                                            triggerEvent={
                                                function () {
                                                    triggerEvent({
                                                        name: "REMOVE-COMMENT",
                                                        data: {
                                                            faultReportId: _id,
                                                            commentId: comment._id
                                                        }
                                                    })
                                                }
                                            }
                                        />)
                                })) : (
                                    <div className="mb-3 font-italic">
                                        Inga kommentarer har lagts till än..
                                    </div>
                                ))}
                        </div>
                    }
                </div>


                <div
                    onClick={function () {
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

    function OverviewContent({ state, triggerEvent }) {
        useEffect(() => {
            triggerEvent({ name: 'COMPONENT_MOUNTED' })
        }, []);

        if (!(serviceCallUtil.getServiceResponse(state, serviceEndpoints.getStatuses)
            && serviceCallUtil.getServiceResponse(state, serviceEndpoints.getFaultReports))) {
            return (
                <div className='d-flex justify-content-center m-5'>
                    <Spinner />
                </div>
            );
        }

        const filterHeaderStyle = {
            fontSize: '1.2rem',
            color: 'var(--dark-night)',
            margin: '0',
            marginBottom: '0.3rem',
            textShadow: '0px 0.1rem 0px rgba(0, 0, 0, 0.1)'
        };

        const filterCheckboxesClasses = 'mb-1';

        console.log(core.getFilteredAndSortedFaultReports(state));

        return (
            <React.Fragment>
                {serviceCallUtil.getServiceResponse(state, serviceEndpoints.addFaultReport) && (
                    <Alert
                        className='mb-3'
                        header={'Felanmälan tillagd'}
                        body={'Felanmälan med id: '
                            + serviceCallUtil.getServiceResponse(state, serviceEndpoints.addFaultReport)._id
                            + ' är nu  tillagd.'}
                        type='success'
                    />
                )}
                <div className="d-flex justify-content-center mb-1">
                    <div className="col-3">
                        <h2 style={filterHeaderStyle}>Status:</h2>
                        <Checkbox
                            key={'status-all'}
                            label={'Alla'}
                            checked={core.isAllFiltersActive(state, 'status')}
                            className={filterCheckboxesClasses}
                            onChange={function (checked) {
                                triggerEvent({
                                    name: "FILTER_SELECTED",
                                    data: {
                                        filter: 'status',
                                        value: 'all',
                                        checked: checked
                                    }
                                });
                            }}
                        />
                        {core.getStatusValues(state).map(function (v) {
                            return (<Checkbox
                                key={v}
                                label={v}
                                checked={core.isFilterActive(state, 'status', v)}
                                className={filterCheckboxesClasses}
                                onChange={function (checked) {
                                    triggerEvent({
                                        name: "FILTER_SELECTED",
                                        data: {
                                            filter: 'status',
                                            value: v,
                                            checked: checked
                                        }
                                    });
                                }}
                            />)
                        })}
                    </div>
                    <div className="col-3">
                        <h2 style={filterHeaderStyle}>Gård:</h2>
                        <Checkbox
                            key={'status-all'}
                            label={'Alla'}
                            checked={core.isAllFiltersActive(state, 'reporter')}
                            className={filterCheckboxesClasses}
                            onChange={function (checked) {
                                triggerEvent({
                                    name: "FILTER_SELECTED",
                                    data: {
                                        filter: 'reporter',
                                        value: 'all',
                                        checked: checked
                                    }
                                });
                            }}
                        />
                        {core.getReportersFilterValues(state).map(function (v) {
                            return (<Checkbox
                                key={v}
                                label={v}
                                className={filterCheckboxesClasses}
                                checked={core.isFilterActive(state, 'reporter', v)}
                                onChange={function (checked) {
                                    triggerEvent({
                                        name: "FILTER_SELECTED",
                                        data: {
                                            filter: 'reporter',
                                            value: v,
                                            checked: checked
                                        }
                                    });
                                }}
                            />)
                        })}
                    </div>
                    <div className="col-3">
                        <h2 style={filterHeaderStyle}>Kategori:</h2>
                        <Checkbox
                            key={'status-all'}
                            label={'Alla'}
                            checked={core.isAllFiltersActive(state, 'category')}
                            className={filterCheckboxesClasses}
                            onChange={function (checked) {
                                triggerEvent({
                                    name: "FILTER_SELECTED",
                                    data: {
                                        filter: 'category',
                                        value: 'all',
                                        checked: checked
                                    }
                                });
                            }}
                        />
                        {core.getCategoryFilterValues(state).map(function (v) {
                            return (<Checkbox
                                key={v}
                                label={v}
                                className={filterCheckboxesClasses}
                                checked={core.isFilterActive(state, 'category', v)}
                                onChange={function (checked) {
                                    triggerEvent({
                                        name: "FILTER_SELECTED",
                                        data: {
                                            filter: 'category',
                                            value: v,
                                            checked: checked
                                        }
                                    });
                                }}
                            />)
                        })}
                    </div>
                </div>

                <div className="d-flex">
                    <div>
                        <Dropdown
                            className=""
                            style={{ width: '300px', height: '2.5rem' }}
                            title="Sortera på:"
                            value={core.getSortOnValue(state)}
                            onChange={function (event) {
                                event.preventDefault();
                                triggerEvent({
                                    name: 'FORM_UPDATED',
                                    data: event.target.value,
                                    page: core.pages.overview,
                                    inputField: 'sortOrder'
                                })
                            }}
                            alternatives={['Skapad', 'Gård', 'Status', 'Kategori']}
                            placeholder="Sortera på"
                        />
                    </div>

                    <div>
                        <Input
                            className=""
                            title={'Sök:'}
                            value={core.getFormField(state, core.pages.overview, 'search')}
                            placeholder="Sök på rubrik, beskrivning, gård"
                            required
                            onChange={(event) => {
                                event.preventDefault();
                                triggerEvent({
                                    name: 'FORM_UPDATED',
                                    data: event.target.value,
                                    page: core.pages.overview,
                                    inputField: 'search'
                                })
                            }} />
                    </div>

                    <div>
                        <DatePicker />
                    </div>
                </div>

                <div className='card'>
                    {core.getFilteredAndSortedFaultReports(state).map(function (faultReport) {
                        return (
                            <FaultReportCard
                                className='mb-2'
                                state={state}
                                key={faultReport.createdOn + faultReport._id}
                                id={faultReport._id}
                                faultReport={faultReport}
                                onClick={function () {
                                    triggerEvent({ name: 'CARD_PRESSED', id: faultReport._id });
                                }}
                            />
                        );
                    })}
                </div>
            </React.Fragment>
        );
    }

    return function OverviewComponent(props) {
        return <OverviewContent {...props} />;
    };
}
