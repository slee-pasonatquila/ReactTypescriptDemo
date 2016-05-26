import { takeEvery, delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { addItem } from './actions/todoActions';

import { showMessage } from './actions/msgActions';
import * as MsgTypes from './constants/MessageTypes';

export function* helloSaga() {
	// yield put(showMessage(MsgTypes.MSG_INFO, 'App is started.'));
}

export function* addItemSync(action) {
	yield put(addItem(action.payload.pText));
	yield delay(100);
	yield put(showMessage(MsgTypes.MSG_SUCCESS, 'Todo is Added.'));
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchaddItemSync() {
	yield* takeEvery('ADD_ITEM_SYNC', addItemSync);
}

export default function* rootSaga() {
	yield [
		helloSaga(),
		watchaddItemSync()
	];
}
