import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import * as serviceWorker from './serviceWorker';
import Root from './root';
import './index.css';

WebFont.load({
    google: {
      families: ['Nunito:300,400,700', 'Century Gothic Regular:300,400,700', 'sans-serif']
    }
});
ReactDOM.render(
    <Root />,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
