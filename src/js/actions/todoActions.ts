///<reference path="../../../typings/browser.d.ts"/>
import { createAction} from 'redux-actions';
// actionの識別子
export enum Types {
	AddTodo = <any>"AddTodo",
	ToggleTodo = <any>"ToggleTodo",
	DeleteTodo = <any>"DeleteTodo"
}

export const addTodo = createAction(<any>Types.AddTodo, (pText: string) => ({ text: pText, completed : false}));

export const toggleTodo = createAction(<any>Types.ToggleTodo, (pId: number) => ({ id: pId}));

export const deleteTodo = createAction(<any>Types.DeleteTodo, (pId: number) => ({id: pId}));
