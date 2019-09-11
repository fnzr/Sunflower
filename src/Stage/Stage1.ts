import World from "@World";
import { GameEvent } from "@Event/EventManager";
import Factory from "@Factory";
import Enemy from "@Object/Enemy";
import { angleStep, sleep, randomFloat, randomInt } from "@Utils";
import Settings from "@Settings";
import _ from "lodash";
const levelStart = 1000;

function downAndFire(start: number, positions: number[]) {
World.manager.addEvent(start, new GameEvent(async () => {
        //const pos = [300, 230, 50, 350, 180, 110]
        for (let i = 0; i < positions.length; i++) {
            const speedGain = randomFloat(0.0001, 0.003);
            const e = Factory.buildEnemy({x: positions[i], y: 500, speed: {x: 0, y: -2.5}, attackCooldown: 15000})
            e.behavior = function(this: Enemy){            
                this.speedY += speedGain;
                if (this.speedY >= 0) {
                    this.behavior = () => this.fireArc(4, 2, - Math.PI / 4);
                }
            }
            await sleep(1500);
        }
    }));
}

function arcAndFire(start: number, y: number, x: number, speedX: number, angleStep: number, yMod: number, bulletSpeed: number, shootTime: number){
    World.manager.addEvent(start, new GameEvent(async () => {
        //const shootTime = [10000, 8000, 25000, 21580, 12000, 14000, 6870, 2580, 7870, 9999];
        const e = Factory.buildEnemy({x, y, speed: {x: speedX, y: 0}})
        e.angle = angleStep;
        e.behavior = function(this: Enemy) {
            this.angle += angleStep;
            this.speedY = Math.sin(this.angle) - yMod;
            if (this.timeAlive >= shootTime) {
                this.fireAtPlayer(bulletSpeed);
                this.behavior = () => {
                    this.angle += angleStep;
                    this.speedY = Math.sin(this.angle) - yMod;
                }
            }
        }
    }));
}

function downStopArc(start: number, positions: number[], y: number, xSpeed: number, xEnd: number, ySpeed: number, ySpeedMod: number, bulletSpeed: number) {
    World.manager.addEvent(start, new GameEvent(() => {
        //const pos = [330, 340];
        for(let i=0; i < positions.length; i++){
            const e = Factory.buildEnemy({x: positions[i], y: y, speed: {x: 0, y: ySpeed}, attackCooldown: 20000})            
            e.behavior = function(this: Enemy){            
                this.speedY += ySpeedMod;
                this.fireAtPlayer(bulletSpeed);
                if (this.speedY >= 0) {
                    this.angle = Math.PI / 2;
                    this.speedX = xSpeed;
                    const step = angleStep(1, xSpeed, this.x, xEnd);
                    this.behavior = () => {
                        this.fireAtPlayer(bulletSpeed);
                        this.speedY = Math.sin(this.angle);
                        this.angle -= step;                    
                    }
                }
            }
        }
    }));
}
export default async function() {
    downAndFire(1000, [300, 230, 50, 350, 180, 110]);    
    let delay = 500;
    _.times(10, async (i) => {
        downStopArc(10000 + (delay * i), [330, 340], 500, -2, 0, -2, 0.001, 2);
        downStopArc(10000 + (delay * i), [30, 40], 500, 2, Settings.WORLD_WIDTH, -2, 0.001, 2);
    })
    delay = 300;
    let pos = [10000, 8000, 25000, 21580, 12000, 14000, 6870, 2580, 7870, 9999];
    _.times(10, async (i) => {
        arcAndFire(25000 + (i * delay), 380, 0, 2, 0.005, 0, 2, pos[i]);
    })
}