///<reference path="../../../typings/browser.d.ts"/>
export enum msgActionTypes {
	ToggleMsg = 10001
}

export interface IMsgAction<TPayload> {
	type: msgActionTypes;
	payload: TPayload;
}

export class ToggleMsgPayload {
	public isShow: boolean;
	public msg: string;
	constructor(pMsg: string, pIsShow: boolean = false) {
		this.isShow = pIsShow;
		this.msg = pMsg;
	}
}

export function toggleMsg(msg: string, isShow: boolean): IMsgAction<ToggleMsgPayload> {
	return {
		type: msgActionTypes.ToggleMsg,
		payload: new ToggleMsgPayload(msg, isShow)
	};
}