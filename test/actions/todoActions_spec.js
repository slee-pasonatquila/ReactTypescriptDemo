import { expect } from 'chai';
import * as types from '../../src/js/constants/ActionTypes';
import * as actions from '../../src/js/actions/todoActions';
describe('todo actions', () => {
	it('addTodo should create ADD_ITEM action', () => {
		expect(actions.addItem('Use redux every where')).to.deep.equal({
			type: types.ADD_ITEM,
			payload: {
				pText: 'Use redux every where'
			}
		});
	});
});
