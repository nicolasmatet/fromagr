import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import '../public/favicon.ico';
import '../public/manifest.json';
import '../public/logo192.png';
import ToggleColorMode from './App';

ReactDOM.render(
  <BrowserRouter>
    <ToggleColorMode/>
  </BrowserRouter>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
