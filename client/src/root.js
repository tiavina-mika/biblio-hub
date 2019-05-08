import React from 'react';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { getStorage } from './utils/local-storage';
import 'moment/locale/fr';
import configStore, {history } from './redux/store';

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