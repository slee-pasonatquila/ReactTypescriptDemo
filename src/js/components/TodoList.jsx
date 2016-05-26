import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TodoItem from './TodoItem';
import * as filterType from '../constants/TodoFilters';

export default class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	getItems() {
		if (this.props.todos) {
			return this.props.todos.filter(
				(item) => this.props.filter === filterType.SHOW_ALL ||
				item.get('status') === this.props.filter
			);
		}
		return [];
	}
	isCompleted(item) {
		return item.get('status') === filterType.SHOW_COMPLETED;
	}
	render() {
		return (
			<section className="main">
				<ul className="todo-list">
					{this.getItems().map(item =>
						<TodoItem key={item.get('text')}
							text={item.get('text')}
							id={item.get('id')}
							isCompleted={this.isCompleted(item)}
							isEditing={item.get('editing')}
							doneEditing={this.props.doneEditing}
							cancelEditing={this.props.cancelEditing}
							toggleComplete={this.props.toggleComplete}
							deleteItem={this.props.deleteItem}
							editItem={this.props.editItem}
						/>
					)}
				</ul>
			</section>
		);
	}
}

TodoList.propTypes = {
	todos: React.PropTypes.arrayOf(React.PropTypes.object),
	filter: React.PropTypes.string,
	toggleComplete: React.PropTypes.func,
	cancelEditing: React.PropTypes.func,
	doneEditing: React.PropTypes.func,
	editItem: React.PropTypes.func,
	deleteItem: React.PropTypes.func
};
