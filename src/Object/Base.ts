import Settings from "@Settings";

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
}

export abstract class WorldObject extends CoordinateTransformer {
    sprite: PIXI.Sprite;
    speed = 0;
    speedX = 0;
    speedY = 0;
    isEnemy = true;
    radiusSquared = 0;
    angle = 0;

    constructor(sprite: PIXI.Sprite) {
        super();
        this.sprite = sprite;
        this.sprite.anchor.set(0.5);
    }

    get visible() {
        return this.sprite.visible;
    }

    set visible(value: boolean) {
        this.sprite.visible = value;
    }

    addToScreen() {
        this.visible = true;
    }

    updateSpeed() {
        this.speedX = Math.cos(this.angle) * this.speed;
        this.speedY = Math.sin(this.angle) * this.speed;
    }

    removeFromScreen() {
        this.visible = false;
        this.sprite.tint = 0xFFFFFF;
    }

    move(delta: number) {
        this.x += this.speedX * delta;
        this.y += this.speedY * delta;
    }

    abstract update(delta: number, elapsed: number): void;
}