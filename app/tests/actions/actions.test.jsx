import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import firebase, {firebaseRef} from 'app/firebase/';
var expect = require('expect');
var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
	it('should generate search text action', () => {
		var action = {
			type: 'SET_SEARCH_TEXT',
			searchText: 'Some Search Text'
		};

		var res = actions.setSearchText(action.searchText);
		expect(res).toEqual(action);
	});

	it('should generate add todo action', () => {
		var action = {
			type: 'ADD_TODO',
			todo: {
				id: '1234',
				text: 'Test something',
				completed: false,
				createdAt: 0
			}
		};

		var res = actions.addTodo(action.todo);
		expect(res).toEqual(action);
	});

	it('should generate add todos action object', () => {
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

		var res = actions.addTodos(todos);
		expect(res).toEqual(action);
	});

	it('should generate show completed action', () => {
		var action = {
			type: 'TOGGLE_SHOW_COMPLETED'
		};

		var res = actions.toggleShowCompleted();
		expect(res).toEqual(action);
	});

	it('should generate update todo action', () => {
		var action = {
			type: 'UPDATE_TODO',
			id: '1235125',
			updates: {
				completed: false
			}
		};

		var res = actions.updateTodo(action.id, action.updates);
		expect(res).toEqual(action);
	});

	it('should generate login action', () => {
		const action = {
			type: 'LOGIN',
			uid: '09867'
		};

		const res = actions.login(action.uid);
		expect(res).toEqual(action);
	});

	it('should generate logout action', () => {
		const action = {
			type: 'LOGOUT'
		};

		const res = actions.logout();
		expect(res).toEqual(action);
	});

	describe('Tests with firebase todos', () => {
		var testTodoRef;
		var uid;
		var todosRef;

		beforeEach((done) => {
			firebase.auth().signInAnonymously().then((user) => {
				uid = user.uid;
				todosRef = firebaseRef.child(`users/${uid}/todos`);

				return todosRef.remove();
			}).then(() => {
				testTodoRef = todosRef.push();

				testTodoRef.set({
					text: 'Something to test',
					completed: false,
					createdAt: 1512
					});
				})
				.then(() => done())
				.catch(done);
			});

		afterEach((done) => {
			todosRef.remove().then(() => done());
		});

		it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
			const store = createMockStore({auth: {uid}});
			const action = actions.startToggleTodo(testTodoRef.key, true);

			store.dispatch(action).then(() => {
				const mockActions = store.getActions();

				expect(mockActions[0]).toInclude({
					type: 'UPDATE_TODO',
					id: testTodoRef.key
				});
				expect(mockActions[0].updates).toInclude({
					completed: true
				});
				expect(mockActions[0].updates.completedAt).toExist();
				done();
			}, done);

		});

		it('should populate todos and dispatch ADD_TODOS', (done) => {
			const store = createMockStore({auth: {uid}});
			const action = actions.startAddTodos();

			store.dispatch(action).then(() => {
				const mockActions = store.getActions();

				expect(mockActions[0].type).toEqual('ADD_TODOS');
				expect(mockActions[0].todos.length).toEqual(1);
				expect(mockActions[0].todos[0].text).toEqual('Something to test');
				done();
			}, done);
		});

		it('should create todo and dispatch ADD_TODO', (done) => {
			const store = createMockStore({auth: {uid}});
			const todoText = 'Test something';

			store.dispatch(actions.startAddTodo(todoText)).then(() => {
				const actions = store.getActions();

				expect(actions[0]).toInclude({
					type: 'ADD_TODO'	
				});
				expect(actions[0].todo).toInclude({
					text: todoText
				});
				done();
			}).catch(done);
		});
	});
});