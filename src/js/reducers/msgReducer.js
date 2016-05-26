import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import showMsg from '../utils/msgUtils';
import * as MsgTypes from '../constants/MessageTypes';

function showMsgPayload(state, action) {
	showMsg(action.payload.msgType, action.payload.content);
	return state;
}

export const msgReducer = handleActions({
	['SHOW_MSG']: showMsgPayload
}, Map({
	msgType: MsgTypes.MSG_INFO,
	content: ''
}));
