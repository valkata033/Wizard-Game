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
    lastTimeFiredFireball: 0,
};

let game = {
    speed: 2,
    movingMultiplier: 4,
    fireBallMultiplier: 5,
    fireInterval: 1000,
    clouldSpawnInterval: 3000,
    bugSpawnInterval: 1000,
};

let scene = {
    score: 0,
    lastClouldSpawn: 0,
    lastBugSpawn: 0,
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

function GameAction(timestamp) {
    const wizard = document.querySelector('.wizard');
    const points = document.querySelector('.points');

    scene.score++;

    let isInAir = (player.y + player.height) <= gameAreaElement.offsetHeight;

    if (isInAir) {
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

    if (keys.Space && timestamp - player.lastTimeFiredFireball > game.fireInterval) {
        wizard.classList.add('wizard-fire');
        addFireBall(player);
        player.lastTimeFiredFireball = timestamp;
    }
    else {
        wizard.classList.remove('wizard-fire');
    }

    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    // add fireballs
    const fireBalls = document.querySelectorAll('.fire-ball');
    fireBalls.forEach(ball => {
        ball.x += game.speed * game.fireBallMultiplier;
        ball.style.left = ball.x + 'px';

        if (ball.x + ball.offsetWidth > gameAreaElement.offsetWidth) {
            ball.parentElement.removeChild(ball);
        }
    });

    // add clouds
    if (timestamp - scene.lastClouldSpawn > game.clouldSpawnInterval + 20000 * Math.random()) {
        let cloud = document.createElement('div');
        cloud.classList.add('cloud');
        cloud.x = gameAreaElement.offsetWidth - 200;
        cloud.style.left = cloud.x + 'px';
        cloud.style.top = (gameAreaElement.offsetHeight - 200) * Math.random() + 'px';
        gameAreaElement.appendChild(cloud);
        scene.lastClouldSpawn = timestamp;
    }
    // add clouds movement
    let clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud => {
        cloud.x -= game.speed;
        cloud.style.left = cloud.x + 'px';

        if (cloud.x + cloud.offsetWidth <= 0) {
            cloud.parentElement.removeChild(cloud);
        }
    });

    // add bugs
    if(timestamp - scene.lastBugSpawn > game.bugSpawnInterval + 5000 * Math.random()){
        let bug = document.createElement('div');
        bug.classList.add('bug');
        bug.x = gameAreaElement.offsetWidth - 60;
        bug.style.left = bug.x + 'px';
        bug.style.top = (gameAreaElement.offsetHeight - 60) * Math.random() + 'px';
        gameAreaElement.appendChild(bug);
        scene.lastBugSpawn = timestamp;
    }

    // add bugs movement
    let bugs = document.querySelectorAll('.bug');
    bugs.forEach(bug => {
        bug.x -= game.speed * 4;
        bug.style.left = bug.x + 'px';

        if(bug.x + bug.offsetWidth <= 0){
            bug.parentElement.removeChild(bug);
        }
    });

    points.textContent = scene.score;

    window.requestAnimationFrame(GameAction);
}

function addFireBall(player) {
    let fireBall = document.createElement('div');
    fireBall.classList.add('fire-ball');

    fireBall.style.top = (player.y + player.height / 3 - 5) + 'px';
    fireBall.x = player.x + player.width;
    fireBall.style.left = fireBall.x + 'px';

    gameAreaElement.appendChild(fireBall);
}

