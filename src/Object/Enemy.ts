import World from "@World";
import { Unit } from "./Unit";
import Settings from '@Settings';

export default class Enemy extends Unit {

    attackCooldown = 20000;
    lastAttack = 20000;
    index = 0;
    constructor() {
        super()
    }

    addToScreen() {
        super.addToScreen();
        this.sprite.tint = 0xFF0000;        
        World.liveEnemies.push(this);
    }

    removeFromScreen() {
        super.removeFromScreen();
        const index = World.liveEnemies.indexOf(this);
        World.liveEnemies.splice(index, 1);
    }

    update(delta: number, elapsed: number): void {
        if (!this.visible || this.x > Settings.ENEMY_LIMIT_X || this.x < -100
            || this.y > Settings.ENEMY_LIMIT_Y || this.y < 0) {
            this.removeFromScreen();
            return;
        }
        //console.log(this.y)
        this.lastAttack += elapsed;
        this.behavior();
        this.updateSpeed();
        this.move(delta);
    }
}