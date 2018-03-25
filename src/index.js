import globals from './globals.js';
import Snake from './snake.js';
import Apple from './apple.js';

import './style.css';

const TILE_W = globals.TILE_W;
const TILE_H = globals.TILE_H;
const FPS = 12;

function createCanvas() {
	let element = document.createElement('canvas');
	element.setAttribute("id", "screen");

	return element;
}

document.body.appendChild(createCanvas());

var screen = document.getElementById("screen");
var ctx = screen.getContext("2d");
console.log(screen.width, screen.height);

function randomPosX() {
	return Math.trunc(Math.random(1) * (screen.width / TILE_W)) * TILE_W;
}
function randomPosY() {
	return Math.trunc(Math.random(1) * (screen.height / TILE_H)) * TILE_H;
}

function generateApple(snake) {
	let appleX = randomPosX();
	let appleY = randomPosY();
	
	// While apple is inside body of snake, generate new positions
	while (snake.isInsideBody(appleX, appleY)) {
		appleX = randomPosX();
		appleY = randomPosY();
	}
	
	return new Apple(appleX, appleY);
}

function main() {
	let snake = new Snake(screen.width / 2, screen.height / 2);
	let apple = generateApple(snake);
	
	window.addEventListener("keydown", event => {
		snake.handleKeyDown(event);
		event.preventDefault();
	});
	
	let loop = setInterval(() => {
		// Time
		snake.move()
		
		if (snake.isInsideBody(apple.getX(), apple.getY())) {
			snake.eat();
			apple = generateApple(snake);
		}
	
		// Draw	
		ctx.clearRect(0, 0, screen.width, screen.height);
		snake.draw(ctx, screen);
		apple.draw(ctx);
	}, 1 / FPS * 1000);
}

main();
