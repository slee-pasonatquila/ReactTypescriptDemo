///<reference path="../../../typings/browser.d.ts"/>
import * as _ from "lodash";
import * as immutable from "immutable";

// todoの1項目
export class Todo {
	public id: number = Date.now();
	public text: string;
	public completed: boolean;
	constructor(pText: string, pCompleted: boolean = false) {
		this.text = pText;
		this.completed = pCompleted;
	}
}

export interface TodoList extends immutable.List<Todo> {}
