///<reference path="../../typings/browser.d.ts"/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createHashHistory} from 'history';
import {Router, Route, IndexRoute} from 'react-router';
import {ReduxTodoApp, ReduxTodoListPage, ReduxTodoListManagePage, ReduxTodoGridPage} from './components';
import {Provider} from 'react-redux';
import * as Redux from 'redux';
import * as Reducers from './reducers';

let history: any = createHashHistory();
let routes: JSX.Element = (
	<Router history={history}>
		<Route path='/' component={ReduxTodoApp} >
			<IndexRoute component={ReduxTodoListPage} />
			<Route path='/manage' component={ReduxTodoListManagePage} />
			<Route path='/grid' component={ReduxTodoGridPage} />
		</Route>
	</Router>
);

let store: Redux.Store = Redux.createStore(Reducers.todoApp);

ReactDOM.render(
	<Provider store={store}>
		{routes}
	</Provider>,
	document.getElementById('content')
);
