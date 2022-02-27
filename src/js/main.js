const gameStartElement = document.querySelector('.game-start');
const gameAreaElement = document.querySelector('.game-area');
const gameScoreElement = document.querySelector('.game-score');
const gameOverElement = document.querySelector('.game-over');

let keys = {};

let player = {
    x: 150,
    y: 100,
    width: 0,
    height: 0,
};

let game = {
    speed: 2,
    movingMultiplier: 3,
};

const availableKeys = ['KeyA', 'KeyD', 'KeyW', 'KeyS', 'Space'];

gameStartElement.addEventListener('click', (e) => {
    e.currentTarget.classList.add('hide');

    const wizardElement = document.createElement('div');
    wizardElement.classList.add('wizard');
    wizardElement.style.top = player.y + 'px';
    wizardElement.style.left = player.x + 'px';
    gameAreaElement.appendChild(wizardElement);

    player.width = wizardElement.offsetWidth;
    player.height = wizardElement.offsetHeight;

    window.requestAnimationFrame(GameAction);
});

addEventListener('keydown', onKeyDown);
addEventListener('keyup', onKeyUp);

function onKeyDown(e) {
    keys[e.code] = true;
}

function onKeyUp(e) {
    keys[e.code] = false;
}

function GameAction() {
    const wizard = document.querySelector('.wizard');

    if (keys.KeyW && player.y > 0) {
        player.y -= game.speed * game.movingMultiplier;
    }
    if (keys.KeyS && player.y + player.height < gameAreaElement.offsetHeight) {
        player.y += game.speed * game.movingMultiplier;
    }
    if (keys.KeyA && player.x > 0) {
        player.x -= game.speed * game.movingMultiplier;
    }
    if (keys.KeyD && player.x + player.width < gameAreaElement.offsetWidth) {
        player.x += game.speed * game.movingMultiplier;
    }

    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    window.requestAnimationFrame(GameAction);
}






