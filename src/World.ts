import * as PIXI from 'pixi.js';
import Factory from './Factory';
import Settings from '@Settings';
import { installControls, Button } from '@Object/Player/Controller';
import Player from '@Object/Player/Player';
import EventManager, { GameEvent } from '@Event/EventManager';
import Enemy, { Behavior } from '@Object/Enemy';

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

    constructor() {
        this.app = new PIXI.Application({
            height: Settings.WORLD_HEIGHT,
            width: Settings.WORLD_WIDTH,
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

        let lag = 0;
        let pools = Object.values(Factory.Pools);
        this.app.ticker.maxFPS = 60;
        this.app.ticker.minFPS = 30;
        // Time between physics update
        // Low is more smooth and expensive.
        const STEP_SIZE = 0.1;
        this.manager = new EventManager();
        let x: Enemy;
        this.manager.addEvent(1000, new GameEvent(() => {
            x = Factory.buildEnemy(250, 100, { speed: 1, angle: Math.PI / 2 })
        }, 5, 1));
        this.manager.addEvent(1001, new GameEvent(() => {
            x.behavior = Behavior.create({ angle: 0.01 });
        }, 5, 600));
        let gameTime = 0;
        this.app.ticker.add(() => {
            gameTime += this.app.ticker.elapsedMS;
            this.manager.execute(gameTime);
            lag += this.app.ticker.deltaTime;
            while (lag >= STEP_SIZE) {
                if (Factory.poolsKeyChanged) {
                    pools = Object.values(Factory.Pools)
                }
                pools.forEach(pool => pool.forEach(worldObject => {
                    if (worldObject.visible) worldObject.update(STEP_SIZE, this.app.ticker.elapsedMS)
                }));
                this.player.update(STEP_SIZE, this.app.ticker.elapsedMS);
                lag -= STEP_SIZE;
            }
            document.getElementById("fps")!.innerHTML = Math.floor(this.app.ticker.FPS).toString();
        })
    }
}

export default new World();