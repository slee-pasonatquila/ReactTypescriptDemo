///<reference path="../../../typings/browser.d.ts"/>
import * as Redux from 'redux';
import * as TodoModel from "../models/todoModels";
import {todos} from "./todoReducers";

// アプリのステート
export interface ITodoAppState {
	todos: TodoModel.TodoList;
}

// reducerの作成
export const todoApp: Redux.Reducer = Redux.combineReducers({
	todos
});
