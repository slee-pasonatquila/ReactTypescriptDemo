///<reference path="../../../typings/browser.d.ts"/>
import * as TodoAction from "../actions/todoActions";
import * as TodoModel from "../models/todoModels";
import assign = require('object-assign');

// todoを追加する
function addTodo(state: TodoModel.TodoList, payload: TodoAction.AddTodoPayload) {
	let todos: {[key: number]: TodoModel.Todo} = <{ [key: number]: TodoModel.Todo }>assign({}, state.todos);
	let todo: TodoModel.Todo = new TodoModel.Todo(payload.text);
	todos[todo.id] = todo;
	return <TodoModel.TodoList>assign({}, state, <TodoModel.TodoList>{
		todos: todos,
	});
}

// 対象のTODOのcompletedを切り替える
function toggleTodo(state: TodoModel.TodoList, payload: TodoAction.ToggleTodoPayload) {
	let todos: {[key: number]: TodoModel.Todo} = <{ [key: number]: TodoModel.Todo }>assign({}, state.todos);
	let target: TodoModel.Todo = <TodoModel.Todo>assign({}, todos[payload.id]);
	target.completed = !target.completed;
	todos[payload.id] = target;
	return <TodoModel.TodoList>assign({}, state, <TodoModel.TodoList>{ todos: todos});
}

// 対象のTODOを削除する
function deleteTodo(state: TodoModel.TodoList, payload: TodoAction.DeleteTodoPayload) {
	let todos: {[key: number]: TodoModel.Todo} = <{ [key: number]: TodoModel.Todo }>assign({}, state.todos);
	delete todos[payload.id];
	return <TodoModel.TodoList>assign({}, state, <TodoModel.TodoList>{ todos: todos});
}

// todoアプリの処理をディスパッチする
export function todos(state: TodoModel.TodoList = new TodoModel.TodoList(), action: TodoAction.IAction<any>) {
	switch (action.type) {
		case TodoAction.Types.AddTodo:
			return addTodo(state, <TodoAction.AddTodoPayload>action.payload);
		case TodoAction.Types.ToggleTodo:
			return toggleTodo(state, <TodoAction.ToggleTodoPayload>action.payload);
		case TodoAction.Types.DeleteTodo:
			return deleteTodo(state, <TodoAction.DeleteTodoPayload>action.payload);
		default:
			return state;
	}
}
