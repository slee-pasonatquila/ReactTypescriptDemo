///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react';
import * as TodoModel from "../models/todoModels";
import * as TodoAction from "../actions/todoActions";
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export interface ITodoGridPageProps extends React.Props<{}> {
	todoList?: TodoModel.TodoList;
	dispatch?: Redux.Dispatch;
}

export class TodoGridPage extends React.Component<ITodoGridPageProps, {}> {
	public render() {
		let { todoList, dispatch }: ITodoGridPageProps = this.props;
		let rowData;
		if (todoList.count() === 0) {
			rowData = <span value='NO DATA FOUND'/>;
		}else {
			rowData = todoList.map((row) => (
				<TableRow key={row.id} selected={row.completed}>
					<TableRowColumn>{row.id}</TableRowColumn>
					<TableRowColumn><TextField defaultValue={row.text}/></TableRowColumn>
					<TableRowColumn><Checkbox defaultChecked={row.completed}/></TableRowColumn>
				</TableRow>
			))
		}
		return (
			<div>
			<Paper zDepth={1}>
				<Table height={300} fixedHeader={true} fixedFooter={true} selectable={true} multiSelectable={true}>
					<TableHeader displaySelectAll={true} adjustForCheckbox={true} enableSelectAll={true}>
						<TableRow>
							<TableHeaderColumn colSpan="3" tooltip="TODO 一覧" style={{textAlign: 'center'}}>
								TODO 一覧
							</TableHeaderColumn>
						</TableRow>
						<TableRow>
							<TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
							<TableHeaderColumn tooltip="内　容">内　容</TableHeaderColumn>
							<TableHeaderColumn tooltip="ステータス">完了フラグ</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={true} deselectOnClickaway={false} showRowHover={true} stripedRows={false}>
						{rowData}
					</TableBody>
				</Table>
			</Paper>
			</div>
		);
	}
}
