var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
	beforeEach(() => {
		localStorage.removeItem('todos');
	});

	it('should exist', () => {
		expect(TodoAPI).toExist();
	});

	describe('filterTodos', () => {
		var todos = [{
			id: 1,
			text: 'Test',
			completed: true
		}, {
			id: 2,
			text: 'Text',
			completed: false
		}, {
			id: 3,
			text: 'Test',
			completed: true
		}];

		it('should return all items if showCompleted is checked', () => {
			var filteredTodos = TodoAPI.filterTodos(todos, true, '');

			expect(filteredTodos.length).toBe(3);
		});

		it('should return non-completed items if showCompleted is not checked', () => {
			var filteredTodos = TodoAPI.filterTodos(todos, false, '');

			expect(filteredTodos.length).toBe(1);
		});

		it('should sort by completed status', () => {
			var filteredTodos = TodoAPI.filterTodos(todos, true, '');

			expect(filteredTodos[0].completed).toBe(false);
		});

		it('should filter todos by searchText', () => {
			var filteredTodos = TodoAPI.filterTodos(todos, true, 'test');

			expect(filteredTodos.length).toBe(2);
		});

		it('should return all todos if searchText is empty', () => {
			var filteredTodos = TodoAPI.filterTodos(todos, true, '');

			expect(filteredTodos.length).toBe(3);
		});
	});

});