import Snake from './snake.js';

describe("Snake tests", () => {
	
	test("snake creation doesn't fail", () => {
		const snake = new Snake(100, 100);
		
		expect(snake.getBody().length).toEqual(4);
	});
	
	test("head is inside body", () => {
		const snake = new Snake(10, 10, 0);
		
		expect(snake.isInsideBody(0, 0)).toBeFalsy();
		expect(snake.isInsideBody(10, 10)).toBeTruthy();
	});
	
	test("is inside body", () => {
		const snake = new Snake(100, 100);
		
		expect(snake.isInsideBody(100, 110)).toBeFalsy();
		expect(snake.isInsideBody(100, 100)).toBeTruthy();
		expect(snake.isInsideBody(100, 90)).toBeTruthy();
		expect(snake.isInsideBody(100, 80)).toBeTruthy();
	});
	
	test("add body", () => {
		const snake = new Snake(10, 10, 5);
		
		const addBodySpy = jest.spyOn(snake, 'addBody');
		
		snake.addBody(20, 50);
		expect(snake.getBody()[0][0]).toEqual(20);
		expect(snake.getBody()[0][1]).toEqual(50);
	});
});
