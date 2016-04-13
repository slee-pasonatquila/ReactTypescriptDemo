///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react';
import * as TodoModel from "../models/todoModels";
import * as TodoAction from "../actions/todoActions";
import {TodoListComposer} from "./todoList";
import Alert from "react-s-alert";

// todo削除ページ
export interface ITodoListManagePageProps extends React.Props<{}> {
	todoList?: TodoModel.TodoList;
	dispatch?: Redux.Dispatch;
}

export class TodoListManagePage extends React.Component<ITodoListManagePageProps, {}> {
	public render() {
		let doDel = (x: any): void => {
			this.delTodo(x, dispatch);
			Alert.success('TODOを削除しました。', {
				position: 'top-right',
				effect: 'scale',
				beep: false,
				timeout: 2000,
				offset: 100,
			});
		};
		let { todoList, dispatch }: ITodoListManagePageProps = this.props;
		return (
			<div className="row">
				<TodoListComposer
					todos={TodoModel.TodoUtils.toList(todoList.todos) }
					onToggle={doDel}/>
			</div>
		);
	}
	private delTodo(x: any, dispatch: any) {
		if (window.confirm('該当TODOを削除します、よろしいでしょうか？')) {
			dispatch(TodoAction.deleteTodo(x));
		}
	}
}
