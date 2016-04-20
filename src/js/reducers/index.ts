///<reference path="../../../typings/browser.d.ts"/>
import * as Redux from 'redux';
import * as TodoModel from "../models/todoModels";
import {todoActions} from "./todoReducers";
import * as immutable from "immutable";

export interface ITodoAppState {
	todoActions: immutable.List<TodoModel.Todo>;
}

// reducerの作成
export const todoApp: Redux.Reducer = Redux.combineReducers({
	todoActions
});
