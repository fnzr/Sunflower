import World from "@World";
import { WorldObject, Properties } from "./Base";
import Settings from "@Settings";

export class Bullet extends WorldObject {
    timeAlive = 0;

    constructor() {
        super();
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

    setProperties(props: Properties) {
        props.texture = props.texture ? props.texture : World.loader.resources.circle.texture;
        super.setProperties(props);        
    }

    update(delta: number, elapsed: number): void {
        this.timeAlive += elapsed;
        if (!this.visible || this.x > Settings.WORLD_WIDTH || this.x < 0
            || this.y > Settings.WORLD_HEIGHT || this.y < 0) {
            this.removeFromScreen();
            return;
        }
        this.behavior();
        this.move(delta);
    }
}