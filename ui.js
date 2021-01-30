class UI {
    constructor(game) {
        Object.assign(this, { game });
        this.game.ui = this;

        this.uiX = 0;
        this.uiY = 650;

        this.counter = 0;
        this.star = 100;
        this.maxStar = 100;

        this.exp = 0;
        this.maxExp = 100;
        this.level = 1;

        this.ui01_img = ASSET_MANAGER.getAsset("./img/ui/ui01.png");
        this.ui02_img = ASSET_MANAGER.getAsset("./img/ui/ui02.png");
        this.ui03_img = ASSET_MANAGER.getAsset("./img/ui/ui03.png");
        this.ui04_img = ASSET_MANAGER.getAsset("./img/ui/ui04.png");
        this.ui05_img = ASSET_MANAGER.getAsset("./img/ui/ui05.png");
        this.ui06_img = ASSET_MANAGER.getAsset("./img/ui/ui06.png");
        this.ui07_img = ASSET_MANAGER.getAsset("./img/ui/ui07.png");

        this.hp_bar_bg_img = ASSET_MANAGER.getAsset("./img/ui/bar_bg.png");
        this.bar_yellow_img = ASSET_MANAGER.getAsset("./img/ui/bar_yellow.png");
        this.bar_green_img = ASSET_MANAGER.getAsset("./img/ui/bar_green.png");
        this.hp_bar_border_img = ASSET_MANAGER.getAsset("./img/ui/bar_border.png");
        this.star_yellow_img = ASSET_MANAGER.getAsset("./img/ui/star_yellow.png");
    };

    update() {
        // increase star gauge by 1 in every second
        this.counter += this.game.clockTick;
        if(this.counter > 1.0 && this.star < this.maxStar){
            this.star++;
            this.counter = 0;
        }

        // UI
        if (this.game.click) {
            var uiX = this.game.click.x;
            var uiY = this.game.click.y;
            if ((uiX >= 68 && uiX <= 138) && (uiY >= 680 && uiY <= 780) && this.star >= 10) {
                this.star -= 10;
                let unit01 = new Unit(this.game, 280, 540, 1, false);
                this.game.addEntity(unit01);
            } else if ((uiX >= 268 && uiX <= 338) && (uiY >= 680 && uiY <= 780) && this.star >= 20) {
                this.star -= 20;
                let unit02 = new Unit(this.game, 280, 540, 2, false);
                this.game.addEntity(unit02);
            } else if ((uiX >= 468 && uiX <= 538) && (uiY >= 680 && uiY <= 780) && this.star >= 30) {
                this.star -= 30;
                let unit03 = new Unit(this.game, 280, 541, 3, false);
                this.game.addEntity(unit03);
            }
            this.game.click = null;
        }
    };

    draw(ctx) {
        // star bar
        ctx.drawImage(this.hp_bar_bg_img, 0, 640, 500, 25);
        ctx.drawImage(this.bar_yellow_img, 0, 640, this.star * 5, 25);
        ctx.drawImage(this.hp_bar_border_img, 0, 640, 500, 25);
        ctx.drawImage(this.star_yellow_img, 0, 635, 33, 30);
        ctx.font = 20 + 'px "Serif"';
        ctx.fillStyle = "Red";
        ctx.fillText(this.star + "/" + this.maxStar, 410, 659);

        // exp bar
        ctx.drawImage(this.hp_bar_bg_img, 900, 640, 500, 25);
        ctx.drawImage(this.bar_green_img, 900, 640, this.exp * 5, 25);
        ctx.drawImage(this.hp_bar_border_img, 900, 640, 500, 25);
        ctx.drawImage(this.star_yellow_img, 1370, 635, 33, 30);
        ctx.font = 20 + 'px "Serif"';
        ctx.fillStyle = "Red";
        ctx.fillText(this.exp + "/" + this.maxExp, 922, 659);

        ctx.drawImage(this.ui01_img, this.uiX, this.uiY, 1400, 154);
    };
}