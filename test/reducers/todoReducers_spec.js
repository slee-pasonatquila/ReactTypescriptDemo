import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import { todoReducer } from '../../src/js/reducers/todoReducer';

describe('reducer', () => {
	it('handles SET_STATE', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			newState: Map({
				todos: List.of(
					Map({ id: 1, text: 'React', status: 'active' }),
					Map({ id: 2, text: 'Redux', status: 'active' }),
					Map({ id: 3, text: 'Immutable', status: 'completed' })
				)
			})
		};

		const nextState = todoReducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active' },
				{ id: 2, text: 'Redux', status: 'active' },
				{ id: 3, text: 'Immutable', status: 'completed' }
			]
		}));
	});

	it('handles SET_STATE with plain JS payload', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			newState: {
				todos: [
					{ id: 1, text: 'React', status: 'active' },
					{ id: 2, text: 'Redux', status: 'active' },
					{ id: 3, text: 'Immutable', status: 'completed' }
				]
			}
		};
		const nextState = todoReducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active' },
				{ id: 2, text: 'Redux', status: 'active' },
				{ id: 3, text: 'Immutable', status: 'completed' }
			]
		}));
	});

	it('handles TOGGLE_COMPLETE by changing the status from active to completed', () => {
		const initialState = fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active', editing: false },
				{ id: 2, text: 'Redux', status: 'active', editing: false },
				{ id: 3, text: 'Immutable', status: 'completed', editing: false }
			]
		});
		const action = {
			type: 'TOGGLE_COMPLETE',
			payload: {
				itemId: 1
			}
		};
		const nextState = todoReducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'completed', editing: false },
				{ id: 2, text: 'Redux', status: 'active', editing: false },
				{ id: 3, text: 'Immutable', status: 'completed', editing: false }
			]
		}));
	});

	it('handles TOGGLE_COMPLETE by changing the status from completed to active', () => {
		const initialState = fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active', editing: false },
				{ id: 2, text: 'Redux', status: 'active', editing: false },
				{ id: 3, text: 'Immutable', status: 'completed', editing: false }
			]
		});
		const action = {
			type: 'TOGGLE_COMPLETE',
			payload: {
				itemId: 3
			}
		};
		const nextState = todoReducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active', editing: false },
				{ id: 2, text: 'Redux', status: 'active', editing: false },
				{ id: 3, text: 'Immutable', status: 'active', editing: false }
			]
		}));
	});

	it('handles CHANGE_FILTER by changing the filter', () => {
		const initialState = fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active' },
			],
			filter: 'all'
		});
		const action = {
			type: 'CHANGE_FILTER',
			payload: {
				filter: 'active'
			}
		};
		const nextState = todoReducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active' },
			],
			filter: 'active'
		}));
	});

	it('handles EDIT_ITEM by setting editing to true', () => {
		const initialState = fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active', editing: false },
			]
		});
		const action = {
			type: 'EDIT_ITEM',
			payload: {
				itemId: 1
			}
		};
		const nextState = todoReducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active', editing: true },
			]
		}));
	});

	it('handles CANCEL_EDITING by setting editing to false', () => {
		const initialState = fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active', editing: true },
			]
		});
		const action = {
			type: 'CANCEL_EDITING',
			payload: {
				itemId: 1
			}
		};
		const nextState = todoReducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active', editing: false },
			]
		}));
	});

	it('handles DONE_EDITING by setting by updating the text', () => {
		const initialState = fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active', editing: true },
			]
		});
		const action = {
			type: 'DONE_EDITING',
			payload: {
				itemId: 1,
				newText: 'Redux'
			}
		};
		const nextState = todoReducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			todos: [
				{ id: 1, text: 'Redux', status: 'active', editing: false },
			]
		}));
	});

	it('handles CLEAR_COMPLETED by removing all the completed items', () => {
		const initialState = fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active' },
				{ id: 2, text: 'Redux', status: 'completed' },
			]
		});
		const action = {
			type: 'CLEAR_COMPLETED'
		};
		const nextState = todoReducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active' },
			]
		}));
	});

	it('handles ADD_ITEM by adding the item', () => {
		const initialState = fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active' }
			]
		});
		const action = {
			type: 'ADD_ITEM',
			payload: {
				pText: 'Redux'
			}
		};
		const nextState = todoReducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active' },
				{ id: 2, text: 'Redux', status: 'active' },
			]
		}));
	});

	it('handles DELETE_ITEM by removing the item', () => {
		const initialState = fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active' },
				{ id: 2, text: 'Redux', status: 'completed' },
			]
		});
		const action = {
			type: 'DELETE_ITEM',
			payload: {
				itemId: 2
			}
		};
		const nextState = todoReducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			todos: [
				{ id: 1, text: 'React', status: 'active' },
			]
		}));
	});
});
