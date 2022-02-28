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

let scene = {
    score: 0,
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
    const points = document.querySelector('.points');
    scene.score++;

    let isInAir = (player.y + player.height) <= gameAreaElement.offsetHeight;

    if(isInAir){
        player.y += game.speed;
    }

    if (keys.KeyW && player.y > 0) {
        player.y -= game.speed * game.movingMultiplier;
    }
    if (keys.KeyS && isInAir) {
        player.y += game.speed * game.movingMultiplier;
    }
    if (keys.KeyA && player.x > 0) {
        player.x -= game.speed * game.movingMultiplier;
    }
    if (keys.KeyD && player.x + player.width < gameAreaElement.offsetWidth) {
        player.x += game.speed * game.movingMultiplier;
    }

    if(keys.Space){
        wizard.classList.add('wizard-fire');
        addFireBall(player);
    }
    else{
        wizard.classList.remove('wizard-fire');
    }

    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    points.textContent = scene.score;

    window.requestAnimationFrame(GameAction);
}

function addFireBall(player){
    let fireBall = document.createElement('div');
    fireBall.classList.add('fire-ball');

    fireBall.style.top = (player.y + player.height / 3 - 5) + 'px';
    fireBall.x = player.x + player.width;
    fireBall.style.left = fireBall.x + 'px';
    
    gameAreaElement.appendChild(fireBall);
}






