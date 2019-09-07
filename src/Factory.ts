import { WorldObject } from "@Object/Base";
import { Bullet } from "@Object/Bullet";
import Player from "@Object/Player/Player";

export default class Factory {

    static Pools: { [className: string]: WorldObject[] } = {};
    static poolsKeyChanged = false;

    static reset(clear = false) {
        this.Pools["Bullet"].forEach(obj => obj.removeFromScreen());
        if (clear) {
            this.Pools = {};
        }
    }

    static getPoolForClass(className: string) {
        if (!(className in this.Pools)) {
            this.poolsKeyChanged = true;
            this.Pools[className] = [];
        }
        return this.Pools[className];
    }

    static buildPlayer() {
        const pool = this.getPoolForClass(Player.name);
        const player = new Player();
        pool.push(player);
        player.addToScreen();
        return player;
    }

    static buildBullet() {
        const pool = this.getPoolForClass(Bullet.name);
        let bullet = pool.find((b => b.destroyed)) as Bullet;
        if (bullet === undefined) {
            bullet = new Bullet();
            pool.push(bullet);
        }
        bullet.addToScreen();
        return bullet;
    }
}