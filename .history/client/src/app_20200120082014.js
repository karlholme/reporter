import React from "react";
import AddPageComponentMaker from './page/addPage/component';
import headerImage from '../assets/bo_header_2018.png'
import favicon from '../assets/favicon.ico'

const AddPageComponent = AddPageComponentMaker();

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

    return (
      <React.Fragment>
        <nav className="navbar navbar-inverse fixed-top">
          <img className="img" width="300px" src={headerImage} alt="header image" />
        </nav>
        {store.getState().navigation.page === 'startPage' && (
          <AddPageComponent
            store={store}
            state={store.getState()}
            triggerEvent={(event) => {
              if (event.name === 'FAULT_REPORT_ADDED') {
                store.dispatch({
                  type: 'GO_TO_RECEIPT_PAGE'
                })
              } else if (event.name === 'FORM_SUBMITTED')
                store.dispatch({
                  type: 'CALL_SERVICE',
                  request: requestProvider.getAddFaultReportRequest(state),
                  service: serviceEndpoints.addFaultReport,
                  sideEffectWhenOkResponse: function () {
                    triggerEvent({ name: 'FAULT-REPORT-ADDED' })
                  }
                })
            }}
          />
        )}

        {store.getState().page === 'addPage' && (
          <AddPageComponent />
        )}
      </React.Fragment>
    );
  }
}

export default App;
