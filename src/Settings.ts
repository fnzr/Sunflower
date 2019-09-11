class Settings {
    static readonly WORLD_WIDTH = 380;
    static readonly WORLD_HEIGHT = 480;

    static readonly ENEMY_LIMIT_X = Settings.WORLD_WIDTH + 100;
    static readonly ENEMY_LIMIT_Y = Settings.WORLD_HEIGHT + 100;

    static readonly MOVE_SPEED = 3;
    static readonly WALK_SPEED = 1;

    static DEBUG_HITBOX = true;

    static readonly GAME_STEP_SIZE = 0.1;

    static readonly RANDOM_SEED = "SUNFLOWER"
}
export default Settings