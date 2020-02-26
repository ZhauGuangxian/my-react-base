import React from 'react';
import ReactDom from 'react-dom';
// import {renderRoutes} from 'react-router-config';
import RenderRoutes from '@/routes/guard2.jsx';
import { HashRouter} from 'react-router-dom';
import routeConfig from './routes/conf.ts';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import '../src/styles/public.less';
import Reducer from '@/store/index.js'
export const store = createStore(Reducer);

ReactDom.render(
    <Provider store={store}>
        <HashRouter >
            <RenderRoutes router={routeConfig}/>
        </HashRouter>
    </Provider>
    ,
    document.getElementById('root')
)