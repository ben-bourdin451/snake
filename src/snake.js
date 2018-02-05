import globals from './globals.js';

const TILE_W = globals.TILE_W;
const TILE_H = globals.TILE_H;

const DIRECTION = {
	UP: 1,
	RIGHT: 2,
	DOWN: 3,
	LEFT: 4
}

const COLOUR = '#6B9E7D';

export default class Snake {
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
	
	move(screen) {
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
		this.x = this.wrapTile(screen.width, TILE_W, this.x);
		this.y = this.wrapTile(screen.height, TILE_H, this.y);
	}
	
	draw(ctx, screen) {
		ctx.fillStyle = COLOUR;
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
			posX = this.wrapTile(screen.width, TILE_W, posX);
			posY = this.wrapTile(screen.height, TILE_H, posY);

			ctx.fillRect(posX, posY, TILE_W, TILE_H);
		}
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
}
