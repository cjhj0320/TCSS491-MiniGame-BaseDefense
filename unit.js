class Unit {
    // x & y - the top left position on the Canvas where we want to draw the image.
    constructor(game, x, y, unitNumber, isEnemy) {
        Object.assign(this, { game, x, y, unitNumber, isEnemy });

        this.unit01_spritesheet = ASSET_MANAGER.getAsset("./img/unit/unit01.png");
        this.unit02_spritesheet = ASSET_MANAGER.getAsset("./img/unit/unit02.png");
        this.unit03_spritesheet = ASSET_MANAGER.getAsset("./img/unit/unit03.png");
        this.unit04_spritesheet = ASSET_MANAGER.getAsset("./img/unit/unit04.png");
        this.unit05_spritesheet = ASSET_MANAGER.getAsset("./img/unit/unit05.png");
        this.unit06_spritesheet = ASSET_MANAGER.getAsset("./img/unit/unit06.png");
        this.unit07_spritesheet = ASSET_MANAGER.getAsset("./img/unit/unit07.png");

        this.dead = false;
        this.attackCounter = 0;
        this.deadCounter = 0;
        this.state = 0; // 0 = walking, 1 = attacking, 2 = dying

        this.maxHP = [100, 200, 300, 400, 500, 700, 1000];
        this.attackDamage = [10, 20, 30, 40, 50, 60, 70, 100];
        this.attackPeriod = [1.5, 1.5, 1.5];
        this.expAmount = [10, 20, 30, 40, 50, 60, 70, 80];

        this.hp = this.maxHP[unitNumber - 1];

        this.animations = [];
        if (unitNumber == 1) {
            // walking
            this.animations.push(new Animator(this.unit01_spritesheet, 50, 1190, 354, 347, 17, 0.075, 0, false, true, this.isEnemy));
            // attacking
            this.animations.push(new Animator(this.unit01_spritesheet, 50, 640, 612, 453, 21, 0.075, 0, false, true, this.isEnemy));
            // dying
            this.animations.push(new Animator(this.unit01_spritesheet, 50, 70, 507, 484, 42, 0.05, 0, false, true, this.isEnemy));
        } else if (unitNumber == 2) {
            // walking
            this.animations.push(new Animator(this.unit02_spritesheet, 50, 1190, 354, 348, 17, 0.075, 0, false, true, this.isEnemy));
            // attacking
            this.animations.push(new Animator(this.unit02_spritesheet, 50, 640, 542, 449, 21, 0.075, 0, false, true, this.isEnemy));
            // dying
            this.animations.push(new Animator(this.unit02_spritesheet, 50, 70, 508, 470, 42, 0.05, 0, false, true, this.isEnemy));
        } else if (unitNumber == 3) {
            // walking
            this.animations.push(new Animator(this.unit03_spritesheet, 50, 1250, 422, 339, 17, 0.075, 0, false, true, this.isEnemy));
            // attacking
            this.animations.push(new Animator(this.unit03_spritesheet, 50, 710, 609, 484, 21, 0.075, 0, false, true, this.isEnemy));
            // dying
            this.animations.push(new Animator(this.unit03_spritesheet, 50, 70, 556, 509, 42, 0.05, 0, false, true, this.isEnemy));
        }

        this.updateBB();
    }

    updateBB() {
        // We're also going to record mario's last bounding box,  because some of our collision handling 
        // needs to check where we used to be. It is to determine what kind of collision we have - (for example, are we landing(땅에 착륙하다), or are we bouncing the brick from below).
        // (Any of the entitiese that do not move in the scene, such as bricks, ground, etc. dont need this updateBB() method.)
        this.lastBB = this.BB; // last bounding box - when it is called initial, it will set to null or undefined
        // (it can cause problem if there is a collision as game starts.)
        this.BB = new BoundingBox(this.x, this.y, 354 * PARAMS.SCALE, 347 * PARAMS.SCALE);
    };

    update() {
        // update position
        if (this.state == 0) {
            this.x = this.isEnemy ? this.x - 1 : this.x + 1;
        }
        this.updateBB();

        var flag = false;
        // COLLISION
        var that = this;
        for(var entity of this.game.entities){
            if (entity.BB && that.BB.collide(entity.BB) && entity !== that && (that.isEnemy != entity.isEnemy)) {
                if ((entity instanceof Unit || entity instanceof Base)) {
                    if (!entity.dead) {
                        that.state = 1; // attack
                        that.attackCounter += that.game.clockTick;
                        if (that.attackCounter > that.attackPeriod[that.unitNumber - 1]) {
                            that.x = that.lastBB.left;
                            this.updateBB;
                            entity.hp -= that.attackDamage[that.unitNumber - 1];
                            console.log(entity.unitNumber + ": " + entity.hp);
                            that.attackCounter = 0;
                        }
                    } else if (entity.dead) {
                        that.state = 0;
                    }
                    break;
                } 
            }
        }

        if (this.hp <= 0) {
            this.state = 2;
            this.deadCounter += this.game.clockTick;
            if (this.deadCounter > 0.05) {    // if same unit collided, both dies
                this.dead = true;
            }
            if (this.deadCounter > 2.0) {
                this.removeFromWorld = true;
            }
        }

        // increase exp if we killed enemy
        if (this.removeFromWorld && this.isEnemy) {
            that.game.ui.exp += this.expAmount[this.unitNumber];
        }
    }

    draw(ctx) {
        if (this.unitNumber == 1) {
            if (this.state == 0) {
                this.y = 538;
            } else if (this.state == 1) {
                this.y = 538 - 24;
            } else if (this.state == 2) {
                this.y = 538 - 20;
            }
        } else if (this.unitNumber == 2) {
            if (this.state == 0) {
                this.y = 540;
            } else if (this.state == 1) {
                this.y = 540 - 23;
            } else if (this.state == 2) {
                this.y = 540 - 23;
            }
        } else if (this.unitNumber == 3) {
            if (this.state == 0) {
                this.y = 541;
            } else if (this.state == 1) {
                this.y = 541 - 26;
            } else if (this.state == 2) {
                this.y = 541 - 32;
            }
        }
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.cameraX, this.y, PARAMS.SCALE);
    }
}