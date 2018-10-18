import React from 'react'
import ReactDOM from 'react-dom'
import TabRoot from '../../../app/containers/TabRoot'
import './tab.css'

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');

  const createStore = require('../../../app/store/configureStore');

  ReactDOM.render(
    <TabRoot store={createStore(initialState)} />,
    document.querySelector('#root')
  );
})
