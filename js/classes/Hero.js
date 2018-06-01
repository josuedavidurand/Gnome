
/**
 * Creates a hero character that the player can interact with
 * @param {object} context the context of the map
 * @param {array} sprites [string, string, ...] with a link to a sprite
 * @param {object} position {x: number, y: number}
 * @class Hero
 * @extends {Character}
 */
class Hero extends Character {
    constructor (context, sprites, position) {
        super(context, sprites, position);
        this.speed     = 4;
        this.distance  = 0;
        this.startMove = event => {
            if (event.keyCode == 37) {
                this.direction.left = true;
            }
            if (event.keyCode == 39) {
                this.direction.right = true;
            }
            if (event.keyCode == 38) {
                this.direction.up = true;
            }
            if (event.keyCode == 40) {
                this.direction.down = true;
            }
        }
        this.stopMove = event => {
            if (event.keyCode == 37) {
                this.direction.left = false;
            }
            if (event.keyCode == 39) {
                this.direction.right = false;
            }
            if (event.keyCode == 38) {
                this.direction.up = false;
            }
            if (event.keyCode == 40) {
                this.direction.down = false;
            }
        }
        this.removeStartMove = event => {
            event.stopPropagation();
        }
        this.removeStopMove = event => {
            event.stopPropagation();
        }
        this.direction = {
            up   : false,
            down : false,
            left : false,
            right: false
        };
        // Launch the possibility for the player to control the hero
        this.canMove();
    }

    canMove () {
        window.addEventListener('keydown', this.startMove, true);
        window.addEventListener('keyup', this.stopMove, true);
    }

    moveTo () {
        // Change sprites for the walking animation
        if(this.direction.up || this.direction.right || this.direction.down || this.direction.left) {
            this.distance++;
            if (this.distance >= 10) {
                this.img.src = this.sprites[1];
            }
            if (this.distance >= 20 && this.distance > 15) {
                this.img.src = this.sprites[0];
                this.distance = 0;
            }
        }

        // Change his position according to his direction
        if (this.direction.left) {
            this.position.x -= this.speed;
        }
        if (this.direction.right) {
            this.position.x += this.speed;
        }
        if (this.direction.up) {
            this.position.y -= this.speed;
        }
        if (this.direction.down) {
            this.position.y += this.speed;
        }
    }

    die () {
        // Stop the movement of the hero
        window.removeEventListener("keydown", this.startMove, true);
        window.removeEventListener("keyup", this.stopMove, true);
        window.addEventListener('keydown', this.removeStartMove, false);
        window.addEventListener('keyup', this.removeStopMove, false);
        this.direction = {
            up   : false,
            down : false,
            left : false,
            right: false
        };
    }
}
