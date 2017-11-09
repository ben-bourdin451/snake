import './style.css';

function component() {
	let element = document.createElement('canvas');
	element.setAttribute("id", "screen");

	return element;
}

document.body.appendChild(component());

const DIRECTION = {
	UP: 1,
	RIGHT: 2,
	DOWN: 3,
	LEFT: 4
}
const TILE_W = 10;
const TILE_H = 10;
const FPS = 12;

var screen = document.getElementById("screen");
var ctx = screen.getContext("2d");
console.log(screen.width, screen.height);
// init const

class Snake {
	constructor(x, y, size = 4) {
		this.x = x;
		this.y = y;
		this.length = size;
		this.direction = DIRECTION.UP;
	}
	
	isOutsideBounds(x, y) {
		switch(this.direction) {
			case DIRECTION.UP:
				return x !== this.x && y < this.y && this.y + (TILE_H * this.length) < y;
			case DIRECTION.RIGHT:
				return y !== this.y && x < this.x - (TILE_W * this.length) && this.x < x;
			case DIRECTION.DOWN:
				return x !== this.x && y < this.y - (TILE_H * this.length) && this.y < y;
			case DIRECTION.LEFT:
				return y !== this.y && x < this.x && this.x + (TILE_W * this.length) < x;
			default:
				return true;
		}
	}
	
	move() {
		switch (this.direction) {
			case DIRECTION.UP:
				this.y -= TILE_H;
				break;
			
			case DIRECTION.RIGHT:
				this.x += TILE_H;
				break;
			
			case DIRECTION.DOWN:
				this.y += TILE_H;
				break;
				
			case DIRECTION.LEFT:
				this.x -= TILE_H;
				break;
		}
		this.x = wrapTileW(this.x);
		this.y = wrapTileH(this.y);
	}
	
	draw(ctx) {
		ctx.fillStyle = "#6B9E7D";
		ctx.fillRect(this.x, this.y, TILE_W, TILE_H);
		
		for (let i = 1; i < this.length; i++) {
			let posX = this.x, posY = this.y;
			
			switch (this.direction) {
				case DIRECTION.UP:
					posY += TILE_H * i;
					break;
					
				case DIRECTION.RIGHT:
					posX -= TILE_W * i;
					break;
					
				case DIRECTION.DOWN:
					posY -= TILE_H * i;
					break;
					
				case DIRECTION.LEFT:
					posX += TILE_W * i;
					break;
			}
			posX = wrapTileW(posX);
			posY = wrapTileH(posY);

			ctx.fillRect(posX, posY, TILE_W, TILE_H);
		}
	}
}

class Apple {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	draw(ctx) {
		ctx.fillStyle = "#DE4F60";
		ctx.fillRect(this.x, this.y, TILE_W, TILE_H);
	}
}

function randomPosX() {
	return Math.trunc(Math.random(1) * (screen.width / TILE_W)) * TILE_W;
}
function randomPosY() {
	return Math.trunc(Math.random(1) * (screen.height / TILE_H)) * TILE_H;
}

function wrapTileW(n) {
	return wrapTile(screen.width, TILE_W, n);
}
function wrapTileH(n) {
	return wrapTile(screen.height, TILE_H, n);
}
function wrapTile(max, tile, n) {
	if (n >= max) {
		return n - max;
	} else if (n < 0) {
		return max - tile
	} else {
		return n;
	}
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
		//console.log("main loop");
		// Time
		snake.move()
	
		// Draw	
		ctx.clearRect(0, 0, screen.width, screen.height);
		snake.draw(ctx);
		apple.draw(ctx);
	}, 1 / FPS * 1000);

	//console.log(`interval ${loop}`);
}

main();
