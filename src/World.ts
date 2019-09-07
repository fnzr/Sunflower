import * as PIXI from 'pixi.js';
import Factory from './Factory';
import Settings from '@Settings';
import { installControls, Button } from '@Object/Player/Controller';
import Player from '@Object/Player/Player';

function onGameLoaded(world: World) {
    const player = Factory.buildPlayer();
    player.x = 250;
    player.y = 100;
    installControls({
        [Button.RIGHT]: "39",
        [Button.LEFT]: "37",
        [Button.UP]: "38",
        [Button.DOWN]: "40",
        [Button.MOD]: "16"
    }, player);
    world.players.push(player);
}

class World {
    app: PIXI.Application;
    bulletContainer: PIXI.ParticleContainer;
    unitContainer: PIXI.Container;
    camera: PIXI.Container = new PIXI.Container();
    textures: { [k: string]: PIXI.Texture } = {};
    loader: PIXI.Loader;
    players: Player[] = [];

    constructor() {
        this.app = new PIXI.Application({
            height: Settings.WORLD_HEIGHT,
            width: Settings.WORLD_WIDTH,
            backgroundColor: 0xdde2ed,
            autoStart: false
        });
        const stage = new PIXI.Container();
        this.app.stage = stage;
        this.bulletContainer = new PIXI.ParticleContainer();
        stage.addChild(this.bulletContainer);

        this.unitContainer = new PIXI.Container();
        stage.addChild(this.unitContainer);

        this.loader = PIXI.Loader.shared;
        this.loader.add("circle", "assets/circle.png");
        this.loader.add("rect", "assets/rect.png");
        this.loader.load(() => {
            onGameLoaded(this);
        });
        const gameStep = 90 / 1500;
        let pools = Object.values(Factory.Pools);
        this.app.ticker.maxFPS = 60;
        this.app.ticker.minFPS = 30;
        let lag = 0;
        this.app.ticker.add(() => {
            //lag += delta;
            if (Factory.poolsKeyChanged) {
                pools = Object.values(Factory.Pools)
            }
            document.getElementById("fps")!.innerHTML = Math.floor(this.app.ticker.FPS).toString();
            pools.forEach(pool => pool.forEach(worldObject => {
                if (!worldObject.destroyed) worldObject.update(this.app.ticker.deltaTime, this.app.ticker.elapsedMS)
            }));
        })
    }
}

export default new World();