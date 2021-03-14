class UserInterface {
    constructor(game) {
        Object.assign(this, { game });
        this.game.ui = this;

        this.uiX = 0;
        this.uiY = 650;

        this.counter = 0;
        this.star = 0;
        this.starRate = 0.5;
        this.maxStar = 100;

        this.exp = 0;
        this.maxExp = 100;
        this.level = 1;
        this.isMaxLevel = false;

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
        this.counter += this.game.clockTick;
        if (this.counter > this.starRate && this.star < this.maxStar) {
            this.star++;
            this.counter = 0;
        }

        if (this.exp >= this.maxExp && !this.isMaxLevel) {
            this.level++;
            this.exp = 0;
            switch (this.level) {
                case 2:
                    this.maxExp = 200;
                    this.starRate = 0.3;
                    break;
                case 3:
                    this.maxExp = 350;
                    this.starRate = 0.2;
                    break;
                case 4:
                    this.maxExp = 500;
                    this.starRate = 0.15;
                    break;
                case 5:
                    this.maxExp = 500;
                    this.starRate = 0.1;
                    break;
                case 6:
                    this.maxExp = 500;
                    this.starRate = 0.1;
                    break;
                case 7:
                    this.maxExp = 500;
                    this.starRate = 0.1;
                    break;
                case 8:
                    this.maxExp = 500;
                    this.starRate = 0.1;
                    break;
                case 9:
                    this.maxExp = 500;
                    this.starRate = 0.1;
                    break;
                case 10:
                    this.star = 100;
                    this.isMaxLevel = true;
                    break;
            }
        }

        // UI
        if (this.game.click) {
            var uiX = this.game.click.x;
            var uiY = this.game.click.y;
            if ((uiX >= 68 && uiX <= 138) && (uiY >= 680 && uiY <= 780) && this.star >= 10) {
                this.star -= 10;
                let unit01 = new Unit01(this.game, false);
                this.game.addEntity(unit01);
            } else if ((uiX >= 268 && uiX <= 338) && (uiY >= 680 && uiY <= 780) && this.star >= 20 && this.level >= 2) {
                this.star -= 20;
                let unit02 = new Unit02(this.game, false);
                this.game.addEntity(unit02);
            } else if ((uiX >= 468 && uiX <= 538) && (uiY >= 680 && uiY <= 780) && this.star >= 30 && this.level >= 3) {
                this.star -= 30;
                let unit03 = new Unit03(this.game, false);
                this.game.addEntity(unit03);
            } else if ((uiX >= 668 && uiX <= 738) && (uiY >= 680 && uiY <= 780) && this.star >= 40 && this.level >= 4) {
                this.star -= 40;
                let unit04 = new Unit04(this.game, false);
                this.game.addEntity(unit04);
            } else if ((uiX >= 868 && uiX <= 938) && (uiY >= 680 && uiY <= 780) && this.star >= 50 && this.level >= 5) {
                this.star -= 50;
                let unit05 = new Unit05(this.game, false);
                this.game.addEntity(unit05);
            } else if ((uiX >= 1068 && uiX <= 1138) && (uiY >= 680 && uiY <= 780) && this.star >= 60 && this.level >= 7) {
                this.star -= 60;
                let unit06 = new Unit06(this.game, false);
                this.game.addEntity(unit06);
            } else if ((uiX >= 1268 && uiX <= 1338) && (uiY >= 680 && uiY <= 780) && this.star >= 70 && this.level >= 10) {
                this.star -= 70;
                let unit07 = new Unit07(this.game, false);
                this.game.addEntity(unit07);
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
        ctx.save();
        ctx.scale(-1, 1);
        var ratio = this.exp / this.maxExp * 100;
        ctx.drawImage(this.bar_green_img, -1400, 640, ratio * 5, 25);
        ctx.restore();
        ctx.drawImage(this.hp_bar_border_img, 900, 640, 500, 25);
        ctx.drawImage(this.star_yellow_img, 1370, 635, 33, 30);
        if(!this.isMaxLevel) {
            ctx.fillText(this.exp + "/" + this.maxExp, 930, 659);
            ctx.fillText("Level." + this.level, 1300, 659);
        } else {
            ctx.fillText("MAX LEVEL", 930, 659);
            ctx.fillText("Level. 10", 1300, 659);
        }

        if (this.level == 1) {
            ctx.drawImage(this.ui01_img, this.uiX, this.uiY, 1400, 154);
        } else if (this.level == 2) {
            ctx.drawImage(this.ui02_img, this.uiX, this.uiY, 1400, 154);
        } else if (this.level == 3) {
            ctx.drawImage(this.ui03_img, this.uiX, this.uiY, 1400, 154);
        } else if (this.level == 4) {
            ctx.drawImage(this.ui04_img, this.uiX, this.uiY, 1400, 154);
        } else if (this.level >= 5 && this.level < 7) {
            ctx.drawImage(this.ui05_img, this.uiX, this.uiY, 1400, 154);
        } else if (this.level >= 7 && this.level < 10) {
            ctx.drawImage(this.ui06_img, this.uiX, this.uiY, 1400, 154);
        } else if (this.level == 10) {
            ctx.drawImage(this.ui07_img, this.uiX, this.uiY, 1400, 154);
        }
    };
}