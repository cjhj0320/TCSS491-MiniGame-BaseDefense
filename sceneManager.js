class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.cameraX = 0;

        this.score = 0;
        this.title = true;
        this.gameOver = false;
        this.won = false;
    };

     clearEntities() {
         this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
         });
     }

    loadEntities() {
        ASSET_MANAGER.pauseBackgroundMusic();
        ASSET_MANAGER.playAsset("./music/backgroundMusic.mp3");

        // add background
        let background = new Background(this.game, 0, -(PARAMS.BACKGROUND_HEIGTH - PARAMS.CANVAS_HEIGTH));
        this.game.addEntity(background);

        let userInterface = new UserInterface(this.game);
        this.game.addEntity(userInterface);

        let base = new Base(this.game, 0, 180, false);
        this.game.addEntity(base);
        let enemyBase = new Base(this.game, PARAMS.BACKGROUND_WIDTH-1300/2, 180, true);
        this.game.addEntity(enemyBase);

        // add unit
        let enemySpawner = new EnemySpawner(this.game);
        this.game.addEntity(enemySpawner);
    }

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    };

    update(){
        PARAMS.DEBUG = document.getElementById("debug").checked;

        this.updateAudio();

        if (this.title && this.game.click && this.game.click.y > 470 && this.game.click.y < 500) {
            this.title = false;
            this.loadEntities();
            
        }
        
        if(this.game.left){
            this.cameraX -= 10;
        } else if(this.game.right){
            this.cameraX += 10;
        }

        if (this.cameraX > PARAMS.BACKGROUND_WIDTH - PARAMS.CANVAS_WIDTH) {
            this.cameraX = PARAMS.BACKGROUND_WIDTH - PARAMS.CANVAS_WIDTH;
        } else if(this.cameraX < 0) {
            this.cameraX = 0;
        }

        if(this.gameOver) {
            this.clearEntities();
            if(this.game.click && this.game.click.y > 520 && this.game.click.y < 550) {
                this.title = true;
                this.gameOVer = false;
            }
        }
        
    }

    draw(ctx){
        // ctx.font = PARAMS.BLOCKWIDTH/2 + 'px "Press Start 2P"';
        // ctx.fillStyle = "White";
        // ctx.fillText("SCORE ", 1.5 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        // ctx.fillText((this.score + "").padStart(8,"0"), 1.5 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);
        // ctx.fillText("TIME", (12.5+13) * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        // ctx.fillText("400", (13+13) * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);

        if(this.title) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./img/backgroundTitle.png"), 0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGTH + 100);
            ctx.drawImage(ASSET_MANAGER.getAsset("./img/gameTitle.png"), 500, 170, 395, 479);
            ctx.fillStyle = this.game.mouse && this.game.mouse.y > 470 && this.game.mouse.y < 500 ? "Grey":"White";
            ctx.font = "30px Arial";
            ctx.fillText("GAME START", 598, 500);
        }

        if(this.gameOver) {
            if (this.won) {
                ctx.drawImage(ASSET_MANAGER.getAsset("./img/backgroundTitle.png"), 0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGTH + 100);
                ctx.drawImage(ASSET_MANAGER.getAsset("./img/wonGame.png"), 505, 270, 395, 241);
                ctx.fillStyle = this.game.mouse && this.game.mouse.y > 520 && this.game.mouse.y < 550 ? "Grey":"White";
                ctx.font = "30px Arial";
                ctx.fillText("Play Again?", 620, 550);
            } else {
                ctx.drawImage(ASSET_MANAGER.getAsset("./img/backgroundTitle.png"), 0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGTH + 100);
                ctx.drawImage(ASSET_MANAGER.getAsset("./img/lostGame.png"), 550, 250, 302, 253);
                ctx.fillStyle = this.game.mouse && this.game.mouse.y > 520 && this.game.mouse.y < 550 ? "Grey":"White";
                ctx.font = "30px Arial";
                ctx.fillText("Play Again?", 615, 550);
            }
        }
    }
}