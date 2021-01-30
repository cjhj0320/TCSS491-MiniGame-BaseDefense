class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.cameraX = 0;

        this.loadBackground();
    };

    loadBackground() {
        // add background
        let background = new Background(this.game, 0, -(PARAMS.BACKGROUND_HEIGTH - PARAMS.CANVAS_HEIGTH));
        this.game.addEntity(background);

        let ui = new UI(this.game);
        this.game.addEntity(ui);

        // let textBox = new TextBox(this.game, 0, 620);
        // this.game.addEntity(textBox)

        // var starBar = new StarBar(this.game, 0, 640);
        // this.game.addEntity(starBar);
        // var expBar = new ExpBar(this.game, 900, 640);
        // this.game.addEntity(expBar);


        let base = new Base(this.game, 0, 180, false);
        this.game.addEntity(base);

        let enemyBase = new Base(this.game, PARAMS.BACKGROUND_WIDTH-1300/2, 180, true);
        this.game.addEntity(enemyBase);

        // add unit
        let unit01 = new Unit(this.game, PARAMS.BACKGROUND_WIDTH-1300/2, 538, 3, true);
        //let unit01 = new Unit(this.game, 1000, 538, 3, true);
        this.game.addEntity(unit01);

        // add unit
        // let unit02 = new Unit(this.game, 280, 540, 2);
        // this.game.addEntity(unit02);
        
        //add unit
        // let unit03 = new Unit(this.game, 280, 541, 3);
        // this.game.addEntity(unit03);
    }

    update(){
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
    }

    draw(ctx){
        ctx.font = PARAMS.BLOCKWIDTH/2 + 'px "Press Start 2P"';
        ctx.fillStyle = "White";
        ctx.fillText("SEOUNGDEOK", 1.5 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        ctx.fillText((this.score + "").padStart(8,"0"), 1.5 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH); /* ** */
        //ctx.fillText("x" + (this.coins < 10 ? "0" : "") + this.coins, 6.5 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH); /* ** */
        ctx.fillText("WORLD", (9+13) * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        ctx.fillText("1-1", (9.5+13) * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);
        ctx.fillText("TIME", (12.5+13) * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        ctx.fillText("400", (13+13) * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);
       // console.log(this.game.timer.gameTime);
    }
}