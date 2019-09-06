import world from "./World";
import { Spawner } from "@Spawner";
import Factory from "@Factory";

document.addEventListener("DOMContentLoaded", function (event) {    
    document.querySelector("#cv")!.appendChild(world.app.view);
    world.app.start();    
});

(window as any).World = world;
(window as any).Spawner = Spawner;
(window as any).Factory = Factory;