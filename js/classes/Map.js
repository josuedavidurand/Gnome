
/**
 * Create the game board dynamically according to the size of the window at startup
 * @param {number} width 
 * @param {number} height 
 * @class Map
 */
class Map {
    constructor(width, height) {
        this.width      = width;
        this.height     = height;
        this.img        = new Image();
        this.ratio      = 0;
        this.img.onload = () => {
            this.ratio = Math.max((this.canvas.width / this.img.width), (this.canvas.height / this.img.height));
            this.draw();
        }
        this.img.src = 'img/bg.png';
        // Add the map to his instantiation
        this.create();
        this.context = this.canvas.getContext("2d");
    }

    // Create the canvas element in html
    create() {
        this.canvas = document.createElement('canvas');
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.canvas.textContent = `Your browser doesn't support canvas`;
        document.body.appendChild(this.canvas);
    }
    
    // Area where the player can move
    constraint (player) {
        if (player.position.x < 0) {
            player.position.x = 1;
        }
        if (player.position.x > this.width - player.width) {
            player.position.x = this.width - player.width - 1;
        }
        if (player.position.y < 0) {
            player.position.y = 1;
        }
        if (player.position.y > this.height - player.height) {
            player.position.y = this.height - player.height - 1;
        }
    }

    // Draw the background in the center of the canvas
    draw() {
        this.context.drawImage(this.img, 0, 0, this.img.width, this.img.height, (this.canvas.width - this.img.width * this.ratio)/2, (this.canvas.height - this.img.height * this.ratio)/2, (this.img.width * this.ratio), (this.img.height * this.ratio));
    }
}
