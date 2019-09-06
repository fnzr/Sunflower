import Factory from "@Factory";

export class Spawner {

    static spawn() {
        const bullet = Factory.buildBullet();
        
        bullet.x = 500;
        bullet.y = 500;
        bullet.speedX = 0;
        bullet.speedY = 0;
        //bullet.sprite.tint = 0xFF00FF
    }

    static clear(clear = true) {
        if (clear) {
            if ("SpawnBullet" in Factory.Pools) {
                Factory.Pools["SpawnBullet"].forEach(b => b.destroyed = true);
            }
        }
    }

    static async halfmoon(initialAngle = 7 * Math.PI / 4, clear = true) {
        this.clear(clear);
        const radius = 15;
        const waves = 8;
        const count = 6;
        //const rotation = Math.PI / 4;
        const step = Math.PI / 24;
        //console.log(step);
        const colors = [0x9400D3, 0x4B0082, 0x0000FF, 0x00FF00, 0xFFFF00, 0xFF7F00, 0xFF0000];
        for (let w = 0; w < waves; w++) {            
            initialAngle -= step + 0.02;
            for (let i = 0; i < count; i++) {
                const bullet = Factory.buildBullet();
                bullet.speed = 1;
                bullet.angle = initialAngle - (step * i);
                bullet.x = 500 + radius * Math.cos(bullet.angle);
                bullet.y = 500 + radius * Math.sin(bullet.angle);
                bullet.updateSpeed();
                bullet.sprite.tint = colors[i];
                await this.sleep(100);
            }
            await this.sleep(700);
        }
    }

    static async fullmoon() {
        let angle = 7 * Math.PI / 4;
        for(let i =0; i< 4; i++) {
            this.halfmoon(angle, false)
            angle -= Math.PI / 2;
            await this.sleep(200);
        }
    }

    static sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}