
/**
 * Creates a bomb character
 * @param {object} context the context of the map
 * @param {array} sprites [string, string, ...] with a link to a sprite
 * @param {object} position {x: number, y: number}
 * @class Bomb
 * @extends {Character}
 */
class Bomb extends Character {
    constructor (context, sprites, position) {
        super(context, sprites, position);
        this.sound = 'audio/boum.mp3';
    }
    explode () {

    }
}
