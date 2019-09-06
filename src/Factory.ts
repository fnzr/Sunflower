import { Bullet, WorldObject } from "@Object/Base";

export default class Factory {

    static Pools: { [className: string]: WorldObject[] } = {};
    static poolsKeyChanged = false;

    static getPoolForClass(className: string) {
        if (!(className in this.Pools)) {
            this.poolsKeyChanged = true;
            this.Pools[className] = [];
        }
        return this.Pools[className];
    }

    static buildBullet() {        
        const pool = this.getPoolForClass(Bullet.name);
        let bullet = pool.find((b => b.destroyed)) as Bullet;
        if (bullet === undefined) {
            bullet = new Bullet();            
            pool.push(bullet);            
        }
        bullet.addToScreen();
        bullet.setupBullet();
        return bullet;
    }
}