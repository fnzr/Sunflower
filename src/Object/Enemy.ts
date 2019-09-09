import World from "@World";
import { Unit } from "./Unit";
import Settings from '@Settings';
import Factory from "@Factory";

export default class Enemy extends Unit {

    attackCooldown = 20000;
    lastAttack = 0;

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

    fireOnPlayer(speed: number) {
        if (this.lastAttack >= this.attackCooldown) {
            this.lastAttack = 0;
            Factory.buildBullet({x: this.x, y: this.y, speed: {speed, angle: Math.atan2(World.player.y - this.y, World.player.x - this.x)}});
        }
    }

    update(delta: number, elapsed: number): void {
        if (!this.visible || this.x > Settings.ENEMY_LIMIT_X || this.x < -100
            || this.y > Settings.ENEMY_LIMIT_Y || this.y < 0) {
            this.removeFromScreen();
            return;
        }
        this.lastAttack += elapsed;
        this.behavior();        
        this.move(delta);
    }
}