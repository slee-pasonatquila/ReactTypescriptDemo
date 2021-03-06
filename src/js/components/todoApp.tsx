///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react';
import {Link, IndexLink} from 'react-router';
import * as TodoModel from "../models/todoModels";
import Alert from 'react-s-alert';

export interface ITodoAppProps extends React.Props<{}> {
	todoList?: TodoModel.TodoList;
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
						<IndexLink to="/" className="waves-effect waves-light btn blue light-2">
						<i className="fa fa-list"></i>&nbsp;TODOリスト</IndexLink>&nbsp;
						<Link to="/manage" className="waves-effect waves-teal btn lime light-2"><i className="fa fa-gears"/>&nbsp;管理</Link>&nbsp;
						<Link to="/grid" className="waves-effect waves-teal btn grey light-2"><i className="fa fa-gears"/>&nbsp;一覧</Link>
					</div>
				</div>
				{this.props.children}
				<div className="row">
					<Alert stack={{limit: 3}} />
				</div>
			</div>
		);
	}
}