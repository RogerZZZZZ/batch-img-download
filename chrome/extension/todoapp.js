import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'APP/containers/Root';
import './todoapp.css';

const sendMessage = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      message: 'Hello world'
    }, response => console.log(response))
  })
}

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');

  const createStore = require('APP/store/configureStore');

  ReactDOM.render(
    <Root store={createStore(initialState)} onTrigger={sendMessage} />,
    document.querySelector('#root')
  );
});
