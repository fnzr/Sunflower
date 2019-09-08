import * as PIXI from 'pixi.js';
import World from "@World";
import { Unit } from "./Unit";

export class Behavior {
    speed: number;
    angle: number;

    static create({
        speed = 0,
        angle = 0
    }) {
        const behavior = new Behavior(speed, angle);
        return behavior;
    }

    private constructor(speed: number, angle: number) {
        this.speed = speed;
        this.angle = angle
    }
}

export default class Enemy extends Unit {

    _behavior: Behavior = Behavior.create({});

    constructor() {
        super(PIXI.Sprite.from(World.loader.resources.rect.texture))
    }

    addToScreen() {
        this.sprite.tint = 0xFF0000;
    }

    setProperties({
        speed = 0,
        angle = 0
    }) {
        this.speed = speed;
        this.angle = angle;
        this.updateSpeed();
    }

    set behavior(value: Behavior) {
        this._behavior = value;
    }

    get behavior() {
        return this._behavior;
    }

    update(delta: number, elapsed: number): void {
        this.angle += (this.behavior.angle * delta);
        this.speed += (this.behavior.speed * delta);
        this.updateSpeed();
        this.move(delta);
    }
}