import { combineReducers } from 'redux';
import { user } from './redux/user.redux';
import { friend } from './redux/friend.redux';
import { chat } from './redux/chat.redux';

export default combineReducers({user, friend, chat});


