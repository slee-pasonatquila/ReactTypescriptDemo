import { todoReducer } from './todoReducer';
import { msgReducer } from './msgReducer';
import { combineReducers } from 'redux';
export default combineReducers({
	todoReducer,
	msgReducer
});
