import React from 'react';
import ReactDOM from 'react-dom';
import PopUp from 'APP/containers/popup/PopUp';

const runExtract = (conf) => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, conf, response => window.close())
  })
}

ReactDOM.render(
  <PopUp runExtract={runExtract}/>,
  document.querySelector('#root')
)
