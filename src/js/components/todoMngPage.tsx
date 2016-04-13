///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react';
import * as TodoModel from "../models/todoModels";
import * as TodoAction from "../actions/todoActions";
import {TodoListComposer} from "./todoList";

// todo削除ページ
export interface ITodoListManagePageProps extends React.Props<{}> {
	todoList?: TodoModel.TodoList;
	dispatch?: Redux.Dispatch;
}

export class TodoListManagePage extends React.Component<ITodoListManagePageProps, {}> {
	public render() {
		let { todoList, dispatch }: ITodoListManagePageProps = this.props;
		return (
			<div className="row">
				<TodoListComposer
					todos={TodoModel.TodoUtils.toList(todoList.todos) }
					onToggle={(x: any) => this.delTodo(x, dispatch)}/>
			</div>
		);
	}
	private delTodo(x: any, dispatch: any) {
		if (window.confirm('該当TODOを削除します、よろしいでしょうか？')) {
			dispatch(TodoAction.deleteTodo(x));
		}
	}
}
