import React from "react";
import AddPageComponentMaker from './page/addPage/component';
import receiptPageMaker from './page/recepitPage/component';
import overViewPageMaker from './page/overViewPage/component';
import headerImage from '../assets/bo_header_2018.png';
import favicon from '../assets/favicon.ico';
import * as core from './core';
import serviceEndpoints from '../serviceEndpoints.json'

const AddPageComponent = AddPageComponentMaker();
const ReceiptPage = receiptPageMaker();
const OverViewPage = overViewPageMaker();

class App extends React.Component {
  componentDidMount() {
    // We need to do this to make react rerender when the start changes.
    // Other solutions would be to use provider: https://react-redux.js.org/api/provider
    this.props.store.subscribe(() => {
      this.setState({});
    })
  }

  // IMPLEMENTERA BULMA

  render() {
    const { store } = this.props;
    const state = store.getState();

    return (
      <React.Fragment>
        <nav className="navbar navbar-inverse fixed-top">
          <img className="img" width="300px" src={headerImage} alt="header image" />
        </nav>
        {core.getActivePage(state) === core.pages.overViewPage && (
          <OverViewPage
            store={store}
            state={state}
            triggerEvent={(event) => {

            }}
          />
        )}
        {core.getCurrentPage(state) === core.pages.addPage && (
          <AddPageComponent
            store={store}
            state={state}
            triggerEvent={(event) => {
              if (event.name === 'FAULT_REPORT_ADDED') {
                store.dispatch({
                  type: 'GO_TO_RECEIPT_PAGE'
                })
              } else if (event.name === 'FORM_SUBMITTED')
                store.dispatch({
                  type: 'MAKE_POST_SERVICE_CALL',
                  request: core.getAddFaultReportRequest(state),
                  service: serviceEndpoints.addFaultReport,
                  sideEffectWhenOkResponse: function () {
                    store.dispatch({
                      type: 'GO_TO_RECEIPT_PAGE'
                    })
                  }
                })
            }}
          />
        )}

        {core.getActivePage(state) === 'receiptPage' && (
          <ReceiptPage />
        )}
      </React.Fragment>
    );
  }
}

export default App;
