import * as types from '../constants/ActionTypes';
import { createAction } from 'redux-actions';

export const toggleComplete = createAction(types.TOGGLE_COMPLETE,
										targetId => ({ itemId: targetId }));
export const changeFilter = createAction(types.CHANGE_FILTER,
										targetFilter => ({ filter: targetFilter }));
export const editItem = createAction(types.EDIT_ITEM, targetId => ({ itemId: targetId }));
export const doneEditing = createAction(types.DONE_EDITING,
	(targetId, pText) => ({ itemId: targetId, newText: pText }));
export const cancelEditing = createAction(types.CANCEL_EDITING, targetId => ({ itemId: targetId }));
export const clearCompleted = createAction(types.CLEAR_COMPLETED);
export const deleteItem = createAction(types.DELETE_ITEM, targetId => ({ itemId: targetId }));
export const addItem = createAction(types.ADD_ITEM, text => ({ pText: text }));
export const addItemSync = createAction(types.ADD_ITEM_SYNC, text => ({ pText: text }));
