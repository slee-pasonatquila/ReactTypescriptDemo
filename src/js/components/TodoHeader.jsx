import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class TodoHeader extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this._handleKeyPress = this._handleKeyPress.bind(this);
	}
	_handleKeyPress(e) {
		if (e.key === 'Enter' && e.target.value !== '') {
			const itemText = e.target.value;
			e.target.value = '';
			return this.props.addItem(itemText);
		}
	}
	render() {
		return (
			<header className="header">
				<h1>TODOS</h1>
				<input className="new-todo"
					autoFocus={true}
					autoComplete="off"
					placeholder="What needs to be done?"
					onKeyPress = {this._handleKeyPress}
				/>
			</header>
		);
	}
}
TodoHeader.propTypes = {
	addItem: React.PropTypes.func
};
