import Factory from "@Factory";
import { sleep } from "@Utils";

export class Spawner {

    static spawn() {
        const bullet = Factory.buildBullet();

        bullet.x = 250;
        bullet.y = 500;
        bullet.speedX = 0;
        bullet.speedY = 0;
        //bullet.sprite.tint = 0xFF00FF
    }

    static async PsychdelicWave(initialAngle = 7 * Math.PI / 4, clockwise = true, clear = true) {
        if (clear) Factory.reset();
        const radius = 1;
        const waves = 1;
        const count = 32;
        const step = (clockwise ? -1 : +1) * 0.08;
        const angleStep = (clockwise ? -1 : + 1) * 0.15;
        const colors = [0x9400D3, 0x4B0082, 0x0000FF, 0x00FF00, 0xFFFF00, 0xFF7F00, 0xFF0000];
        for (let w = 0; w < waves; w++) {
            initialAngle = initialAngle + step;
            for (let i = 0; i < count; i++) {
                const bullet = Factory.buildBullet();
                bullet.speed = 1.5;
                bullet.angle = initialAngle + (angleStep * i);
                bullet.x = 250 + radius * Math.cos(bullet.angle);
                bullet.y = 700 + radius * Math.sin(bullet.angle);
                bullet.updateSpeed();
                bullet.sprite.tint = colors[i % 7];
                await sleep(50);
            }
            await sleep(100);
        }
    }

    static async PsychdelicMadness() {
        let angle = 7 * Math.PI / 4;
        for (let i = 0; i < 4; i++) {
            this.PsychdelicWave(angle, false, false)
            angle -= Math.PI / 2;
            //await sleep(200);
        }
        //await sleep(500)
        angle = 7 * Math.PI / 4;
        for (let i = 0; i < 4; i++) {
            this.PsychdelicWave(angle, true, false)
            angle += Math.PI / 2;
            //await sleep(200);
        }
    }
}