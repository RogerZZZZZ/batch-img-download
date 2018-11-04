import React from 'react';
import ReactDOM from 'react-dom';
import PopUp from 'APP/containers/popup/PopUp';

const runExtract = (conf) => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, Object.assign(conf, { type: 'beginSign' }), response => window.close())
  })
}

const stopExtract = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'stopSign' }, response => window.close())
  })
}

ReactDOM.render(
  <PopUp runExtract={runExtract} stopExtract={stopExtract}/>,
  document.querySelector('#root')
)
