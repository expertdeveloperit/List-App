import ListReducer from './list-reducer';
import userReducer from './user-reducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
	user:userReducer,
	lists:ListReducer
});


export default reducers;