///<reference path="../../../typings/browser.d.ts"/>
import { createAction} from 'redux-actions';

export enum msgActionTypes {
	ToggleMsg = <any>"ToogleMsg"
}

export const toggleMsg =
	createAction(<any>msgActionTypes.ToggleMsg, (pMsg: string, pIsShow: boolean = false) => ({msg: pMsg, isShow: pIsShow}));
