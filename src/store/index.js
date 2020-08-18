/*
 * @Author: your name
 * @Date: 2019-12-12 19:25:32
 * @LastEditTime : 2020-08-17 15:50:37
 * @LastEditors  : wanglinghui
 * @Description: In User Settings Edit
 * @FilePath: \tax-data-service-ui\src\store\index.js
 */
import { createStore, applyMiddleware, compose } from 'redux';
import Reducer from './reducer.js';

import createSagaMiddleWare from 'redux-saga';
import mySagas from './mySaga.js';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleWare = createSagaMiddleWare();
const enhancer = composeEnhancer(applyMiddleware(sagaMiddleWare));
const store = createStore(Reducer, enhancer);
sagaMiddleWare.run(mySagas);

export default store;
