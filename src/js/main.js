const gameStartElement = document.querySelector('.game-start');
const gameAreaElement = document.querySelector('.game-area');
const gameScoreElement = document.querySelector('.game-score');
const gameOverElement = document.querySelector('.game-over');

let keys = {};

let player = {
    x: 150,
    y: 100,
};

let game = {
    speed: 2,
    movingMultiplier: 4,
};

const availableKeys = ['KeyA', 'KeyD', 'KeyW', 'KeyS', 'Space'];

gameStartElement.addEventListener('click', (e) => {
    e.currentTarget.classList.add('hide');

    const wizardElement = document.createElement('div');
    wizardElement.classList.add('wizard');
    wizardElement.style.top = player.y + 'px';
    wizardElement.style.left = player.x + 'px';
    gameAreaElement.appendChild(wizardElement);

    window.requestAnimationFrame(GameAction);
});

function GameAction() {
    const wizard = document.querySelector('.wizard');

    if (keys.KeyW) {
        player.y -= game.speed;
    }
    if (keys.KeyS) {
        player.y += game.speed;
    }
    if (keys.KeyA) {
        player.x -= game.speed;
    }
    if (keys.KeyD) {
        player.x += game.speed;
    }

    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    window.requestAnimationFrame(GameAction);
}

addEventListener('keydown', onKeyDown);
addEventListener('keyup', onKeyUp);

function onKeyDown(e) {
    keys[e.code] = true;
    console.log(keys);
}

function onKeyUp(e) {
    keys[e.code] = false;
    console.log(keys);
}




