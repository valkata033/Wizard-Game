const gameStartElement = document.querySelector('.game-start');
const gameAreaElement = document.querySelector('.game-area');
const gameScoreElement = document.querySelector('.game-score');
const gameOverElement = document.querySelector('.game-over');

const moveKeys = ['KeyA', 'KeyD', 'KeyW', 'KeyS', 'Space'];

gameStartElement.addEventListener('click', (e) => {
    e.currentTarget.classList.add('hide');

    const wizardElement = document.createElement('div');
    wizardElement.classList.add('wizard');
    wizardElement.style.top = '200px';
    wizardElement.style.left = '200px';
    gameAreaElement.appendChild(wizardElement);

    window.requestAnimationFrame(GameAction);
});

function GameAction() {
    console.log('Hello')
    window.requestAnimationFrame(GameAction);
}

addEventListener('keydown', (e) => {
    if(moveKeys.includes(e.code)){
        console.log(e.code);
    }
});

addEventListener('keyup', (e) => {
    if(moveKeys.includes(e.code)){
        console.log(e.code);
    }
});





