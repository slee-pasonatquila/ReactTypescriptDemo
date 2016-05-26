import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import { TodoAppContainer } from './containers/TodoContainer';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { watchaddItemSync } from './sagas';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(watchaddItemSync);

ReactDOM.render(
	<Provider store={store}>
		<TodoAppContainer />
	</Provider>,
	document.getElementById('app')
);
