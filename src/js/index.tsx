///<reference path="../../typings/browser.d.ts"/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createHashHistory} from 'history';
import {Router, Route, IndexRoute} from 'react-router';
import {reduxTodoApp, reduxTodoListPage, reduxTodoListManagePage, reduxTodoGridPage} from './components';
import {Provider} from 'react-redux';
import * as Redux from 'redux';
import * as Reducers from './reducers';
import * as createLogger from 'redux-logger';

let history: any = createHashHistory();
const logger = createLogger();

let routes: JSX.Element = (
	<Router history={history}>
		<Route path='/' component={reduxTodoApp} >
			<IndexRoute component={reduxTodoListPage} />
			<Route path='/manage' component={reduxTodoListManagePage} />
			<Route path='/grid' component={reduxTodoGridPage} />
		</Route>
	</Router>
);

let store: Redux.Store = Redux.createStore(Reducers.todoApp, Redux.applyMiddleware(logger));

ReactDOM.render(
	<Provider store={store}>
		{routes}
	</Provider>,
	document.getElementById('content')
);
