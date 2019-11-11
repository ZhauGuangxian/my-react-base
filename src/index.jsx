import React from 'react';
import ReactDom from 'react-dom';
// import {renderRoutes} from 'react-router-config';
import renderRoutes from '@/routes/guard.jsx';
import { BrowserRouter} from 'react-router-dom';
import routeConfig from './routes/conf.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import '../src/styles/public.less';
import 'antd/dist/antd.css';
import Reducer from '@/store/index.js'
export const store = createStore(Reducer);

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter >
            {renderRoutes(routeConfig)}
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
)