import World from "@World";
import { GameEvent } from "@Event/EventManager";
import Factory from "@Factory";
import Enemy from "@Object/Enemy";
import { angleStep, sleep, randomFloat, randomInt } from "@Utils";
import Settings from "@Settings";
import _ from "lodash";

interface Point {x: number, y: number};

function Fairy(start: Point, end?: Point) {
    const f = Factory.buildEnemy({x: start.x, y: start.y, speed: {x: 0, y: -70}, attackCooldown: 2000})
    if (end !== undefined) {
        f.speed = -70;
        f.angle = Math.atan2(start.y - end.y, start.x - end.x);
        f.updateSpeed()
    }
    f.behavior = function(this:Enemy){
        if (this.timeAlive > 1500 || (end && this.x == end.x && this.y == end.y)) {
            this.speedX = 0;
            this.speedY = 0;
            f.behavior = function(this: Enemy) {
                this.fireArc(10, 80);
            }
        }
    }
}

function ArcFairy(start: Point, leftToRight: boolean) {
    const speedX = 70 * (leftToRight ? 1 : -1);
    const end = leftToRight ? Settings.WORLD_WIDTH : 0;

    const e = Factory.buildEnemy({x: start.x, y: start.y, speed: {x: 0, y: -70}, attackCooldown: 2000})
    e.behavior = function(this: Enemy){            
        //this.speedY += (ySpeedMod * delta);
        //this.fireAtPlayer(bulletSpeed);
        if (this.timeAlive >= 3000) {
            this.angle = Math.PI / 2;
            this.speedX = speedX;
            const step = angleStep(1, Math.abs(this.speedX), this.x, end);
            this.behavior = (delta) => {
                this.fireAtPlayer(60);
                this.speedY = 30 * Math.sin(this.angle);
                this.angle -= step * delta;
            }
        }
    }
}

function FairyTrain(start: Point, shootTime: number, ySpeedMod = 0) {
    const angleStep = 0.05;
    const e = Factory.buildEnemy({x: start.x, y: start.y, speed: {x: 70, y: 0}})
    e.angle = 0;
    e.behavior = function(this: Enemy) {
        this.angle += angleStep;
        this.speedY = 50 * Math.sin(this.angle) + ySpeedMod;
        if (this.timeAlive >= shootTime) {
            this.fireAtPlayer(80);
            this.behavior = () => {
                this.angle += angleStep;
                this.speedY =  40 * Math.sin(this.angle) - ySpeedMod;
            }
        }
    }
}

export default async function() {
    let fairiesPos = [300, 230, 50, 350, 180, 110];
    let delay = 1000;
    fairiesPos.forEach((pos, index) => {
        //World.manager.addEvent(1000 + (delay * index), new GameEvent(() => Fairy({x:pos, y:500})));
    })    
    //downAndFire(500, [300, 230, 50, 350, 180, 110]);    
    delay = 200;
    let shootTime = [1000, 4000, 8955, 7455, 9001, 8000, 1870, 2580, 7870, 3558];
    _.times(10, async (i) => {
        const time = 1000 + (delay * i);
        World.manager.addEvent(time, new GameEvent(() => FairyTrain({x:-10, y: 300}, shootTime[i])));
    });
    /*
    _.times(10, async (i) => {
        World.manager.addEvent(6000 + (delay * i), new GameEvent(() => ArcFairy({x:60, y: 500}, true)));
        World.manager.addEvent(6000 + (delay * i), new GameEvent(() => ArcFairy({x:70, y: 500}, true)));
        //downStopArc(1000 + (delay * i), [340], 500, -80, 0, -60, 10, 40, 5000);
        //downStopArc(1000 + (delay * i), [30, 40], 500, 2, Settings.WORLD_WIDTH, -2, 0.1, 2, 5000);
    })
    
    //delay = 2000;
    _.times(10, async (i) => {
        World.manager.addEvent(16000 + (delay * i), new GameEvent(() => ArcFairy({x:330, y: 500}, false)));
        World.manager.addEvent(16000 + (delay * i), new GameEvent(() => ArcFairy({x:340, y: 500}, false)));
    })
    */
    
}