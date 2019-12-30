
import React from "react";
import { hot } from 'react-hot-loader/root';
import AddPageComponentMaker from './addPage/component';
import headerImage from '../assets/bo_header_2018.png'

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
      <div className="card">
        <img className="img" width="500px" src={headerImage} alt="header image" />
        {store.getState().navigation.page === 'startPage' && (
          <AddPageComponent
            store={store}
            state={store.getState()}
          />
        )}

        {store.getState().page === 'addPage' && (
          <AddPageComponent />
        )}

      </div>
    );
  }
}

export default hot(App);
