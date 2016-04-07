///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import * as TodoModel from "../models/todoModels";

// todo 1項目に対応するコンポーネント
interface ITodoComposerProps extends React.Props<{}> {
	todo: TodoModel.Todo;
	onToggle: (id: number) => void;
}

export class TodoComposer extends React.Component<ITodoComposerProps, {}> {
	public render() {
		let todo: TodoModel.Todo = this.props.todo;
		let style: React.CSSProperties = {
			textDecoration: todo.completed ? 'line-through' : 'none',
		};
		let icon: string = todo.completed ? 'fa fa-check-square-o fa-2x' : 'fa fa-square-o fa-2x';
		let itemStyle: string = todo.completed ? 'collection-item grey lighten-5' : 'collection-item light-green lighten-5';
		return (
			<div>
			<Divider/>
			<ListItem className={itemStyle} onClick={() => this.props.onToggle(todo.id)}>
				<i className={icon}></i><span style={style}>{todo.text}</span>
			</ListItem>
			</div>
		);
	}
}