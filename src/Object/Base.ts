import * as PIXI from 'pixi.js';
import Settings from "@Settings";
import World from "@World";

abstract class CoordinateTransformer {

    private _x = 0
    private _y = 0
    private _z = 0;
    abstract sprite: PIXI.DisplayObject

    set x(value: number) {
        this._x = value;
        this.sprite.x = this.x; //Math goes here
    }

    get x(): number {
        return this._x;
    }

    set y(value: number) {
        this._y = value;
        this.sprite.y = Settings.WORLD_HEIGHT - this.y;
    }

    get y(): number {
        return this._y;
    }

    set z(value: number) {
        this._z = value;
        this.sprite.zIndex = -this.z; //Math goes here
    }

    get z(): number {
        return this._z;
    }
}

export abstract class WorldObject extends CoordinateTransformer{
    sprite: PIXI.Sprite;
    destroyed = false;
    speedX = 0;
    speedY = 0;

    constructor(sprite: PIXI.Sprite) {
        super();
        this.sprite = sprite;
    }

    abstract update(delta: number, elapsed: number): void;
}

export class Bullet extends WorldObject {
    speed = 0;
    timeAlive = 0;
    angle = 0;

    constructor() {        
        super(PIXI.Sprite.from(World.loader.resources.circle.texture));
    }

    addToScreen() {
        World.bulletContainer.addChild(this.sprite);
    }

    removeFromScreen() {
        World.bulletContainer.removeChild(this.sprite);
        this.destroyed = true;
    }

    setupBullet() {
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