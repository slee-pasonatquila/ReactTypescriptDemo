///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react';
import * as TodoModel from "../models/todoModels";
import * as TodoAction from "../actions/todoActions";
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import * as Griddle from "griddle-react";

export interface ITodoGridPageProps extends React.Props<{}> {
	todoList?: TodoModel.TodoList;
	dispatch?: Redux.Dispatch;
}

export class TodoGridPage extends React.Component<ITodoGridPageProps, {}> {
	public render() {
		let { todoList, dispatch }: ITodoGridPageProps = this.props;
		let linkComp: React.ClassicComponentClass<{}> = React.createClass({
			render: function(){
				return (
					<Checkbox defaultChecked={this.props.rowData.completed}
						onClick={() => dispatch(TodoAction.toggleTodo(this.props.rowData.id))}/>
				);
			}
		});
		let inputComponent: React.ClassicComponentClass<{}> = React.createClass({
			render: function() {
				return <TextField type="text" fullWidth={true} defaultValue={this.props.rowData.text}/>;
			}
		});
		let cols = [
			{
				"columnName": "id",
				"order": 0,
				"displayName": "番号"
			},
			{
				"columnName": "text",
				"order": 1,
				"locked": false,
				"visible": true,
				"displayName": "内容",
				"customComponent": inputComponent
			},
			{
				"columnName": "completed",
				"displayName": "完了フラグ",
				"order": 2,
				"customComponent": linkComp
			}
		];
		return (
			<Griddle useGriddleStyles={false} columnMetadata={cols} results={TodoModel.TodoUtils.toList(todoList.todos)} />
		);
	}
}