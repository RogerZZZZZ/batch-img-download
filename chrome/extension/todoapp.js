import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import './todoapp.css';

const sendMessage = () => {
  console.log('sssssss')

  chrome.tabs.getCurrent((tab) => {
    chrome.runtime.sendMessage(tab.id, {
      data: 'Hello world!',
      type: 'trigger',
    }, response => console.log(response))
  })
}

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');

  const createStore = require('../../app/store/configureStore');

  console.log('--------')

  ReactDOM.render(
    <Root store={createStore(initialState)} onTrigger={sendMessage} />,
    document.querySelector('#root')
  );
});
