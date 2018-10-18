import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Tab from './Tab';

export default class TabRoot extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Tab />
      </Provider>
    );
  }
}
