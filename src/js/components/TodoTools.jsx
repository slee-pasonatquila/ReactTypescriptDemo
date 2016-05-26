import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import * as filterType from '../constants/TodoFilters';

export default class TodoTools extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	getNbItemsLeft() {
		return this.props.nbActiveItems || 0;
	}
	setSelectedClass(filter) {
		return classNames({ selected: this.props.filter === filter });
	}
	isSelected(filter) {
		return this.props.selectedFilter === filter || false;
	}
	render() {
		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{this.getNbItemsLeft()}</strong> items left
				</span>
				<ul className="filters">
					<li>
						<a
							href="#"
							onClick={() => this.props.changeFilter(filterType.SHOW_ALL)}
							className={this.setSelectedClass(filterType.SHOW_ALL)}
						>
							All
						</a>
					</li>
					<li>
						<a href="#"
							onClick={() => this.props.changeFilter(filterType.SHOW_ACTIVE)}
							className={this.setSelectedClass(filterType.SHOW_ACTIVE)}
						>
							Active
						</a>
					</li>
					<li>
						<a href="#"
							onClick={() => this.props.changeFilter(filterType.SHOW_COMPLETED)}
							className={this.setSelectedClass(filterType.SHOW_COMPLETED)}
						>
							Completed
						</a>
					</li>
				</ul>
				<button className="clear-completed"
					onClick={this.props.clearCompleted}
				>
					Clear completed
				</button>
			</footer>
		);
	}
}

TodoTools.propTypes = {
	nbActiveItems: React.PropTypes.number,
	filter: React.PropTypes.string,
	selectedFilter: React.PropTypes.string,
	changeFilter: React.PropTypes.func,
	clearCompleted: React.PropTypes.func
};
