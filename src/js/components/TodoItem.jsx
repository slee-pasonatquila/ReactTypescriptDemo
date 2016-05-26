import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import TextInput from './TextInput';

export default class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		const itemClass = classNames({
			todo: true,
			completed: this.props.isCompleted,
			editing: this.props.isEditing
		});
		return (
			<li className={itemClass}>
				<div className="view">
					<input type="checkbox"
						className="toggle"
						defaultChecked={this.props.isCompleted}
						onClick={() => this.props.toggleComplete(this.props.id)}
					/>
					<label htmlFor="todo" ref="text" onDoubleClick={() => this.props.editItem(this.props.id)}>
						{this.props.text}
					</label>
					<button className="destroy"
						onClick={() => this.props.deleteItem(this.props.id)}
					/>
				</div>
				<TextInput text={this.props.text}
					itemId={this.props.id}
					cancelEditing={this.props.cancelEditing}
					doneEditing={this.props.doneEditing}
				/>
			</li>
		);
	}
}

TodoItem.propTypes = {
	isCompleted: React.PropTypes.boolean,
	isEditing: React.PropTypes.boolean,
	id: React.PropTypes.number,
	text: React.PropTypes.string,
	toggleComplete: React.PropTypes.func,
	cancelEditing: React.PropTypes.func,
	doneEditing: React.PropTypes.func,
	editItem: React.PropTypes.func,
	deleteItem: React.PropTypes.func
};
