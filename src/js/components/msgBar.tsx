///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react';
import Snackbar from 'material-ui/lib/snackbar';
import * as MsgModel from "../models/msgModels";

interface IMsgBarProps extends React.Props<{}> {
	msg: MsgModel.AlertMessage;
	onToggle: (msg: string, isShow: boolean) => void;
}

export class MsgBar extends React.Component<IMsgBarProps, {}> {
	public render() {
		let msg: MsgModel.AlertMessage = this.props.msg;
		return (
			<Snackbar message={msg.msgContent} autoHideDuration={1000} open={msg.isShow} onRequestClose={() => this.props.onToggle('', false)}/>
		);
	}
}
