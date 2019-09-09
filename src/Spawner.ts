import Factory from "@Factory";
import { sleep } from "@Utils";

export class Spawner {

    static async spawn() {
        const bullet = Factory.buildBullet({x:240, y:380, speed: 1, angle: 3 * Math.PI / 2});
        //bullet.speed = 1.5;
        bullet.updateSpeed();
    }

    static async PsychdelicWave(initialAngle = 7 * Math.PI / 4, clockwise = true, clear = true) {
        if (clear) Factory.reset();
        const radius = 1;
        const waves = 1;
        const count = 16;
        const step = (clockwise ? -1 : +1) * 0.08;
        const angleStep = (clockwise ? -1 : + 1) * 0.15;
        const colors = [0x9400D3, 0x4B0082, 0x0000FF, 0x00FF00, 0xFFFF00, 0xFF7F00, 0xFF0000];
        for (let w = 0; w < waves; w++) {
            initialAngle = initialAngle + step;
            for (let i = 0; i < count; i++) {
                const angle = initialAngle + (angleStep * i);
                const x = 240 + radius * Math.cos(angle);
                const y = 380 + radius * Math.sin(angle);
                const bullet = Factory.buildBullet({x, y, speed: 1.5, angle: angle});
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