import { combineReducer } from '@/myRedux/index';
import user from './reducers/user';
import game from './reducers/games';

export default combineReducer({
    user,
    game
});
