class HealthBar {
    constructor(game, unit) {
        Object.assign(this, { game, unit });
    }

    update() {

    }

    draw(ctx) {
        if (this.unit.hp < this.unit.maxHP) {
            var ratio = (this.unit.hp / this.unit.maxHP) < 0 ? 0 : (this.unit.hp / this.unit.maxHP);
            ctx.strokeStyle = "Black";
            console.log(ratio);
            ctx.fillStyle = "Green";
            if(ratio < 0.5) {
                ctx.fillStyle = "yellow"
            }
            if(ratio < 0.2) {
                ctx.fillStyle = "Red"
            }
            ctx.fillRect(this.unit.x - this.game.camera.cameraX, this.unit.y - 10, 40 * 2 * ratio, 4);
            ctx.strokeRect(this.unit.x - this.game.camera.cameraX, this.unit.y - 10, 40 * 2, 4);
        }
    }
}