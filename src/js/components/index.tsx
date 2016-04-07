///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react';
import * as Reducers from '../reducers/index';
import * as ReactRedux from 'react-redux';
import {Link, IndexLink} from 'react-router';
import {ITodoListPageProps, TodoListPage} from "./todoListPage";
import {ITodoListManagePageProps, TodoListManagePage} from "./todoMngPage";
import {ITodoGridPageProps, TodoGridPage} from "./todoGridPage";
import {MsgBar} from "./msgBar";
import * as TodoModel from "../models/todoModels";
import * as MsgModel from "../models/msgModels";
import * as MsgAction from '../actions/msgActions';

import injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

function selectTodoListPage(state: Reducers.ITodoAppState): ITodoListPageProps {
	return {
		todoList: state.todos,
		msgs: state.msgs,
	};
}
export const ReduxTodoListPage = ReactRedux.connect(selectTodoListPage)(TodoListPage);

function selectTodoListManagePage(state: Reducers.ITodoAppState): ITodoListManagePageProps {
	return {
		todoList: state.todos,
		msgs: state.msgs,
	};
}
export const ReduxTodoListManagePage = ReactRedux.connect(selectTodoListManagePage)(TodoListManagePage);

function selectTodoGridPage(state: Reducers.ITodoAppState): ITodoGridPageProps {
	return {
		todoList: state.todos,
		msgs: state.msgs,
	};
}

export const ReduxTodoGridPage = ReactRedux.connect(selectTodoGridPage)(TodoGridPage);

interface ITodoAppProps extends React.Props<{}> {
	todoList?: TodoModel.TodoList;
	msgs?: MsgModel.AlertMessage;
	dispatch?: Redux.Dispatch;
}

export class TodoApp extends React.Component<ITodoAppProps, {}> {
	public render() {
		return (
			<div>
				<div className="row">
					<h5 className="blue-text text-light-2">TODOアプリ</h5>
					<blockquote className="grey-text text-light-2"> With React Redux Typescript MaterialUI</blockquote>
					<div className="col offset-s3 s6">
						<IndexLink to="/" className="waves-effect waves-light btn light-green">
						<i className="fa fa-list"></i>&nbsp;TODOリスト</IndexLink>&nbsp;
						<Link to="/manage" className="waves-effect waves-teal btn yellow"><i className="fa fa-gears"/>&nbsp;管理</Link>&nbsp;
						<Link to="/grid" className="waves-effect waves-teal btn cyan"><i className="fa fa-gears"/>&nbsp;一覧</Link>
					</div>
				</div>
				{this.props.children}
				<div className="row">
					<MsgBar msg={this.props.msgs} onToggle={(msg: string, isShow: boolean) => this.props.dispatch(MsgAction.toggleMsg(msg, isShow))} />
				</div>
			</div>
		);
	}
}

function selectTodoApp(state: Reducers.ITodoAppState): ITodoAppProps {
	return {
		todoList: state.todos,
		msgs: state.msgs
	};
}

export const ReduxTodoApp = ReactRedux.connect(selectTodoApp)(TodoApp);
