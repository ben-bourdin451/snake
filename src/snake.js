import globals from './globals.js';

const TILE_W = globals.TILE_W;
const TILE_H = globals.TILE_H;

const DIRECTION = {
	UP: 1,
	RIGHT: 2,
	DOWN: 3,
	LEFT: 4
}

const KEYS = {
	RETURN: 13,
	DELETE: 46,
	ESCAPE: 27,
	SPACEBAR: 32,
	ARROW_LEFT: 37,
	ARROW_UP: 38,
	ARROW_RIGHT: 39,
	ARROW_DOWN: 40
}

const COLOUR = '#6B9E7D';

export default class Snake {
	constructor(x, y, size = 4) {
		this.body = [[x, y]];
		this.length = size;
		this.direction = DIRECTION.UP;
		
		// Grow to initial size
		for (let i = 1; i < size; i++) { this.grow(); }
	}

	addBody(x, y) {
		// Add to body
		this.body.unshift([x, y]);
	}

	isInsideBody(x, y) {
		return this.body.reduce((acc, e) => {
			return acc || (e[0] === x && e[1] === y);
		}, false)
	}

	grow() {
		switch (this.direction) {
			case DIRECTION.UP:
				this.addBody(this.body[0][0], this.body[0][1] - TILE_H);
				break;

			case DIRECTION.RIGHT:
				this.addBody(this.body[0][0] + TILE_H, this.body[0][1]);
				break;

			case DIRECTION.DOWN:
				this.addBody(this.body[0][0], this.body[0][1] + TILE_H);
				break;

			case DIRECTION.LEFT:
				this.addBody(this.body[0][0] - TILE_H, this.body[0][1]);
				break;
		}
	}

	move() {
		this.grow();
		this.body.pop();
	}

	draw(ctx, screen) {
		ctx.fillStyle = COLOUR;

		this.body.map(e => {
			// Wrap according to screen size
			e[0] = this.wrapTile(screen.width, TILE_W, e[0]);
			e[1] = this.wrapTile(screen.height, TILE_H, e[1]);
			ctx.fillRect(e[0], e[1], TILE_W, TILE_H);
		});
	}

	wrapTile(max, tile, pos) {
		if (pos >= max) {
			return pos - max;
		} else if (pos < 0) {
			return max - tile
		} else {
			return pos;
		}
	}

	handleKeyDown(event) {
		switch (event.keyCode) {
			case KEYS.ARROW_LEFT:
				this.direction = DIRECTION.LEFT;
			break;
			case KEYS.ARROW_UP:
				this.direction = DIRECTION.UP;
			break;
			case KEYS.ARROW_RIGHT:
				this.direction = DIRECTION.RIGHT;
			break;
			case KEYS.ARROW_DOWN:
				this.direction = DIRECTION.DOWN;
			break;
		}
	}

	getBody() {
		return this.body;
	}
}
