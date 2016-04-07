///<reference path="../../../typings/browser.d.ts"/>
// actionの識別子
export enum Types {
	AddTodo = 20001,
	ToggleTodo,
	DeleteTodo
}

// actionのインターフェース
export interface IAction<TPayload> {
	type: Types;
	payload: TPayload;
}

// toso追加のPayload
export class AddTodoPayload {
	public text: string;
	constructor(pText: string) {
		this.text = pText;
	}
}

// todo追加のPayload
export class DeleteTodoPayload {
	public id: number;
	constructor(pId: number) {
		this.id = pId;
	}
}

// todo追加アクション
export function addTodo(text: string): IAction<AddTodoPayload> {
	return {
		type: Types.AddTodo,
		payload: new AddTodoPayload(text)
	};
}

// todo完了状態のトグルのPayload
export class ToggleTodoPayload {
	public id: number;
	constructor(pId: number) {
		this.id = pId;
	}
}

// todo完了状態のトグルアクション
export function toggleTodo(id: number): IAction<ToggleTodoPayload> {
	return {
		type: Types.ToggleTodo,
		payload: new ToggleTodoPayload(id)
	};
}

// todo削除のアクション
export function deleteTodo(id: number): IAction<DeleteTodoPayload> {
	return {
		type: Types.DeleteTodo,
		payload: new DeleteTodoPayload(id)
	};
}
