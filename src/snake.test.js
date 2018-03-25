import Snake from './snake.js';

describe("Snake tests", () => {

	test("snake creation doesn't fail", () => {
		const snake = new Snake(100, 100);

		expect(snake.getBody().length).toEqual(4);
	});

	test("head is not inside body", () => {
		const snake = new Snake(10, 10, 0);

		expect(snake.isInsideBody(0, 0)).toBeFalsy();
		expect(snake.isInsideBody(10, 10)).toBeTruthy();
		expect(snake.headIsInBody()).toBeFalsy();
	});

	test("head is inside body", () => {
		const snake = new Snake(100, 100);
		snake.addBody(100, 80);

		expect(snake.headIsInBody()).toBeTruthy();
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

		snake.addBody(20, 50);
		expect(snake.getBody()[0][0]).toEqual(20);
		expect(snake.getBody()[0][1]).toEqual(50);
	});
});
