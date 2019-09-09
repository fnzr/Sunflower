import World from "@World";
import { GameEvent } from "@Event/EventManager";
import Factory from "@Factory";
import Enemy from "@Object/Enemy";
import { angleStep } from "@Utils";

const levelStart = 1000;

export default function() {
    World.manager.addEvent(levelStart + 0, new GameEvent(() => {
        for(let i=100; i>=85; i -= 15){
            const e = Factory.buildEnemy({x: i, y: 500, speed: {x: 0, y: -2}})
            e.behavior = function(this: Enemy){            
                this.speedY += 0.001;            
                this.fireOnPlayer(2);
                if (this.speedY >= 0) {
                    this.angle = Math.PI / 2;
                    this.speedX = 2;
                    const step = angleStep(1, 2, this.x);
                    this.behavior = () => {
                        this.fireOnPlayer(2);
                        this.speedY = Math.sin(this.angle);
                        this.angle -= step;                    
                    }
                }
            }
        }
    }, 5, 800));
    
    World.manager.addEvent(levelStart + 5000, new GameEvent(() => {
        for(let i=500; i>=485; i -= 15){
            const e = Factory.buildEnemy({x: i, y: 500, speed: {x: 0, y: -2}})
            e.behavior = function(this: Enemy){            
                this.speedY += 0.001;            
                this.fireOnPlayer(2);
                if (this.speedY >= 0) {
                    this.angle = Math.PI / 2;
                    this.speedX = -2;
                    const step = angleStep(1, 2, this.x, 0);
                    this.behavior = () => {
                        this.fireOnPlayer(2);
                        this.speedY = Math.sin(this.angle);
                        this.angle -= step;                    
                    }
                }
            }
        }
    }, 5, 800));
}