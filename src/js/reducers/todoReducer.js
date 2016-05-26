import { Map, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import showMsg from '../utils/msgUtils';
import * as MsgTypes from '../constants/MessageTypes';

function findItemIndex(state, action) {
	return state.get('todos').findIndex(
		(item) => item.get('id') === action.payload.itemId
	);
}

function setState(state, action) {
	return state.merge(action.newState);
}

function toggleComplete(state, action) {
	const itemIndex = findItemIndex(state, action);
	const updatedItem = state.get('todos')
							.get(itemIndex)
							.update('status', status => (status === 'active' ? 'completed' : 'active'));
	showMsg(MsgTypes.MSG_INFO, 'Todo status is changed.');
	return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function changeFilter(state, action) {
	showMsg(MsgTypes.MSG_INFO, 'Filter is changed.');
	return state.set('filter', action.payload.filter);
}

function editItem(state, action) {
	const itemIndex = findItemIndex(state, action);
	const updatedItem = state.get('todos')
							.get(itemIndex)
							.set('editing', true);
	showMsg(MsgTypes.MSG_INFO, 'Edit starting.');
	return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function cancelEditing(state, action) {
	const itemIndex = findItemIndex(state, action);
	const updatedItem = state.get('todos')
							.get(itemIndex)
							.set('editing', false);
	showMsg(MsgTypes.MSG_INFO, 'edit is canceled');
	return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function doneEditing(state, action) {
	const itemIndex = findItemIndex(state, action);
	const updatedItem = state.get('todos')
							.get(itemIndex)
							.set('editing', false)
							.set('text', action.payload.newText);
	showMsg(MsgTypes.MSG_INFO, 'Todo is changed.');
	return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function clearCompleted(state) {
	showMsg(MsgTypes.MSG_WARNING, 'Delete the Todos which is completed.');
	return state.update('todos',
		(todos) => todos.filterNot(
			(item) => item.get('status') === 'completed'
		)
	);
}

function addItem(state, action) {
	const itemId = state.get('todos').reduce((maxId, item) => Math.max(maxId, item.get('id')), 0) + 1;
	const newItem = Map({
		id: itemId,
		text: action.payload.pText,
		status: 'active' });
	return state.update('todos', todos => todos.push(newItem));
}

function deleteItem(state, action) {
	showMsg(MsgTypes.MSG_WARNING, 'Todo is deleted.');
	return state.update('todos',
		todos => todos.filterNot(
			(item) => item.get('id') === action.payload.itemId
		)
	);
}

export const todoReducer = handleActions({
	['SET_STATE']: setState,
	['TOGGLE_COMPLETE']: toggleComplete,
	['CHANGE_FILTER']: changeFilter,
	['EDIT_ITEM']: editItem,
	['CANCEL_EDITING']: cancelEditing,
	['DONE_EDITING']: doneEditing,
	['CLEAR_COMPLETED']: clearCompleted,
	['ADD_ITEM']: addItem,
	['DELETE_ITEM']: deleteItem
}, Map({
	todos: fromJS([
		{ id: 1, text: 'React', status: 'active', editing: false },
		{ id: 2, text: 'Redux', status: 'active', editing: false },
		{ id: 3, text: 'Immutable', status: 'active', editing: false }
	]),
	filter: 'all'
}));
