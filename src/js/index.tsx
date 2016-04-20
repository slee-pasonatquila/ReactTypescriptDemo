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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

let history: any = createHashHistory();
const logger: Redux.Middleware = createLogger();

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
const muiTheme: __MaterialUI.Styles.MuiTheme = getMuiTheme(lightBaseTheme);
ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider muiTheme={muiTheme}>
		{routes}
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('content')
);
