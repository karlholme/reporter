import React from "react";

import AddPageComponentMaker from './page/addPage/component';
import overviewPageMaker from './page/overviewPage/component';
import detailsPageMaker from './page/detailPage/component';
import adminPageMaker from './page/adminPage/component';

import headerImage from '../assets/bo_header_2018.png';
import favicon from '../assets/favicon.ico';
import * as core from './core';
import * as serviceCallUtil from './serviceCallUtil';
import serviceEndpoints from '../serviceEndpoints.json'

import buttonMaker from './components/button';

const AddPageComponent = AddPageComponentMaker();
const OverviewPage = overviewPageMaker();
const DetailsPage = detailsPageMaker();
const AdminPage = adminPageMaker();

const Button = buttonMaker();

class App extends React.Component {
    componentDidMount() {
        // We need to do this to make react rerender when the start changes.
        // Other solutions would be to use provider: https://react-redux.js.org/api/provider
        this.props.store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentDidUpdate() {
        core.maybeCallSideEffect(this.props.store.getState(), this.props.store);
    }

    render() {
        const { store } = this.props;
        const state = store.getState();

        return (
            <React.Fragment>
                <nav className="sticky header d-flex align-items-center">
                    <div className="flex-grow-1">
                        <img className="img" width="300px" src={headerImage} alt="header image" />
                    </div>
                    <div>

                        <Button
                            type="primary"
                            label={'Översikt'}
                            className="m-1"
                            onClick={function () {
                                store.dispatch({
                                    type: 'GO_TO_PAGE',
                                    data: {
                                        page: core.pages.overview
                                    }
                                })
                            }}
                        />

                        <Button
                            type="primary"
                            label={'Ny felanmälan'}
                            className="m-1"
                            onClick={function () {
                                store.dispatch({
                                    type: 'GO_TO_PAGE',
                                    data: {
                                        page: core.pages.add
                                    }
                                })
                            }}
                        />

                        <Button
                            type="primary"
                            label={'Admin'}
                            className="m-1 bg-banangul"
                            onClick={function () {
                                store.dispatch({
                                    type: 'GO_TO_PAGE',
                                    data: {
                                        page: core.pages.admin
                                    }
                                })
                            }}
                        />

                    </div>
                </nav>
                <div className="content">
                    {core.getActivePage(state) === core.pages.overview && (
                        <OverviewPage
                            state={state}
                            triggerEvent={(event) => {
                                if (event.name === 'CARD_PRESSED') {
                                    store.dispatch({
                                        type: 'SET_CHOSEN_FAULT_REPORT',
                                        data: {
                                            id: event.id
                                        }
                                    })
                                    store.dispatch({
                                        type: 'GO_TO_PAGE',
                                        data: {
                                            page: core.pages.details
                                        }
                                    })
                                } else if (event.name === 'FORM_UPDATED') {
                                    store.dispatch({
                                        type: 'UPDATE_FORMS',
                                        data: {
                                            data: event.data,
                                            inputField: event.inputField,
                                            page: event.page
                                        }
                                    })
                                } else if (event.name === 'COMPONENT_MOUNTED') {
                                    if (!serviceCallUtil.serviceHasBeenRequested(this.props.store.getState(), serviceEndpoints.getFaultReports)
                                        && !serviceCallUtil.getServiceResponse(this.props.store.getState(), serviceEndpoints.getFaultReports)) {
                                        this.props.store.dispatch({
                                            type: 'REQUEST_CALL',
                                            data: {
                                                service: serviceEndpoints.getFaultReports
                                            }
                                        })
                                    }
                                    if (!serviceCallUtil.serviceHasBeenRequested(this.props.store.getState(), serviceEndpoints.getStatuses)
                                        && !serviceCallUtil.getServiceResponse(this.props.store.getState(), serviceEndpoints.getStatuses)) {
                                        this.props.store.dispatch({
                                            type: 'REQUEST_CALL',
                                            data: {
                                                service: serviceEndpoints.getStatuses
                                            },
                                        })
                                    }
                                    if (!serviceCallUtil.serviceHasBeenRequested(this.props.store.getState(), serviceEndpoints.getReporters)
                                        && !serviceCallUtil.getServiceResponse(this.props.store.getState(), serviceEndpoints.getReporters)) {
                                        this.props.store.dispatch({
                                            type: 'REQUEST_CALL',
                                            data: {
                                                service: serviceEndpoints.getReporters
                                            }
                                        })
                                    }

                                    if (!serviceCallUtil.serviceHasBeenRequested(this.props.store.getState(), serviceEndpoints.getCategories)
                                        && !serviceCallUtil.getServiceResponse(this.props.store.getState(), serviceEndpoints.getCategories)) {
                                        this.props.store.dispatch({
                                            type: 'REQUEST_CALL',
                                            data: {
                                                service: serviceEndpoints.getCategories
                                            }
                                        })
                                    }
                                } else if (event.name === 'FILTER_SELECTED') {
                                    store.dispatch({
                                        type: 'UPDATE_FILTER',
                                        data: {
                                            filter: event.data.filter,
                                            value: event.data.value,
                                            show: event.data.checked
                                        }
                                    })
                                }

                            }}
                        />
                    )}
                    {core.getActivePage(state) === core.pages.details && (
                        <DetailsPage
                            state={state}
                            triggerEvent={(event) => {
                                if (event.name === 'BACK_PRESSED') {
                                    store.dispatch({
                                        type: 'GO_TO_PAGE',
                                        data: {
                                            page: core.pages.overview
                                        }
                                    })
                                } else if (event.name === 'UPDATE-DESCRIPTION') {
                                    store.dispatch({
                                        type: 'MAKE_POST_SERVICE_CALL',
                                        data: {
                                            request: {
                                                id: event.id,
                                                fieldToUpdate: 'description',
                                                newValue: event.newValue
                                            },
                                            service: serviceEndpoints.updateFaultReport,
                                            sideEffectWhenOkResponse: function () {
                                                store.dispatch({
                                                    type: 'MAKE_GET_CALL_SERVICE',
                                                    data: {
                                                        service: serviceEndpoints.getFaultReports
                                                    }
                                                })
                                            }
                                        }
                                    })
                                } else if (event.name === 'FORM_UPDATED') {
                                    store.dispatch({
                                        type: 'UPDATE_FORMS',
                                        data: {
                                            data: event.data,
                                            inputField: event.inputField,
                                            page: event.page
                                        }
                                    })
                                } else if (event.name === 'ADD-COMMENT-CLICKED') {
                                    store.dispatch({
                                        type: 'MAKE_POST_SERVICE_CALL',
                                        data: {
                                            service: serviceEndpoints.addComment,
                                            request: core.getAddCommentRequest(state),
                                            sideEffectWhenOkResponse: function () {
                                                store.dispatch({
                                                    type: 'MAKE_GET_CALL_SERVICE',
                                                    data: {
                                                        service: serviceEndpoints.getFaultReports
                                                    }
                                                })
                                                store.dispatch({
                                                    type: 'CLEAN_FORMS',
                                                    data: {}
                                                })
                                            }
                                        }
                                    })
                                } else if (event.name === 'REMOVE-COMMENT') {
                                    store.dispatch({
                                        type: 'MAKE_PUT_SERVICE_CALL',
                                        data: {
                                            service: serviceEndpoints.removeComment,
                                            request: {
                                                faultReportId: event.data.faultReportId,
                                                commentId: event.data.commentId
                                            },
                                            sideEffectWhenOkResponse: function () {
                                                store.dispatch({
                                                    type: 'MAKE_GET_CALL_SERVICE',
                                                    data: {
                                                        service: serviceEndpoints.getFaultReports
                                                    }
                                                })
                                            }
                                        }
                                    })
                                } else if (event.name === 'UPDATE_STATUS') {
                                    store.dispatch({
                                        type: 'MAKE_POST_SERVICE_CALL',
                                        data: {
                                            request: {
                                                id: event.id,
                                                fieldToUpdate: 'status',
                                                newValue: event.newValue
                                            },
                                            service: serviceEndpoints.updateFaultReport,
                                            sideEffectWhenOkResponse: function () {
                                                store.dispatch({
                                                    type: 'MAKE_GET_CALL_SERVICE',
                                                    data: {
                                                        service: serviceEndpoints.getFaultReports
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }}
                        />
                    )}
                    {core.getCurrentPage(state) === core.pages.add && (
                        <AddPageComponent
                            store={store}
                            state={state}
                            triggerEvent={(event) => {
                                if (event.name === 'FORM_SUBMITTED') {
                                    store.dispatch({
                                        type: 'MAKE_POST_SERVICE_CALL',
                                        data: {
                                            request: core.getAddFaultReportRequest(state),
                                            service: serviceEndpoints.addFaultReport,
                                            sideEffectWhenOkResponse: function () {
                                                store.dispatch({
                                                    type: 'GO_TO_PAGE',
                                                    data: {
                                                        page: core.pages.overview
                                                    }
                                                })
                                            }
                                        }
                                    })
                                } else if (event.name === 'FORM_UPDATED') {
                                    store.dispatch({
                                        type: 'UPDATE_FORMS',
                                        data: {
                                            data: event.data,
                                            inputField: event.inputField,
                                            page: event.page,
                                        }
                                    })
                                } else if (event.name === 'CLEAN_PRESSED') {
                                    store.dispatch({
                                        type: 'CLEAN_FORMS',
                                        data: {}
                                    })
                                }
                            }}
                        />
                    )}

                    {core.getCurrentPage(state) === core.pages.admin && (
                        <AdminPage
                            store={store}
                            state={state}
                            triggerEvent={(event) => {
                                if (event.name === 'PAGE_MOUNTED') {
                                    store.dispatch({
                                        type: 'REQUEST_CALL',
                                        data: {
                                            service: serviceEndpoints.getReporters
                                        }
                                    })
                                    store.dispatch({
                                        type: 'REQUEST_CALL',
                                        data: {
                                            service: serviceEndpoints.getStatuses
                                        }
                                    })
                                } else if (event.name === 'FORM_UPDATED') {
                                    store.dispatch({
                                        type: 'UPDATE_FORMS',
                                        data: {
                                            data: event.data,
                                            inputField: event.inputField,
                                            page: event.page,
                                        }
                                    })
                                } else if (event.name === 'REMOVE_REPORTER_CLICKED') {
                                    store.dispatch({
                                        type: 'MAKE_PUT_SERVICE_CALL',
                                        data: {
                                            request: { id: event.id },
                                            service: serviceEndpoints.removeReporter,
                                            sideEffectWhenOkResponse: function () {
                                                store.dispatch({
                                                    type: 'MAKE_GET_CALL_SERVICE',
                                                    data: {
                                                        service: serviceEndpoints.getReporters
                                                    }
                                                })
                                            }
                                        }
                                    })
                                } else if (event.name === 'REPORTER_ADDED') {
                                    store.dispatch({
                                        type: 'MAKE_POST_SERVICE_CALL',
                                        data: {
                                            request: { reporter: event.reporter },
                                            service: serviceEndpoints.addReporter,
                                            sideEffectWhenOkResponse: function () {
                                                store.dispatch({
                                                    type: 'CLEAN_FORMS',
                                                    data: {}
                                                })
                                                store.dispatch({
                                                    type: 'MAKE_GET_CALL_SERVICE',
                                                    data: {
                                                        service: serviceEndpoints.getReporters
                                                    }
                                                })
                                                store.dispatch({
                                                    type: 'MAKE_GET_CALL_SERVICE',
                                                    data: {
                                                        service: serviceEndpoints.getStatuses
                                                    }
                                                })
                                            }
                                        }
                                    })
                                } else if (event.name === 'STATUS_ADDED') {
                                    store.dispatch({
                                        type: 'MAKE_POST_SERVICE_CALL',
                                        data: {
                                            request: { status: event.status },
                                            service: serviceEndpoints.addStatus,
                                            sideEffectWhenOkResponse: function () {
                                                store.dispatch({
                                                    type: 'CLEAN_FORMS',
                                                    data: {}
                                                })
                                                store.dispatch({
                                                    type: 'MAKE_GET_CALL_SERVICE',
                                                    data: {
                                                        service: serviceEndpoints.getReporters
                                                    }
                                                })
                                                store.dispatch({
                                                    type: 'MAKE_GET_CALL_SERVICE',
                                                    data: {
                                                        service: serviceEndpoints.getStatuses
                                                    }
                                                })
                                            }
                                        }
                                    })
                                } else if (event.name === 'REMOVE_STATUS_CLICKED') {
                                    store.dispatch({
                                        type: 'MAKE_PUT_SERVICE_CALL',
                                        data: {
                                            request: { id: event.id },
                                            service: serviceEndpoints.removeStatus,
                                            sideEffectWhenOkResponse: function () {
                                                store.dispatch({
                                                    type: 'MAKE_GET_CALL_SERVICE',
                                                    data: {
                                                        service: serviceEndpoints.getStatuses
                                                    }
                                                })
                                            }
                                        }
                                    })
                                } else if (event.name === 'REMOVE_CATEGORY_CLICKED') {
                                    store.dispatch({
                                        type: 'MAKE_PUT_SERVICE_CALL',
                                        data: {
                                            request: { id: event.id },
                                            service: serviceEndpoints.removeCategory,
                                            sideEffectWhenOkResponse: function () {
                                                store.dispatch({
                                                    type: 'MAKE_GET_CALL_SERVICE',
                                                    data: {
                                                        service: serviceEndpoints.getCategories
                                                    }
                                                })
                                            }
                                        }
                                    })
                                } else if (event.name === 'ADD_CATEGORY_PRESSED') {
                                    store.dispatch({
                                        type: 'MAKE_POST_SERVICE_CALL',
                                        data: {
                                            request: { category: event.category },
                                            service: serviceEndpoints.addCategory,
                                            sideEffectWhenOkResponse: function () {
                                                store.dispatch({
                                                    type: 'MAKE_GET_CALL_SERVICE',
                                                    data: {
                                                        service: serviceEndpoints.getCategories
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }}
                        />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default App;
