export interface PlayerData {
    /**
     * The name of the player
     */
    name: string;
    /**
     * The pronouns of the player
     */
    pronouns: string;
    /**
     * The url to the game's vdo-ninja source
     */
    gameSource: string;
    /**
     * The url to the camera's vdo-ninja source
     */
    camSource: string;
    /**
     * A scale factor for the game camera
     */
    gameScale: number;
    /**
     * A scale factor for the game camera
     */
    camScale: number;
}
