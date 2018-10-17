import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';

export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    onTrigger: PropTypes.func.isRequired,
  };

  render() {
    const { store, onTrigger } = this.props;
    return (
      <Provider store={store}>
        <App onTrigger={onTrigger} />
      </Provider>
    );
  }
}
