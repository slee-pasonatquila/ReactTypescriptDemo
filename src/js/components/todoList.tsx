///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react';
import * as TodoModel from "../models/todoModels";
import {Paper} from 'material-ui';
import {List} from 'material-ui';
import Subheader from 'material-ui';
import {TodoComposer} from "./todoItem";

// todoのリスト
interface ITodoListComposerProps extends React.Props<{}> {
	todos: TodoModel.Todo[];
	onToggle: (id: number) => void;
}

export class TodoListComposer extends React.Component<ITodoListComposerProps, {}> {
	public render() {
		let todos: JSX.Element[] = this.props.todos.map(
			(x: TodoModel.Todo, index: number) =>
				<TodoComposer key={index} todo={x} onToggle={(target: any) => this.props.onToggle(target)}/>
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
