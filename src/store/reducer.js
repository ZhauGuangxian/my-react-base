import user from './modules/user/index';
import porn from './modules/porn/index';

import { combineReducers } from 'redux';

export default combineReducers({
    user,
    porn
});
