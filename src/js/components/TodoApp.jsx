import React from 'react';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoTools from './TodoTools';
import Footer from './Footer';
import * as filterType from '../constants/TodoFilters';
import Alert from 'react-s-alert';

export default class TodoApp extends React.Component {
	getNbActiveItems() {
		if (this.props.todos) {
			const activeItems = this.props.todos.filter(
				(item) => item.get('status') === filterType.SHOW_ACTIVE
			);
			return activeItems.size;
		}
		return 0;
	}
	render() {
		return (
			<div>
				<section className="todoapp">
					<TodoHeader addItem={this.props.addItemSync}/>
					<TodoList {...this.props} />
					<TodoTools  changeFilter={this.props.changeFilter}
						filter={this.props.filter}
						nbActiveItems={this.getNbActiveItems()}
						clearCompleted={this.props.clearCompleted}
					/>
				</section>
				<Alert stack={{ limit: 3 }} effect="slide" timeout={2000}/>
				<Footer />
			</div>
		);
	}
}

TodoApp.propTypes = {
	todos: React.PropTypes.arrayOf(React.PropTypes.object),
	filter: React.PropTypes.string,
	addItemSync: React.PropTypes.func,
	changeFilter: React.PropTypes.func,
	clearCompleted: React.PropTypes.func,
	toggleComplete: React.PropTypes.func,
	doneEditing: React.PropTypes.func,
	cancelEditing: React.PropTypes.func,
	deleteItem: React.PropTypes.func
};
