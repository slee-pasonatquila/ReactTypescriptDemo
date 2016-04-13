///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Alert from "react-s-alert";


// todoの入力フォーム
interface ITodoFormComposerProps extends React.Props<{}> {
	onAddTodo: (text: string) => void;
	open: boolean;
}

export class TodoFormComposer extends React.Component<ITodoFormComposerProps, {}> {
	public myTextInput: any;
	constructor(props: ITodoFormComposerProps) {
		super(props);
		this.state = {
			open: false,
		};
	}
	public handleOpen = () => {
		this.setState({open: true});
	};

	public handleClose = () => {
		this.setState({open: false});
	};
	public render() {
		const actions = [
			<FlatButton
				label="キャンセル"
				secondary={true}
				onTouchTap={this.handleClose}
			/>,
			<FlatButton
				label="確　定"
				type="submit"
				primary={true}
				onTouchTap={this.handleSubmit.bind(this)}
			/>
		];
		return (
			<div>
				<RaisedButton label="TODO新規" onTouchTap={this.handleOpen}/>
				<Dialog
					title="TODO新規"
					actions={actions}
					modal={true}
					open={this.state["open"]}>
						<div className="row">
							<div className="offset-1 s11">
								<TextField type="text" ref={(ref: any) => this.myTextInput = ref} hintText="TODOを入力してください。" fullWidth={true}/>
							</div>
						</div>
				</Dialog>
			</div>
		);
	}

	private handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		let text: any = this.myTextInput;
		this.props.onAddTodo(text.getValue());
		text.value = '';
		Alert.success('TODOを追加しました。', {
			position: 'top-right',
			effect: 'scale',
			beep: false,
			timeout: 2000,
			offset: 100,
		});
		this.handleClose();
	}
}
