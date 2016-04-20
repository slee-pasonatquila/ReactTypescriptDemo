///<reference path="../../../typings/browser.d.ts"/>
import * as TodoAction from "../actions/todoActions";
import * as TodoModel from "../models/todoModels";
import { handleActions } from 'redux-actions';
import Alert from "react-s-alert";
import * as immutable from "immutable";

const initialState = immutable.List<TodoModel.Todo>([]);

function AddTodoPayload(state = initialState, action) {
	"use strict";
	let todos = state.push(new TodoModel.Todo(action.payload.text));
	Alert.success('TODOを追加しました。', {
				position: 'top-right',
				effect: 'scale',
				beep: false,
				timeout: 2000,
				offset: 100,
			});
	return todos;
}

function ToggleTodoPayload(state = initialState, action) {
	"use strict";
	let targetIndex = state.findIndex((val) => {
		return val.id === action.payload.id;
	});
	let target = state.get(targetIndex);
	let newTarget = new TodoModel.Todo(target.text);
	newTarget.id = target.id;
	newTarget.completed = !target.completed;
	Alert.success('TODO状態を更新しました。', {
				position: 'top-right',
				effect: 'scale',
				beep: false,
				timeout: 2000,
				offset: 100,
			});
	let todos = state.set(targetIndex, newTarget);
	return todos;
}

function DeleteTodoPayload(state = initialState, action) {
	"use strict";
	Alert.success('TODOを削除しました。', {
				position: 'top-right',
				effect: 'scale',
				beep: false,
				timeout: 2000,
				offset: 100,
			});
	let targetIndex = state.findIndex((val) => {
		return val.id === action.payload.id;
	});
	let todos = state.delete(targetIndex);
	return todos;
}

export const todoActions = handleActions({
	[TodoAction.Types.AddTodo] : AddTodoPayload,
	[TodoAction.Types.ToggleTodo] : ToggleTodoPayload,
	[TodoAction.Types.DeleteTodo] : DeleteTodoPayload,
}, initialState);
