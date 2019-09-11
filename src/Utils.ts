import Settings from "@Settings";
import Chance from "chance";

const chance = new Chance(Settings.RANDOM_SEED);

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function angleStep(arcCount: number, linearSpeed: number, start: number, end = Settings.WORLD_WIDTH) {
    const distance = end - start;
    const gameSteps = distance / linearSpeed / Settings.GAME_STEP_SIZE;
    return (Math.PI * arcCount) / gameSteps;
}

export function randomInt(min: number, max: number) {
    return chance.integer({ min: min, max: max });
}

export function randomFloat(min: number, max: number) {
    return chance.floating({ min: min, max: max });
}