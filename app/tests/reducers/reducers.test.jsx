var expect = require('expect');
var reducers = require('reducers');
var df = require('deep-freeze-strict');

describe('Reducers', () => {
	describe('searchText Reducer', () => {
		it('should set searchText', () => {
			var action = {
				type: 'SET_SEARCH_TEXT',
				searchText: 'Test Search'
			};

			var res = reducers.searchTextReducer(df(''), df(action));
			expect(res).toEqual(action.searchText);
		});
	});

	describe('showCompleted Reducer', () => {
		it('should toggle showCompleted', () => {
			var action = {
				type: 'TOGGLE_SHOW_COMPLETED'
			};

			var res = reducers.showCompletedReducer(df(false), df(action));
			expect(res).toEqual(true);
		});
	});

	describe('Todos Reducer', () => {
		it('should add new Todo', () => {
			var action = {
				type: 'ADD_TODO',
				todo: {
					id: '123',
					text: 'Task to do',
					completed: false,
					createdAt: 1243
				}
			};

			var res = reducers.todosReducer(df([]), df(action));
			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(action.todo);
		});

		it('should update Todo', () => {
			var todos = [{
				id: '1412',
				text: 'Test text',
				completed: true,
				createdAt: 123,
				completedAt: 125
			}];

			var updates = {
				completed: false,
				completedAt: null
			};
			var action = {
				type: 'UPDATE_TODO',
				id: todos[0].id,
				updates
			}

			var res = reducers.todosReducer(df(todos), df(action));
			expect(res[0].completed).toEqual(updates.completed);
			expect(res[0].compltedAt).toEqual(updates.completedAt);
			expect(res[0].text).toEqual(todos[0].text);
		});

		it('should add existing Todos', () => {
			var todos = [{
				id: '123',
				text: 'text',
				completed: false,
				completedAt: undefined,
				createdAt: 12315
			}];

			var action = {
				type: 'ADD_TODOS',
				todos
			};

			var res = reducers.todosReducer(df([]), df(action));
			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(todos[0]);
		});

		it('should destroy todos on logout', () => {
			var todos = [{
				id: '123',
				text: 'text',
				completed: false,
				completedAt: undefined,
				createdAt: 12315
			}];

			var action = {
				type: 'LOGOUT',
				todos
			};

			var res = reducers.todosReducer(df(todos), df(action));
			expect(res.length).toEqual(0);
		});
	});

	describe('authReducer', () => {
		it('should store uid on LOGIN', () => {
			const action = {
				type: 'LOGIN',
				uid: '098653'
			};

			const res = reducers.authReducer(undefined, df(action));

			expect(res).toEqual({
				uid: action.uid
			});
		});

		it('should destroy auth on LOGOUT', () => {
			const authData = {
				uid: '09876'
			};

			const action = {
				type: 'LOGOUT'
			};

			const res = reducers.authReducer(authData, df(action));
			expect(res).toEqual({});
		});
	});
});