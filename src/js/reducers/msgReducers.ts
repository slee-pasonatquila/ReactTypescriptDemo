///<reference path="../../../typings/browser.d.ts"/>
import * as MsgAction from '../actions/msgActions';
import { handleActions } from 'redux-actions';

export const msgs = handleActions({
	[MsgAction.msgActionTypes.ToggleMsg] : (state, action) => (
		{
			isShow: action.payload.isShow,
			msgContent: action.payload.msg,
		}
	),
},{
	isShow: false,
	msgContent: ''
});
