import world from "./World";
import { Spawner } from "@Spawner";
import Factory from "@Factory";
import { installedControls } from "@Object/Player/Controller";

function onKeyDown(event: KeyboardEvent) {
    if (event.keyCode in installedControls) {
        installedControls[event.keyCode](true)
    }
}

function onKeyUp(event: KeyboardEvent) {
    if (event.keyCode in installedControls) {
        installedControls[event.keyCode](false)
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    document.querySelector("#cv")!.appendChild(world.app.view);
    world.app.start();
});

(window as any).World = world;
(window as any).Spawner = Spawner;
(window as any).Factory = Factory;

const all = Object.getOwnPropertyNames(Spawner)
    .filter(prop => typeof (Spawner as any)[prop] === "function");
all.forEach(fn => {
    const btn = document.createElement("button");
    btn.onclick = () => (Spawner as any)[fn].bind(Spawner)();
    btn.innerHTML = fn;
    document.getElementById("buttons")!.appendChild(document.createElement("br"));
    document.getElementById("buttons")!.appendChild(btn);
})