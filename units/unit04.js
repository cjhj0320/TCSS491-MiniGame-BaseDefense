class Unit04 {
    // x & y - the top left position on the Canvas where we want to draw the image.
    constructor(game, isEnemy) {
        Object.assign(this, { game, isEnemy });
        this.spritesheet = ASSET_MANAGER.getAsset("./img/unit/unit04.png");

        if (this.isEnemy) {
            this.x = PARAMS.BACKGROUND_WIDTH - 360;
        } else {
            this.x = 280;
        }
        this.y = 537;

        this.attackCounter = 0;
        this.deadCounter = 0;
        this.state = 0; // 0 = walking, 1 = attacking, 2 = dying

        this.hp = 100;
        this.maxHP = 100;
        this.attackDamage = 40;
        this.attackPeriod = 1.575;
        this.expAmount = 100;

        this.healthBar = new HealthBar(this.game, this);
        this.animations = [];
        this.loadAnimations();

        this.updateBB();
    }

    loadAnimations() {
        // walking
        this.animations.push(new Animator(this.spritesheet, 44, 1196, 371, 344, 18, 0.075, 0, false, true, this.isEnemy));
        // attacking
        this.animations.push(new Animator(this.spritesheet, 47, 658, 555, 440, 22, 0.075, 0, false, true, this.isEnemy));
        // dying
        this.animations.push(new Animator(this.spritesheet, 56, 41, 479, 468, 43, 0.05, 0, false, true, this.isEnemy));
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 371 * PARAMS.SCALE, 344 * PARAMS.SCALE);
    };

    update() {
        // update position
        if (this.state == 0) {
            this.x = this.isEnemy ? this.x - 2.5 : this.x + 2.5;
        }
        this.updateBB();

        // COLLISION
        var that = this;
        this.state = 0;
        for (var entity of this.game.entities) {
            if (entity.BB && entity !== that && (that.isEnemy != entity.isEnemy) && that.BB.collide(entity.BB)) {
                if ((entity instanceof Unit01 || entity instanceof Unit02 || entity instanceof Unit03 || entity instanceof Unit04 ||
                    entity instanceof Unit05 || entity instanceof Unit06 || entity instanceof Unit07 || entity instanceof Base)) {
                    that.state = 1; // attack
                    that.attackCounter += that.game.clockTick;
                    if ((that.attackCounter > that.attackPeriod) && that.hp > 0) {
                        entity.hp -= that.attackDamage;
                        that.attackCounter = 0;
                    }
                    if (entity.hp <= 0 || entity.removeFromWorld) {
                        that.state = 0;
                    }
                    break;
                }
            }
        }

        if (this.hp <= 0) {
            this.BB = null;
            this.state = 2;
            this.deadCounter += this.game.clockTick;
            if (this.deadCounter > 2.0) {
                this.removeFromWorld = true;
            }
        }

        // increase exp if we killed enemy
        if (this.removeFromWorld && this.isEnemy && !this.game.ui.isMaxLevel) {
            this.game.ui.exp += this.expAmount;
        }
    }

    draw(ctx) {
        var xOffset = 0;
        var yOffset = 0;
        if (this.isEnemy) {
            switch (this.state) {
                case 1:
                    xOffset = 36;
                    yOffset = 24;
                    break;
                case 2:
                    xOffset = 27;
                    yOffset = 31;
                    break;
            }
        } else {
            switch (this.state) {
                case 1:
                    xOffset = 9;
                    yOffset = 24;
                    break;
                case 2:
                    xOffset = 0;
                    yOffset = 31;
                    break;
            }
        }
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - xOffset - this.game.camera.cameraX, this.y - yOffset, PARAMS.SCALE);
        this.healthBar.draw(ctx);

        if (PARAMS.DEBUG && this.BB != null) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.cameraX, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}