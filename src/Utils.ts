import Settings from "@Settings";

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function angleStep(arcCount: number, linearSpeed: number, start: number, end = Settings.WORLD_WIDTH) {
    const distance = end - start;
    const gameSteps = distance / linearSpeed / Settings.GAME_STEP_SIZE;
    return (Math.PI * arcCount) / gameSteps;
}