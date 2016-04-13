///<reference path="../../../typings/browser.d.ts"/>
import * as Reducers from '../reducers/index';
import * as ReactRedux from 'react-redux';
import {ITodoListPageProps, TodoListPage} from "./todoListPage";
import {ITodoListManagePageProps, TodoListManagePage} from "./todoMngPage";
import {ITodoGridPageProps, TodoGridPage} from "./todoGridPage";
import {ITodoAppProps, TodoApp} from "./todoApp";

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
function selectTodoListPage(state: Reducers.ITodoAppState): ITodoListPageProps {
	'use strict';
	return {
		todoList: state.todos
	};
}
export const reduxTodoListPage: __React.ComponentClass<any> = ReactRedux.connect(selectTodoListPage)(TodoListPage);

function selectTodoListManagePage(state: Reducers.ITodoAppState): ITodoListManagePageProps {
	'use strict';
	return {
		todoList: state.todos
	};
}
export const reduxTodoListManagePage: __React.ComponentClass<any> = ReactRedux.connect(selectTodoListManagePage)(TodoListManagePage);

function selectTodoGridPage(state: Reducers.ITodoAppState): ITodoGridPageProps {
	'use strict';
	return {
		todoList: state.todos
	};
}

export const reduxTodoGridPage: __React.ComponentClass<any> = ReactRedux.connect(selectTodoGridPage)(TodoGridPage);

function selectTodoApp(state: Reducers.ITodoAppState): ITodoAppProps {
	'use strict';
	return {
		todoList: state.todos
	};
}

export const reduxTodoApp: __React.ComponentClass<any> = ReactRedux.connect(selectTodoApp)(TodoApp);
