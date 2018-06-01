
/**
 * Add the game mecanics
 * @class Mecanics
 */
class Mecanics {
    constructor () {
        this.clientW     = document.body.clientWidth;
        this.clientH     = document.body.clientHeight;
        // Non-player character : Bombs and the Monster at the end of the array
        this.npcs        = [];
        this.level       = 1;
        this.score       = 0;
        this.vit = 0
        this.timer       = 20000;
        this.now         = Date.now();
        this.lose        = false;
        this.init();  
    }

    drawAll() {
        this.map.draw();
        for (let i = 0, lenght = this.npcs.length; i < lenght; i++) {
                this.npcs[i].draw();
        }
        this.hero.draw();
    }

    positionRandom() {
        return {
            x: Math.floor(Math.random() * (this.clientW - 32)),
            y: Math.floor(Math.random() * (this.clientH - 32))
        };
    }

    // Test if the new random position if diferent form the previous
    getNewPosition() {
        this.newPosition = this.positionRandom();
        // Cree une fonction qui test avec marge les nouvelle position des bombs
        // Transformer et juste tester si une element avec une position similaire est deja sur la map        
        return this.newPosition;
    }

    initBomb (number) {
        for (let i = 0; i < number; i++) {
            let bomb = new Bomb(this.map.context, ['img/bomb.png'], this.getNewPosition());
            this.npcs.push(bomb);
        }
    }

    initMonster () {
        this.monster = new Monster(this.map.context, ['img/monster.png'], this.getNewPosition());
        this.npcs.push(this.monster);
    }

    init () {
        this.lose = false;
        document.body.removeChild(document.getElementsByTagName('section')[0])
        window.removeEventListener("click", this.buttonPress, false);
        window.removeEventListener("keypress", this.spacePress, false);
        // init the map
        this.map = new Map(this.clientW, this.clientH);
        // init 10 bombs
        this.initBomb(10);
        // init the first monster
        this.initMonster();
        // init the hero
        this.hero = new Hero(this.map.context, ['img/hero.png', 'img/hero2.png'], this.getNewPosition());
        // and launch the update
        this.update();
    }

    collision() {
        // Test if the hero touch another character
        for (let i = 0, lenght = this.npcs.length; i < lenght; i++) {
            if (
                this.hero.position.x <= this.npcs[i].position.x + this.npcs[i].width &&
                this.hero.position.x + this.hero.width >= this.npcs[i].position.x &&
                this.hero.position.y <= this.npcs[i].position.y + this.npcs[i].height &&
                this.hero.position.y + this.hero.height >= this.npcs[i].position.y
            ) {
                // then test what is type of character 
                if (this.npcs[i] instanceof Monster) {
                    this.nextLvl();
                } else {
                    this.gameover();
                }
            }
        }
    }

    nextLvl () {
        console.info('nextLvl')
        this.level ++;
        this.timer += 5000;
        this.score += 30;
        // Remove the monster
        this.npcs.splice(-1,1);
        // this.monster.die();
        // Add a new bomb
        this.initBomb(1);
        // and a new monster
        this.initMonster();
    }

    setScore() {
        // Add 1 point every step
        if(this.hero.direction.up || this.hero.direction.right || this.hero.direction.down || this.hero.direction.left) {
            this.score++;
        }
    }

    setBestScores() {
        let bestScores = this.getBestScores();

        if (this.score > bestScores.bestScoreTop) {
            console.log('new top score');
            localStorage.setItem('bestScoreLow', bestScores.bestScoreMid);
            localStorage.setItem('bestScoreMid', bestScores.bestScoreTop);
            localStorage.setItem('bestScoreTop', this.score);
        } else if (this.score > bestScores.bestScoreMid && this.score < bestScores.bestScoreTop) {
            console.log('new mid score');
            localStorage.setItem('bestScoreLow', bestScores.bestScoreMid);
            localStorage.setItem('bestScoreMid', this.score);
        } else if (this.score > bestScores.bestScoreLow && this.score < bestScores.bestScoreMid) {
            console.log('new low score');
            localStorage.setItem('bestScoreLow', this.score);
        }
    }

    getBestScores() {
        // init scores in loacalStorage if null
        if (localStorage.getItem('bestScoreTop') == null) {
            localStorage.setItem('bestScoreTop', 0);
            localStorage.setItem('bestScoreMid', 0);
            localStorage.setItem('bestScoreLow', 0);
        }

        let bestScores = {};
        bestScores.bestScoreTop = localStorage.getItem('bestScoreTop');
        bestScores.bestScoreMid = localStorage.getItem('bestScoreMid');
        bestScores.bestScoreLow = localStorage.getItem('bestScoreLow');

        return bestScores;
    }

    gameover () {
        console.info('Lose !');
        this.hero.die();
        cancelAnimationFrame(requestAnimationFrame(this.update.bind(this)));
        this.setBestScores();
        this.lose = true;
    }

    gameOver () {

    }

    render() {
        // Draw all element of the game
        this.map.context.clearRect(0, 0, this.clientW, this.clientH);        
        this.hero.moveTo();
        this.setScore();
        this.collision();
        this.map.constraint(this.hero);
        this.drawAll();
        this.vit++;
        console.log(this.vit)
    }

    update() {
        // Update the render
        this.render();
        requestAnimationFrame(this.update.bind(this));
    }
}
