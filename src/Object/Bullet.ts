import * as PIXI from 'pixi.js'
import World from "@World";
import { WorldObject } from "./Base";
import Settings from "@Settings";

export class Bullet extends WorldObject {
    speed = 0;
    timeAlive = 0;
    angle = 0;

    constructor() {
        super(PIXI.Sprite.from(World.loader.resources.circle.texture));
    }

    removeFromScreen() {
        World.bulletContainer.removeChild(this.sprite);
        this.destroyed = true;
    }

    addToScreen() {
        World.bulletContainer.addChild(this.sprite);
        this.destroyed = false;
        this.sprite.tint = 0xFFFFFF;
    }

    move(delta: number) {
        this.x += this.speedX * delta;
        this.y += this.speedY * delta;
    }

    updateSpeed() {
        this.speedX = Math.cos(this.angle) * this.speed;
        this.speedY = Math.sin(this.angle) * this.speed;
    }

    update(delta: number, elapsed: number): void {
        this.timeAlive += elapsed;
        if (this.destroyed || this.x > Settings.WORLD_WIDTH || this.x < 0
            || this.y > Settings.WORLD_HEIGHT || this.y < 0) {
            this.removeFromScreen();
            return;
        }
        //this.trigger(delta);
        this.move(delta);
    }
}