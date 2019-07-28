import React from 'react';
import ReactDom from 'react-dom';
import {renderRoutes} from 'react-router-config';
import { BrowserRouter, HashRouter} from 'react-router-dom';
import routeConfig from './routes/conf.js';
import '../src/styles/public.less';
ReactDom.render(
    <BrowserRouter>
        <div className="app-container">
            react-local-player
        </div>
        {renderRoutes(routeConfig)}
        
    </BrowserRouter>,
    document.getElementById('root')
)