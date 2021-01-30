
class Base {
	constructor(game, x, y, isEnemy) {
		Object.assign(this, { game, x, y, isEnemy});

		this.base_spritesheet = ASSET_MANAGER.getAsset("./img/base.png");
        this.hp_bar_bg_img = ASSET_MANAGER.getAsset("./img/ui/bar_bg.png");
        this.bar_red_img = ASSET_MANAGER.getAsset("./img/ui/bar_red.png");
        this.hp_bar_border_img = ASSET_MANAGER.getAsset("./img/ui/bar_border.png");

		this.dead = false;
		this.hp = 1000;
		this.maxHP = 1000;
		this.updateBB();
	};

	updateBB() {
        // We're also going to record mario's last bounding box,  because some of our collision handling 
        // needs to check where we used to be. It is to determine what kind of collision we have - (for example, are we landing(땅에 착륙하다), or are we bouncing the brick from below).
        // (Any of the entitiese that do not move in the scene, such as bricks, ground, etc. dont need this updateBB() method.)
        this.lastBB = this.BB; // last bounding box - when it is called initial, it will set to null or undefined
        // (it can cause problem if there is a collision as game starts.)
        this.BB = new BoundingBox(this.x, this.y,  1300/2 * 9/10, 880/2);
	};
	
	update() {

	};

	draw(ctx) {
		ctx.drawImage(this.hp_bar_bg_img, this.x + 175 - this.game.camera.cameraX, 140, 300, 25);
		if(this.hp >= 0){
			ctx.drawImage(this.bar_red_img, this.x + 175 - this.game.camera.cameraX, 140, this.hp * (300/this.maxHP), 25);
		}
        ctx.drawImage(this.hp_bar_border_img, this.x + 175 - this.game.camera.cameraX, 140, 300, 25);
		
		ctx.drawImage(this.base_spritesheet, this.x - this.game.camera.cameraX, this.y, 1300/2, 880/2);
	};
}