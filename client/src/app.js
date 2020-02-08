import React from "react";

import AddPageComponentMaker from './page/addPage/component';
import receiptPageMaker from './page/recepitPage/component';
import overviewPageMaker from './page/overViewPage/component';
import detailsPageMaker from './page/detailPage/component';
import adminPageMaker from './page/adminPage/component';

import headerImage from '../assets/bo_header_2018.png';
import favicon from '../assets/favicon.ico';
import * as core from './core';
import serviceEndpoints from '../serviceEndpoints.json'

import buttonMaker from './components/button';

const AddPageComponent = AddPageComponentMaker();
const ReceiptPage = receiptPageMaker();
const OverviewPage = overviewPageMaker();
const DetailsPage = detailsPageMaker();
const AdminPage = adminPageMaker();

const Button = buttonMaker();

class App extends React.Component {
  componentDidMount() {
    // We need to do this to make react rerender when the start changes.
    // Other solutions would be to use provider: https://react-redux.js.org/api/provider
    this.props.store.subscribe(() => {
      this.setState({});
    })
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
              type="nav"
              label={'Admin'}
              onClick={function () {
                store.dispatch({
                  type: 'GO_TO_PAGE',
                  page: core.pages.admin
                })
              }}
            />

            <Button
              type="nav"
              label={'Översikt'}
              onClick={function () {
                console.log('CLICKED')
                store.dispatch({
                  type: 'GO_TO_PAGE',
                  page: core.pages.overview
                })
              }}
            />

            <Button
              type="nav"
              label={'Ny felanmälan'}
              onClick={function () {
                store.dispatch({
                  type: 'GO_TO_PAGE',
                  page: core.pages.add
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
                    id: event.id
                  })
                  store.dispatch({
                    type: 'GO_TO_PAGE',
                    page: core.pages.details
                  })
                } else if (event.name === 'COMPONENT_MOUNTED') {
                  store.dispatch({
                    type: 'MAKE_GET_CALL_SERVICE',
                    request: {},
                    service: serviceEndpoints.getFaultReports
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
                    page: core.pages.overview
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
                if (event.name === 'FAULT_REPORT_ADDED') {
                  store.dispatch({
                    type: 'GO_TO_PAGE',
                    page: core.pages.receipt
                  })
                } else if (event.name === 'FORM_SUBMITTED') {
                  store.dispatch({
                    type: 'MAKE_POST_SERVICE_CALL',
                    request: core.getAddFaultReportRequest(state),
                    service: serviceEndpoints.addFaultReport,
                    sideEffectWhenOkResponse: function () {
                      store.dispatch({
                        type: 'GO_TO_PAGE',
                        page: core.pages.receipt
                      })
                    }
                  })
                } else if (event.name === 'PAGE_MOUNTED') {
                  store.dispatch({
                    type: 'MAKE_GET_CALL_SERVICE',
                    request: {},
                    service: serviceEndpoints.getReporters
                  })
                } else if (event.name === 'FORM_UPDATED') {
                  store.dispatch({
                    type: 'UPDATE_ADD_FAULT_REPORT_FORM',
                    data: event.data,
                    inputField: event.inputField
                  })
                } else if (event.name === 'CLEAN_PRESSED') {
                  store.dispatch({
                    type: 'CLEAN_ADD_FAULT_REPORT_FORM'
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
                    type: 'MAKE_GET_CALL_SERVICE',
                    request: {},
                    service: serviceEndpoints.getReporters
                  })
                } else if (event.name === 'REMOVE_REPORTER_CLICKED') {
                  store.dispatch({
                    type: 'MAKE_PUT_CALL_SERVICE',
                    request: { id: event.id },
                    service: serviceEndpoints.removeReporter,
                    sideEffectWhenOkResponse: function () {
                      store.dispatch({
                        type: 'MAKE_GET_CALL_SERVICE',
                        request: {},
                        service: serviceEndpoints.getReporters
                      })
                    }
                  })
                }
              }}
            />
          )}

          {core.getActivePage(state) === core.pages.receipt && (
            <ReceiptPage
              state={state}
              store={store}
              triggerEvent={() => null}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
