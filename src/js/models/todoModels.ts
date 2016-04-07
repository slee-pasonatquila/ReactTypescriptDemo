///<reference path="../../../typings/browser.d.ts"/>
import * as _ from "lodash";
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

// todoのリストを管理する
export class TodoList {
	// todoのハッシュ
	public todos: { [key: number]: Todo } = {};
}

// todo関連のユーテリティ
export class TodoUtils {
	public static toList(todos: { [key: number]: Todo }) {
		let items: Todo[] = [];
		_.forEach(todos, (val: Todo) => {
			items.push(val);
		});
		return items.sort((a: Todo, b: Todo) => {
			if (a.id > b.id) {
				return 1;
			}
			if (a.id < b.id) {
				return -1;
			}
			return 0;
		});
	}
}
