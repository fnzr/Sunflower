import { WorldObject } from "@Object/Base";
import { Bullet } from "@Object/Bullet";
import Player from "@Object/Player/Player";
import World from "@World";
import Enemy from "@Object/Enemy";

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

    static buildEnemy(x: number, y: number, props: {
        speed?: number;
        angle?: number;
    }) {
        const pool = this.getPoolForClass(Enemy.name);
        let enemy = pool.find((e => !e.visible)) as Enemy;
        if (enemy === undefined) {
            enemy = new Enemy();
            pool.push(enemy);
            World.unitContainer.addChild(enemy.sprite);
        }
        enemy.x = x;
        enemy.y = y;
        enemy.setProperties(props);
        enemy.addToScreen();
        return enemy;
    }

    static buildBullet() {
        const pool = this.getPoolForClass(Bullet.name);
        let bullet = pool.find((b => !b.visible)) as Bullet;
        if (bullet === undefined) {
            bullet = new Bullet();
            pool.push(bullet);
            World.bulletContainer.addChild(bullet.sprite);
        }
        bullet.addToScreen();
        return bullet;
    }
}