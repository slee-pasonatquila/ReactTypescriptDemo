import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class TextInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: props.text };
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this._handleKeyDown = this._handleKeyDown.bind(this);
		this._handleOnBlur = this._handleOnBlur.bind(this);
	}

	cancelEditing(e) {
		e.target.value = this.props.text;
		return this.props.cancelEditing(this.props.itemId);
	}
	_handleKeyDown(e) {
		switch (e.key) {
		case 'Enter':
			return this.props.doneEditing(this.props.itemId, e.target.value);
		case 'Escape':
			return this.cancelEditing(e);
		}
	}
	_handleOnBlur() {
		return this.cancelEditing();
	}
	render() {
		return (
			<input className="edit"
				autoFocus={true}
				defaultValue={this.props.text}
				type="text"
				ref="itemInput"
				onKeyDown={this._handleKeyDown}
				onBlur={this._handleOnBlur}
				autoComplete = "off"
			/>
		);
	}
}

TextInput.propTypes = {
	text: React.PropTypes.string,
	itemId: React.PropTypes.number,
	doneEditing: React.PropTypes.func,
	cancelEditing: React.PropTypes.func
};
