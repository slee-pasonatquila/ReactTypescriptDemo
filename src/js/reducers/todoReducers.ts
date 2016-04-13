///<reference path="../../../typings/browser.d.ts"/>
import * as TodoAction from "../actions/todoActions";
import * as TodoModel from "../models/todoModels";
import { handleActions } from 'redux-actions';
import assign = require('object-assign');

function AddTodoPayload(state, action) {
	let todos: {[key: number]: TodoModel.Todo} = <{ [key: number]: TodoModel.Todo }>assign({}, state.todos);
	let todo: TodoModel.Todo = new TodoModel.Todo(action.payload.text);
	todos[todo.id] = todo;
	return <TodoModel.TodoList>assign({}, state, <TodoModel.TodoList>{
		todos: todos,
	});
}

function ToggleTodoPayload(state, action) {
	let todos: {[key: number]: TodoModel.Todo} = <{ [key: number]: TodoModel.Todo }>assign({}, state.todos);
	let target: TodoModel.Todo = <TodoModel.Todo>assign({}, todos[action.payload.id]);
	target.completed = !target.completed;
	todos[action.payload.id] = target;
	return <TodoModel.TodoList>assign({}, state, <TodoModel.TodoList>{ todos: todos});
}

function DeleteTodoPayload(state, action) {
	let todos: {[key: number]: TodoModel.Todo} = <{ [key: number]: TodoModel.Todo }>assign({}, state.todos);
	delete todos[action.payload.id];
	return <TodoModel.TodoList>assign({}, state, <TodoModel.TodoList>{ todos: todos});
}

export const todos = handleActions({
	[TodoAction.Types.AddTodo] : AddTodoPayload,
	[TodoAction.Types.ToggleTodo] : ToggleTodoPayload,
	[TodoAction.Types.DeleteTodo] : DeleteTodoPayload,
}, {todos: []});
