import { combineReducers } from 'redux';
import { user } from './redux/user.redux';
import { friend } from './redux/friend.redux';

export default combineReducers({user, friend});


