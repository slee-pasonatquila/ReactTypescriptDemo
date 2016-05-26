import Alert from 'react-s-alert';
import * as MsgTypes from '../constants/MessageTypes';

export default function showMsg(msgType, content) {
	switch (msgType) {
	case MsgTypes.MSG_SUCCESS:
		Alert.success(content, {
			position: 'top-right'
		});
		break;
	case MsgTypes.MSG_INFO:
		Alert.info(content, {
			position: 'top-right'
		});
		break;
	case MsgTypes.MSG_WARNING:
		Alert.warning(content, {
			position: 'top-right'
		});
		break;
	case MsgTypes.MSG_ERROR:
		Alert.error(content, {
			position: 'top-right'
		});
		break;
	default:
		Alert.info(content, {
			position: 'top-right'
		});
	}
}
