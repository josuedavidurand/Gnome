
// externaliser la creation de mecanics ?
class Game {
    constructor () {
        this.buttonPress = event => {
            this.new();
        };
        this.spacePress = event => {
            if (event.keyCode === 32) {
                this.new();
            }
        };
        // this.gameover = event => {
            
        // };
        // Launch start at his instantiation
        this.start();
    }
    start (status = 'init') {
        // Add the start menu with scoreboard
        // console.log(this.mecanics)
        if(this.mecanics != undefined) {
            document.body.removeChild(document.getElementsByTagName('canvas')[0])
            this.mecanics = undefined;
        }
        const section = document.createElement('section');
        document.body.appendChild(section);

        const h1 = document.createElement('h1');
        if(status === 'init') {
            h1.textContent = 'Gnome';
        } else if (status === 'gameover') {
            h1.textContent = 'Game Over';
        } else {
            console.error('Wrong status')
        }   
        section.appendChild(h1);

        const button = document.createElement('button');
        button.textContent = 'NEW GAME';
        button.id = 'start';
        // If the player press the button, launch a new game
        button.addEventListener('click', this.buttonPress, false);
        section.appendChild(button);

        const p = document.createElement('p');
        p.textContent = 'Press space to start';
        section.appendChild(p);

        // If the player already play once, print his scores
        if (localStorage.getItem('bestScoreTop') != null) {
            const ul = document.createElement('ul');
            const button = document.getElementsByTagName('button')[0];
            button.parentNode.insertBefore(ul, button);
            
            const liScore = document.createElement('li');
            liScore.textContent = 'Best Scores' ;
            ul.appendChild(liScore);

            const liTop = document.createElement('li');
            liTop.textContent = localStorage.getItem('bestScoreTop');
            ul.appendChild(liTop);

            const liMid = document.createElement('li');
            liMid.textContent = localStorage.getItem('bestScoreMid');
            ul.appendChild(liMid);

            const liLow = document.createElement('li');
            liLow.textContent = localStorage.getItem('bestScoreLow');
            ul.appendChild(liLow);
        }
        // If the player press 'space', launch a new game
        window.addEventListener('keypress', this.spacePress, false)
    }

    new () {
        this.mecanics = new Mecanics();
        
    }

    watchEnd () {
        // listen when the game end
    }
    
    end () {
        this.start('gameover')
    }
}