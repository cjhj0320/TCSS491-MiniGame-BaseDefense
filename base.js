
class Base {
	constructor(game, x, y, isEnemy) {
		Object.assign(this, { game, x, y, isEnemy});

		this.base_spritesheet = ASSET_MANAGER.getAsset("./img/base.png");
        this.hp_bar_bg_img = ASSET_MANAGER.getAsset("./img/ui/bar_bg.png");
        this.bar_red_img = ASSET_MANAGER.getAsset("./img/ui/bar_red.png");
        this.hp_bar_border_img = ASSET_MANAGER.getAsset("./img/ui/bar_border.png");

		this.dead = false;
		this.hp = 5000;
		this.maxHP = 5000;
		this.updateBB();
	};

	updateBB() {
        this.lastBB = this.BB; // last bounding box - when it is called initial, it will set to null or undefined
        // (it can cause problem if there is a collision as game starts.)
        this.BB = new BoundingBox(this.x, this.y,  1300/2, 880/2);
	};
	
	update() {
		if (this.hp < 0 && this.isEnemy) {
			this.game.camera.gameOver = true;
			this.game.camera.won = true;
		} else if (this.hp < 0 && !this.isEnemy) {
			this.game.camera.gameOver = true;
			this.game.camera.won = false;
		}
	};

	draw(ctx) {
		ctx.drawImage(this.hp_bar_bg_img, this.x + 175 - this.game.camera.cameraX, 140, 300, 25);
		if(this.hp >= 0){
			ctx.drawImage(this.bar_red_img, this.x + 175 - this.game.camera.cameraX, 140, this.hp * (300/this.maxHP), 25);
		}
        ctx.drawImage(this.hp_bar_border_img, this.x + 175 - this.game.camera.cameraX, 140, 300, 25);
		
		ctx.drawImage(this.base_spritesheet, this.x - this.game.camera.cameraX, this.y, 1300/2, 880/2);

		if (PARAMS.DEBUG && this.BB != null) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.cameraX, this.BB.y, this.BB.width, this.BB.height);
        }
	};
}