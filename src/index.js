import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {configureStore, history} from "./store/configureStore";

const store = configureStore();

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <App/>
            </div>
        </ConnectedRouter>
    </Provider>
    ,
    document.getElementById('root')
);
registerServiceWorker();
