const gameArea = document.getElementById('gameArea');
const originalTarget = document.getElementById('target');
const scoreBoard = document.getElementById('scoreBoard');
const setupInput = document.querySelector('#setupArea input');
const setupButton = document.querySelector('#setupArea button');

let score = 0;
let targets = [];

// Hide the original target initially
originalTarget.style.display = 'none';

setupButton.addEventListener('click', setupGame);

function setupGame() {
    // Clear previous game
    targets.forEach(target => {
        gameArea.removeChild(target.element);
    });
    targets = [];
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
    
    const numberOfTargets = parseInt(setupInput.value);
    
    // Validate input
    if (isNaN(numberOfTargets) || numberOfTargets < 1 || numberOfTargets > 5) {
        alert('Please enter a number between 1 and 5');
        return;
    }
    
    // Create targets
    for (let i = 1; i <= numberOfTargets; i++) {
        createTarget(i);
    }
}

function createTarget(number) {
    const newTarget = document.createElement('div');
    newTarget.className = 'target';
    newTarget.textContent = number;
    
    newTarget.style.position = 'absolute';
    newTarget.style.width = '50px';
    newTarget.style.height = '50px';
    newTarget.style.backgroundColor = 'red';
    newTarget.style.borderRadius = '50%';
    newTarget.style.cursor = 'pointer';
    newTarget.style.display = 'flex';
    newTarget.style.alignItems = 'center';
    newTarget.style.justifyContent = 'center';
    newTarget.style.color = 'white';
    newTarget.style.fontWeight = 'bold';
    
    gameArea.appendChild(newTarget);
    moveTarget(newTarget);
    
    const targetObj = {
        element: newTarget,
        number: number
    };
    targets.push(targetObj);
    
    newTarget.addEventListener('click', function() {
        handleTargetClick(targetObj);
    });
}

function moveTarget(targetElement) {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const maxX = gameAreaRect.width - targetElement.offsetWidth;
    const maxY = gameAreaRect.height - targetElement.offsetHeight;

    targetElement.style.left = `${Math.floor(Math.random() * maxX)}px`;
    targetElement.style.top = `${Math.floor(Math.random() * maxY)}px`;
}

function handleTargetClick(targetObj) {
    score++;
    scoreBoard.textContent = `Score: ${score}`;
    targetObj.element.remove();
    
    const index = targets.findIndex(t => t.number === targetObj.number);
    if (index !== -1) {
        targets.splice(index, 1);
    }
}