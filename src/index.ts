import world from "./World";
import { Spawner } from "@Spawner";
import Factory from "@Factory";

document.addEventListener("DOMContentLoaded", function () {
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
    document.getElementById("buttons")!.appendChild(btn);
})