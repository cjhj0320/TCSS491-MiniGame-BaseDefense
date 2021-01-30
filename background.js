class Background {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		
		this.spriteSheet = ASSET_MANAGER.getAsset("./img/background.png");
	};

	update() {

	};

	draw(ctx) {
		//console.log(this.x);
		//console.log(this.x - this.game.camera.cameraX);
		ctx.drawImage(this.spriteSheet, this.x - this.game.camera.cameraX, this.y, PARAMS.BACKGROUND_WIDTH, PARAMS.BACKGROUND_HEIGTH);
	};
};