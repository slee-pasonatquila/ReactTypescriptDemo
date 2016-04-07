///<reference path="../../../typings/browser.d.ts"/>
import * as Redux from 'redux';
import * as TodoModel from "../models/todoModels";
import * as MsgModel from "../models/msgModels";
import {msgs} from "./msgReducers";
import {todos} from "./todoReducers";

// アプリのステート
export interface ITodoAppState {
	todos: TodoModel.TodoList;
	msgs: MsgModel.AlertMessage;
}

// reducerの作成
export const todoApp: Redux.Reducer = Redux.combineReducers({
	todos,
	msgs,
});
