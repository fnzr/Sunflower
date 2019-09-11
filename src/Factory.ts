import { WorldObject, Properties } from "@Object/Base";
import { Bullet } from "@Object/Bullet";
import World from "@World";
import Enemy, { EnemyProperties } from "@Object/Enemy";

export default class Factory {

    static Pools: { [className: string]: WorldObject[] } = {
        [Bullet.name]: [],
        [Enemy.name]: []
    };
    static poolsKeyChanged = false;

    static reset(clear = false) {
        this.Pools["Bullet"].forEach(obj => obj.removeFromScreen());
        /*
        if (clear) {
            this.Pools = {};
        }
        */
    }

    static buildEnemy(props: EnemyProperties) {
        const pool = this.Pools[Enemy.name];
        let enemy = pool.find((e => !e.visible)) as Enemy;
        if (enemy === undefined) {
            enemy = new Enemy();
            pool.push(enemy);
            World.unitContainer.addChild(enemy.sprite);
        }
        enemy.setProperties(props);
        enemy.behavior = () => {};        
        enemy.addToScreen();
        return enemy;
    }

    static buildBullet(props: Properties) {
        const pool = this.Pools[Bullet.name];
        let bullet = pool.find((b => !b.visible)) as Bullet;
        if (bullet === undefined) {
            bullet = new Bullet();
            pool.push(bullet);
            World.bulletContainer.addChild(bullet.sprite);
        }
        bullet.behavior = () => {};
        bullet.setProperties(props);
        bullet.addToScreen();       
        return bullet;
    }
}