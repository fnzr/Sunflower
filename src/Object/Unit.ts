import { WorldObject } from "./Base";
import World from "@World";

export abstract class Unit extends WorldObject {

    addToScreen() {
        World.unitContainer.addChild(this.sprite);
        this.destroyed = false;
    }

    removeFromScreen() {
        World.unitContainer.removeChild(this.sprite);
        this.destroyed = true;
    }
}