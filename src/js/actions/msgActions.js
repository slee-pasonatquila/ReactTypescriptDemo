import * as types from '../constants/MessageTypes';
import { createAction } from 'redux-actions';
export const showMessage = createAction(types.SHOW_MSG,
										(type, msg) => ({ msgType: type, content: msg }));
