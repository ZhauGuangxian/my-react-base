import React from 'react';
import ReactDom from 'react-dom';
import renderRoutes from '@/routes/guard.jsx';
import { HashRouter } from 'react-router-dom';
import routeConfig from './routes/conf.js';

import { Provider } from 'react-redux';
import '../src/styles/public.less';
import store from '@/store/index';

const render = () => {
    ReactDom.render(
        <Provider store={store}>
            <HashRouter>{renderRoutes(routeConfig)}</HashRouter>
        </Provider>,
        document.getElementById('root')
    );
};

render();

if (module.hot) {
    module.hot.accept('./app', () => {
        render();
    });
}
