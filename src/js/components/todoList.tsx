///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react';
import * as TodoModel from "../models/todoModels";
import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Subheader from 'material-ui/lib/Subheader';


// todo 1項目に対応するコンポーネント
interface ITodoComposerProps extends React.Props<{}> {
	todo: TodoModel.Todo;
	onToggle: (id: number) => void;
}

class TodoComposer extends React.Component<ITodoComposerProps, {}> {
	public render() {
		let todo: TodoModel.Todo = this.props.todo;
		let style: React.CSSProperties = {
			textDecoration: todo.completed ? 'line-through' : 'none'
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

// todoのリスト
interface ITodoListComposerProps extends React.Props<{}> {
	todos: TodoModel.Todo[];
	onToggle: (id: number) => void;
}

export class TodoListComposer extends React.Component<ITodoListComposerProps, {}> {
	public render() {
		let todos: JSX.Element[] = this.props.todos.map(
			(x: TodoModel.Todo) => <TodoComposer key={x.id} todo={x} onToggle={(target: any) => this.props.onToggle(target)}/>
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