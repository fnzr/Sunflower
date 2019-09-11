import * as PIXI from 'pixi.js'
import Settings from "@Settings";
import World from "@World";

abstract class CoordinateTransformer {

    private _x = 0
    private _y = 0
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

interface SpeedAngular {
    speed: number
    angle: number
}

interface SpeedScalar {
    x: number
    y: number
}

export interface Properties {
    x: number;
    y: number;
    speed: SpeedAngular | SpeedScalar;
    radius?: number;
    texture?: PIXI.Texture;
}

export abstract class WorldObject extends CoordinateTransformer {
    sprite: PIXI.Sprite;
    speed = 0;
    speedX = 0;
    speedY = 0;
    isEnemy = true;
    radiusSquared = 0;
    angle = 0;
    timeAlive = 0;

    constructor(texture?: PIXI.Texture) {
        super();
        this.sprite = PIXI.Sprite.from(texture ? texture : PIXI.Texture.WHITE);
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
        this.timeAlive = 0;
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

    setProperties(props: Properties) {
        this.x = props.x;
        this.y = props.y;
        if ("speed" in props.speed) {
            this.speed = props.speed.speed;
            this.angle = props.speed.angle;
            this.updateSpeed();
        }
        else {
            this.speedX = props.speed.x;
            this.speedY = props.speed.y;
        }
        this.sprite.texture = props.texture ? props.texture : World.loader.resources.rect.texture;
        this.radiusSquared = Math.pow(props.radius ? props.radius : 2, 2);
    }

    behavior() {}

    update(delta: number, elapsed: number) {
        this.timeAlive += elapsed;
        this.behavior();
        this.move(delta);
    }
}