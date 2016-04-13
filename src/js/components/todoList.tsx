///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react';
import * as TodoModel from "../models/todoModels";
import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import {TodoComposer} from "./todoItem";
import Subheader from 'material-ui/lib/Subheader';
import Alert from "react-s-alert";

// todoのリスト
interface ITodoListComposerProps extends React.Props<{}> {
	todos: TodoModel.Todo[];
	onToggle: (id: number) => void;
}

export class TodoListComposer extends React.Component<ITodoListComposerProps, {}> {
	public render() {
		let doModifyTodo = (x: any): void => {
			this.props.onToggle(x);
			Alert.success('TODO状態を変更しました。', {
				position: 'top-right',
				effect: 'scale',
				beep: false,
				timeout: 2000,
				offset: 100,
			});
		};
		let todos: JSX.Element[] = this.props.todos.map(
			(x: TodoModel.Todo) => <TodoComposer key={x.id} todo={x} onToggle={doModifyTodo}/>
		);
		return (
			<Paper zDepth={1}>
				<List>
					<Subheader>TODO 一覧</Subheader>
					{todos}
				</List>
			</Paper>
		);
	}
}
