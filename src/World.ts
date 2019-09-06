import * as PIXI from 'pixi.js';
import Factory from './Factory';
import Settings from '@Settings';

class World {
    app: PIXI.Application;
    bulletContainer: PIXI.ParticleContainer;
    camera: PIXI.Container = new PIXI.Container();
    textures: { [k: string]: PIXI.Texture } = {};
    loader: PIXI.Loader;

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

        this.loader = PIXI.Loader.shared;
        this.loader.add("circle", "assets/circle.png");
        this.loader.load();

        let pools = Object.values(Factory.Pools);
        this.app.ticker.add(delta => {
            if (Factory.poolsKeyChanged) {
                pools = Object.values(Factory.Pools)
            }
            document.getElementById("fps")!.innerHTML = Math.floor(this.app.ticker.FPS).toString();
            pools.forEach(pool => pool.forEach(worldObject => {
                if (!worldObject.destroyed) worldObject.update(delta, this.app.ticker.elapsedMS)
            }));
        })
    }
}

export default new World();