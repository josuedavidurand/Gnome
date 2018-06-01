
/**
 * Creates an abstract class for characters
 * @param {object} context the context of the map
 * @param {array} sprites [string, string, ...] with a link to a sprite
 * @param {object} position {x: number, y: number}
 * @class Character
 */
class Character {
    constructor(context, sprites, position) {
        this.context    = context;
        this.width      = 32;
        this.height     = 32;
        this.sprites    = sprites;
        this.position   = position;
        this.img        = new Image();
        this.img.onload = () => {
            this.draw();
        };
        this.img.src = this.sprites[0];
    }

    draw() {
        this.context.drawImage(this.img, this.position.x, this.position.y);
    }
}
