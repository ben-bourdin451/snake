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
	
	while (snake.isOutsideBounds(appleX, appleY)) {
		appleX = randomPosX();
		appleY = randomPosY();
	}
	
	return new Apple(appleX, appleY);
}

function main() {
	let snake = new Snake(screen.width / 2, screen.height / 2);
	let apple = generateApple(snake);
	
	let loop = setInterval(() => {
		// Time
		snake.move(screen)
	
		// Draw	
		ctx.clearRect(0, 0, screen.width, screen.height);
		snake.draw(ctx, screen);
		apple.draw(ctx);
	}, 1 / FPS * 1000);
}

main();
