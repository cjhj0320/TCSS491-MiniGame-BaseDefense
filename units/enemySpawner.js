class EnemySpawner {
    /**
     * Can be used to spawn enemy units along either a predefined path or a manual path. Useful for debugging.
     * Can also be inserted into the game engine's gameEntities to spawn waves of enemies.
     */
    constructor(game) {
        Object.assign(this, { game });

        this.timeElapsed = 0;
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
        this.timeElapsed += this.game.clockTick;
        this.timeElapsed2 += this.game.clockTick;
        this.timeElapsed3 += this.game.clockTick;
        this.timeElapsed4 += this.game.clockTick;
        this.timeElapsed5 += this.game.clockTick;
        this.timeElapsed6 += this.game.clockTick;
        this.timeElapsed7 += this.game.clockTick;

        if (this.timeElapsed > 5.0) {
                this.game.addEntity(new Unit01(this.game, true));
            this.timeElapsed = 0;
        }
    }
}