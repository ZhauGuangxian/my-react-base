
import { combineReducers } from 'redux';
import user from './modules/user/index.js';
import system from './modules/system/index.ts';
export default combineReducers({
    user,
    system
});
