import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../actions/todoActions';
import * as msgActions from '../actions/msgActions';
import TodoApp from '../components/TodoApp';

function mapStateToProps(state) {
	return {
		todos: state.todoReducer.get('todos'),
		filter: state.todoReducer.get('filter')
	};
}
function mapDispatchToProps(dispatch) {
	return {
		todoActions: bindActionCreators(todoActions, dispatch),
		msgActions: bindActionCreators(msgActions, dispatch)
	};
}
export const TodoAppContainer = connect(mapStateToProps, mapDispatchToProps)(TodoApp);
