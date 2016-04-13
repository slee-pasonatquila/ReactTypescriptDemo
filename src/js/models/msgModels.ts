export class AlertMessage {
	public msgContent: string;
	public isShow: boolean;
	constructor(pMsg: string, pIsShow: boolean = false) {
		this.msgContent = pMsg;
		this.isShow = pIsShow;
	}
}
