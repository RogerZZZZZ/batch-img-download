import React from 'react'
import ReactDOM from 'react-dom'
import TabRoot from 'APP/containers/TabRoot'
import './tab.css'

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  console.log('state', state)
  const initialState = JSON.parse(state || '{}');

  const createStore = require('APP/store/configureStore');

  ReactDOM.render(
    <TabRoot store={createStore(initialState)} />,
    document.querySelector('#root')
  );
})
