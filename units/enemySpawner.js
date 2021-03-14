class EnemySpawner {
    /**
     * Can be used to spawn enemy units along either a predefined path or a manual path. Useful for debugging.
     * Can also be inserted into the game engine's gameEntities to spawn waves of enemies.
     */
    constructor(game) {
        Object.assign(this, { game });

        this.totalTime = 0;
        this.timeElapsed1 = 0;
        this.timeElapsed2 = 0;
        this.timeElapsed3 = 0;
        this.timeElapsed4 = 0;
        this.timeElapsed5 = 0;
        this.timeElapsed6 = 0;
        this.timeElapsed7 = 0;
    }

    //Nothing needs to be drawn for the spawner
    draw() {

    }

    update() {
        this.totalTime += this.game.clockTick;

        if (this.totalTime > 0.0 && this.totalTime < 80.0) {
            this.timeElapsed1 += this.game.clockTick;
            if(this.totalTime > 0.0 && this.totalTime < 80.0) {
                if (this.timeElapsed1 > 5.0) {
                    this.game.addEntity(new Unit01(this.game, true));
                    this.timeElapsed1 = 0;
                }
            } 
            // else if(this.totalTime > 40.0 && this.totalTime < 80.0) {
            //     if (this.timeElapsed1 > 10.0) {
            //         this.game.addEntity(new Unit01(this.game, true));
            //         this.timeElapsed1 = 0;
            //     }
            // }
        }

        if(this.totalTime > 40.0 && this.totalTime < 120.0) {
            this.timeElapsed2 += this.game.clockTick;
            if(this.totalTime > 40.0 && this.totalTime < 80.0) {
                if (this.timeElapsed2 > 5.0) {
                    this.game.addEntity(new Unit02(this.game, true));
                    this.timeElapsed2 = 0;
                }
            } else if(this.totalTime > 80.0 && this.totalTime < 120.0) {
                if (this.timeElapsed2 > 10.0) {
                    this.game.addEntity(new Unit02(this.game, true));
                    this.timeElapsed2 = 0;
                }
            } 
            // else if(this.totalTime > 105.0 && this.totalTime < 135.0) {
            //     if (this.timeElapsed2 > 20.0) {
            //         this.game.addEntity(new Unit02(this.game, true));
            //         this.timeElapsed2 = 0;
            //     }
            // }
        }

        if(this.totalTime > 80.0  && this.totalTime < 160.0) {
            this.timeElapsed3 += this.game.clockTick;
            if(this.totalTime > 80.0 && this.totalTime < 120.0) {
                if(this.timeElapsed3 > 5.0) {
                    this.game.addEntity(new Unit03(this.game, true));
                    this.timeElapsed3 = 0;
                }
            } else if (this.totalTime > 120.0 && this.totalTime < 160.0) {
                if(this.timeElapsed3 > 10.0) {
                    this.game.addEntity(new Unit03(this.game, true));
                    this.timeElapsed3 = 0;
                }
            } 
            // else if (this.totalTime > 140.0 && this.totalTime < 175.0) {
            //     if(this.timeElapsed3 > 20.0) {
            //         this.game.addEntity(new Unit03(this.game, true));
            //         this.timeElapsed3 = 0;
            //     }
            // }
        }

        if(this.totalTime > 120.0 && this.totalTime < 200.0) {
            this.timeElapsed4 += this.game.clockTick;
            if(this.totalTime > 120.0 && this.totalTime < 160.0) {
                if(this.timeElapsed4 > 5.0) {
                    this.game.addEntity(new Unit04(this.game, true));
                    this.timeElapsed4 = 0;
                }
            } else if (this.totalTime > 160.0 && this.totalTime < 200.0) {
                if(this.timeElapsed4 > 10.0) {
                    this.game.addEntity(new Unit04(this.game, true));
                    this.timeElapsed4 = 0;
                }
            } 
            // else if (this.totalTime > 175.0 && this.totalTime < 210.0) {
            //     if(this.timeElapsed4 > 20.0) {
            //         this.game.addEntity(new Unit04(this.game, true));
            //         this.timeElapsed4 = 0;
            //     }
            // }
        }

        if (this.totalTime > 160.0 && this.totalTime < 240.0) {
            this.timeElapsed5 += this.game.clockTick;
            if(this.totalTime > 160.0 && this.totalTime < 200.0) {
                if(this.timeElapsed5 > 7.0) {
                    this.game.addEntity(new Unit05(this.game, true));
                    this.timeElapsed5 = 0;
                }
            } else if (this.totalTime > 200.0 && this.totalTime < 240.0) {
                if(this.timeElapsed5 > 10.0) {
                    this.game.addEntity(new Unit05(this.game, true));
                    this.timeElapsed5 = 0;
                }
            } 
            // else if (this.totalTime > 210.0 && this.totalTime < 245.0) {
            //     if(this.timeElapsed5 > 20.0) {
            //         this.game.addEntity(new Unit05(this.game, true));
            //         this.timeElapsed5 = 0;
            //     }
            // }
        }

        if (this.totalTime > 200.0) {
            this.timeElapsed6 += this.game.clockTick;
            if(this.totalTime > 200.0 && this.totalTime < 240.0) {
                if(this.timeElapsed6 > 10.0) {
                    this.game.addEntity(new Unit06(this.game, true));
                    this.timeElapsed6 = 0;
                }
            } else if (this.totalTime > 210.0) {
                if(this.timeElapsed6 > 7.0) {
                    this.game.addEntity(new Unit06(this.game, true));
                    this.timeElapsed6 = 0;
                }
            } 
            // else if (this.totalTime > 210.0 && this.totalTime < 245.0) {
            //     if(this.timeElapsed5 > 20.0) {
            //         this.game.addEntity(new Unit05(this.game, true));
            //         this.timeElapsed5 = 0;
            //     }
            // }
        }
    }
}