import World from "@World";
import { Unit } from "./Unit";
import Settings from '@Settings';
import Factory from "@Factory";
import { Properties } from "./Base";

export type EnemyProperties = Properties & {attackCooldown?: number}

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

    setProperties(props: EnemyProperties) {
        this.attackCooldown = props.attackCooldown ? props.attackCooldown : 0;
        super.setProperties(props);        
    }

    get canAttack() {
        return this.lastAttack >= this.attackCooldown;
    }

    fireAtPlayer(speed: number) {
        if (this.canAttack) {
            this.lastAttack = 0;
            Factory.buildBullet({x: this.x, y: this.y, speed: {speed, angle: Math.atan2(World.player.y - this.y, World.player.x - this.x)}});
        }
    }

    fireArc(shotCount: number, speed: number, angle = 0, spread = -Math.PI) {
        if (!this.canAttack) {
            return;
        }
        this.lastAttack = 0;
        const angleStep = (spread - angle) / shotCount;
        for(let i=0; i<shotCount; i++) {
            const ang = angle + angleStep * i;
            Factory.buildBullet({x: this.x, y: this.y, speed: {speed, angle: ang}})
        }
        
    }

    update(delta: number, elapsed: number): void {
        if (!this.visible || this.x > Settings.ENEMY_LIMIT_X || this.x < -100
            || this.y > Settings.ENEMY_LIMIT_Y || this.y < 0) {
            this.removeFromScreen();
            return;
        }
        super.update(delta, elapsed);
        this.lastAttack += elapsed;        
    }
}