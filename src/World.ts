//import { Projectile } from '@Object/Projectile';
//import { Unit } from '@Object/Unit';
//import Settings from '@Settings';
//import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';
import Factory from './Factory';
import Settings from '@Settings';
//import { Queue } from '@Event';

class World {
    app: PIXI.Application;
    bulletContainer: PIXI.ParticleContainer;
    camera: PIXI.Container = new PIXI.Container();
    textures: {[k: string]: PIXI.Texture} = {};
    loader: PIXI.Loader;

    constructor() {
        this.app = new PIXI.Application({
            height: Settings.WORLD_HEIGHT,
            width: Settings.WORLD_WIDTH,
            backgroundColor: 0xdde2ed, 
            autoStart: false,
            transparent: true 
        });
        const stage = new PIXI.Container();
        this.app.stage = stage;
        this.bulletContainer = new PIXI.ParticleContainer();
        stage.addChild(this.bulletContainer);

        this.loader = PIXI.Loader.shared;
        this.loader.add("circle", "assets/circle.png");
        this.loader.load();
        
        //;        //this.textures["circle8"] = this.app.renderer.generateTexture(graphics, 1, 1);
        
        //loader.add("circle8", graphics);

        //const texture = PIXI.Texture.fromImage("/assets/background/Forest.webp");
        //const tilling = new PIXI.extras.TilingSprite(texture, 1280, 720);
        //stage.addChild(tilling);

        let pools = Object.values(Factory.Pools);
        this.app.ticker.add(delta => {
            if (Factory.poolsKeyChanged) {
                pools = Object.values(Factory.Pools)
            }
            document.getElementById("fps")!.innerHTML = Math.floor(this.app.ticker.FPS).toString();
            //console.log(this.app.ticker.FPS);
            pools.forEach(bArr => bArr.forEach(b => {
                if (!b.destroyed) b.update(delta, this.app.ticker.elapsedMS)
            }));
            //Object.values(this.units).forEach(u => u.update(delta, this.app.ticker.elapsedMS));
            //Object.values(this.enemies).forEach(u => u.update(delta, this.app.ticker.elapsedMS));
            //const currentPos = this.cameraPosition();
            //tilling.tilePosition.x += (this.camera.x - currentPos) / 2;
            //this.camera.x = currentPos;
        })
    }
}

export default new World();