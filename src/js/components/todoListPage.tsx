///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react';
import {getMuiTheme, Colors} from 'material-ui/lib/styles';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import * as TodoModel from "../models/todoModels";
import * as TodoAction from "../actions/todoActions";
import * as MsgAction from "../actions/msgActions";
import * as MsgModel from "../models/msgModels";
import {TodoListComposer} from "./todoList";
import {TodoFormComposer} from "./todoForm";

export interface ITodoListPageProps extends React.Props<{}> {
	todoList?: TodoModel.TodoList;
	msgs?: MsgModel.AlertMessage;
	dispatch?: Redux.Dispatch;
}

export class TodoListPage extends React.Component<ITodoListPageProps, {}> {
	public render() {
		const muiTheme: __MaterialUI.Styles.MuiTheme = getMuiTheme(
			{
				palette: {
					textColor: Colors.cyan500,
				},
			}, {
				appBar: {
					height: 50,
				},
			});
		let { todoList, dispatch }: ITodoListPageProps = this.props;
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<div className="row">
						<TodoListComposer todos={TodoModel.TodoUtils.toList(todoList.todos)}
							onToggle={(x: any) => {dispatch(TodoAction.toggleTodo(x));dispatch(MsgAction.toggleMsg('TODO状態を変更しました。', true));}}/>
					</div>
					<TodoFormComposer
						onAddTodo={(x: string) => {dispatch(TodoAction.addTodo(x));dispatch(MsgAction.toggleMsg('TODOを追加しました。', true));}}
						open={false}/>
				</div>
			</MuiThemeProvider>
		);
	}
}
