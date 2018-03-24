import Snake from './snake.js';

describe("Snake tests", () => {
	
	test("snake creation doesn't fail", () => {
		new Snake(10, 10);
	});
});
