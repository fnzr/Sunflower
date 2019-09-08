import * as PIXI from 'pixi.js'
import World from "@World";
import { WorldObject } from "./Base";
import Settings from "@Settings";

export class Bullet extends WorldObject {
    timeAlive = 0;

    constructor() {
        super(PIXI.Sprite.from(World.loader.resources.circle.texture));
        this.radiusSquared = 64;
    }

    checkColision() {
        //if (this.isEnemy) {
        const distance = Math.pow(World.player.x - this.x, 2) + Math.pow(World.player.y - this.y, 2);
        if (distance <= this.radiusSquared) {
            World.player.onHit(this);
            this.removeFromScreen();
        }
        //}
    }

    update(delta: number, elapsed: number): void {
        this.timeAlive += elapsed;
        if (!this.visible || this.x > Settings.WORLD_WIDTH || this.x < 0
            || this.y > Settings.WORLD_HEIGHT || this.y < 0) {
            this.removeFromScreen();
            return;
        }
        //this.trigger(delta);
        this.checkColision();
        this.move(delta);
    }
}