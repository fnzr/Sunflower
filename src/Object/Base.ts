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

    set z(value: number) {
        this._z = value;
        this.sprite.zIndex = -this.z; //Math goes here
    }

    get z(): number {
        return this._z;
    }
}

export abstract class WorldObject extends CoordinateTransformer {
    sprite: PIXI.Sprite;
    destroyed = false;
    speedX = 0;
    speedY = 0;

    constructor(sprite: PIXI.Sprite) {
        super();
        this.sprite = sprite;
    }

    abstract removeFromScreen(): void;

    abstract update(delta: number, elapsed: number): void;
}