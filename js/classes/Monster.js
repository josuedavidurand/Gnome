
/**
 * Creates a monster character
 * @param {object} context the context of the map
 * @param {array} sprites [string, string, ...] with a link to a sprite
 * @param {object} position {x: number, y: number}
 * @class Monster
 * @extends {Character}
 */
class Monster extends Character {
    constructor (context, sprites, position) {
        super(context, sprites, position);
        this.sound = 'audio/arg.mp3';
    }
    die () {

    }
}
