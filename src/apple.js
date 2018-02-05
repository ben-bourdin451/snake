import globals from './globals.js';

const COLOUR = '#DE4F60';

export default class Apple {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	draw(ctx) {
		ctx.fillStyle = COLOUR;
		ctx.fillRect(this.x, this.y, globals.TILE_W, globals.TILE_H);
	}
}
