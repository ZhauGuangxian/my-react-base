import React from 'react';
import ReactDom from 'react-dom';
import renderRoutes from '@/routes/guard.jsx';
import { HashRouter } from 'react-router-dom';
import routeConfig from './routes/conf.js';

import { Provider } from 'mobx-react';
import appState from '@/mobxStore/index';
import '../src/styles/public.less';
// import store from '@/store/index'; // 使用redux

const render = () => {
    ReactDom.render(
        <Provider appState={appState}>
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
