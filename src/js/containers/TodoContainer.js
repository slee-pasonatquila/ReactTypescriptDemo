import { connect } from 'react-redux';
import * as actionCreators from '../actions/todoActions';
import TodoApp from '../components/TodoApp';

function mapStateToProps(state) {
	return {
		todos: state.todoReducer.get('todos'),
		filter: state.todoReducer.get('filter')
	};
}
export const TodoAppContainer = connect(mapStateToProps, actionCreators)(TodoApp);
