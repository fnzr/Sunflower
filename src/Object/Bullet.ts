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
        this.radiusSquared = 64;
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

    checkColision() {
        if (this.isEnemy) {
            World.players.forEach(player => {
                const distance = Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2);
                if (distance <= this.radiusSquared) {
                    player.onHit(this);
                    this.removeFromScreen();
                }
            })
        }
    }

    update(delta: number, elapsed: number): void {
        this.timeAlive += elapsed;
        if (this.destroyed || this.x > Settings.WORLD_WIDTH || this.x < 0
            || this.y > Settings.WORLD_HEIGHT || this.y < 0) {
            this.removeFromScreen();
            return;
        }
        //this.trigger(delta);
        this.checkColision();
        this.move(delta);
    }
}