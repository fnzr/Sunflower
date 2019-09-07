import * as PIXI from 'pixi.js'
import { Unit } from "@Object/Unit";
import World from '@World';
import Controller from './Controller';
import Settings from '@Settings';
import { Bullet } from '@Object/Bullet';

export default class Player extends Unit {
    controller: Controller;

    constructor(tint = 0x0) {
        super(PIXI.Sprite.from(World.loader.resources.rect.texture));
        this.radiusSquared = 16;
        this.isEnemy = false;
        this.sprite.tint = tint;
        this.controller = new Controller(this);
    }

    set x(value: number) {
        if (value > Settings.WORLD_WIDTH - 8) {
            value = Settings.WORLD_WIDTH - 8;
        }
        else if (value < 0) {
            value = 0;
        }
        super.x = value;
    }

    get x() {
        return super.x;
    }

    set y(value: number) {
        if (value > Settings.WORLD_HEIGHT) {
            value = Settings.WORLD_HEIGHT;
        }
        else if (value < 12) {
            value = 12;
        }
        super.y = value;
    }

    get y() {
        return super.y;
    }

    onHit(bullet: Bullet) {
        console.log("Hit!");
    }

    move(delta: number) {
        this.x += this.speedX * delta;
        this.y += this.speedY * delta;
    }

    update(delta: number, elapsed: number): void {
        this.controller.update();
        this.move(delta);
    }
}