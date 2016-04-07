///<reference path="../../../typings/browser.d.ts"/>
import * as MsgAction from '../actions/msgActions';
import * as MsgModel from '../models/msgModels';

function toggleMsg(state: MsgModel.AlertMessage, payload: MsgAction.ToggleMsgPayload) {
	let msg: MsgModel.AlertMessage = {
		isShow: payload.isShow,
		msgContent: payload.msg,
	};
	return msg;
}

export function msgs(state: MsgModel.AlertMessage = new MsgModel.AlertMessage(''), action: MsgAction.IMsgAction<any>) {
	switch (action.type) {
		case MsgAction.msgActionTypes.ToggleMsg:
			return toggleMsg(state, <MsgAction.ToggleMsgPayload>action.payload);
		default:
			return state;
	}
}
