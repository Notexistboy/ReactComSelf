/**
 * 入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom' //rrd
import App from './app'
/* import admin from './pages/admin'
import about from './pages/about'
import repos from './pages/repos'
 */
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
