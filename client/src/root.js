import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'moment/locale/fr';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import configStore, { history } from './redux/store';

import App from './app';

const store = configStore()

const Root = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
)

export default Root;