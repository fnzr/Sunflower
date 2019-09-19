import * as PIXI from 'pixi.js';
import Factory from './Factory';
import Settings from '@Settings';
import { installControls, Button } from '@Object/Player/Controller';
import Player from '@Object/Player/Player';
import EventManager, { GameEvent } from '@Event/EventManager';
import Enemy from '@Object/Enemy';
import { Bullet } from '@Object/Bullet';
import Stage1 from '@Stage/Stage1';

function onGameLoaded(world: World) {
    const player = new Player();
    player.x = 250;
    player.y = 100;
    installControls({
        [Button.RIGHT]: "39",
        [Button.LEFT]: "37",
        [Button.UP]: "38",
        [Button.DOWN]: "40",
        [Button.MOD]: "16"
    }, player);
    world.player = player;
    world.unitContainer.addChild(player.sprite);
    player.addToScreen();

    Stage1();
    world.app.start();

}

class World {
    app: PIXI.Application;
    bulletContainer: PIXI.Container;
    unitContainer: PIXI.Container;
    camera: PIXI.Container = new PIXI.Container();
    textures: { [k: string]: PIXI.Texture } = {};
    loader: PIXI.Loader;
    player!: Player;
    gameStep = 0;
    manager: EventManager;
    liveEnemies: Enemy[] = [];

    constructor() {
        this.app = new PIXI.Application({
            height: 600,
            width: 800,
            backgroundColor: 0xdde2ed,
            autoStart: false
        });
        const stage = new PIXI.Container();
        this.app.stage = stage;
        this.bulletContainer = new PIXI.Container();
        stage.addChild(this.bulletContainer);

        this.unitContainer = new PIXI.Container();
        stage.addChild(this.unitContainer);

        this.loader = PIXI.Loader.shared;
        this.loader.add("circle", "assets/circle.png");
        this.loader.add("rect", "assets/rect.png");
        this.loader.load(() => {
            onGameLoaded(this);
        });

        this.app.ticker.maxFPS = 60;
        this.app.ticker.minFPS = 30;
        // Time between physics update
        // Low is more smooth and expensive.
        this.manager = new EventManager();               
        
        let gameTime = 0;
        this.app.ticker.add((delta) => {
            gameTime += this.app.ticker.elapsedMS;
            this.manager.execute(gameTime);
            const deltaSeconds = this.app.ticker.elapsedMS / 1000;
            //gameTime += deltaSeconds;
            Factory.Pools[Bullet.name].forEach(bullet => {
                if (bullet.visible) bullet.update(deltaSeconds, this.app.ticker.elapsedMS)
            })
            this.liveEnemies.forEach(enemy => {
                enemy.update(deltaSeconds, this.app.ticker.elapsedMS);
            })
            this.player.update(deltaSeconds, this.app.ticker.elapsedMS);
            //this.gameStep += 1;
            document.getElementById("fps")!.innerHTML = Math.floor(this.app.ticker.FPS).toString();
        })
    }
}

export default new World();