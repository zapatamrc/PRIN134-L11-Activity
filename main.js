const gameArea = document.getElementById('gameArea');
const originalTarget = document.getElementById('target');
const scoreBoard = document.getElementById('scoreBoard');
const setupInput = document.querySelector('#setupArea input');
const setupButton = document.querySelector('#setupArea button');

let score = 0;
let targets = [];
let nextExpectedNumber = 1;
let numberOfTargets = 0; // Store the initial number of targets

// Hide the original target
originalTarget.style.display = 'none';

setupButton.addEventListener('click', setupGame);

function setupGame() {
    // Clear previous game
    targets.forEach(target => {
        gameArea.removeChild(target.element);
    });
    targets = [];
    score = 0;
    nextExpectedNumber = 1;
    scoreBoard.textContent = `Score: ${score}`;
    
    numberOfTargets = parseInt(setupInput.value);
    
    // Validate input
    if (isNaN(numberOfTargets) || numberOfTargets < 1 || numberOfTargets > 5) {
        alert('Please enter a number between 1 and 5');
        return;
    }
    
    createTargets();
}

function createTargets() {
    for (let i = 1; i <= numberOfTargets; i++) {
        createTarget(i);
    }
}

function createTarget(number) {
    const newTarget = document.createElement('div');
    newTarget.className = 'target';
    newTarget.textContent = number;
    
    // Styling
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
    
    newTarget.addEventListener('click', () => handleTargetClick(targetObj));
}

function moveTarget(targetElement) {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const maxX = gameAreaRect.width - targetElement.offsetWidth;
    const maxY = gameAreaRect.height - targetElement.offsetHeight;

    targetElement.style.left = `${Math.floor(Math.random() * maxX)}px`;
    targetElement.style.top = `${Math.floor(Math.random() * maxY)}px`;
}

function handleTargetClick(targetObj) {
    if (targetObj.number === nextExpectedNumber) {
        // Correct click
        score++;
        nextExpectedNumber++;
        scoreBoard.textContent = `Score: ${score}`;
        targetObj.element.style.backgroundColor = 'green'; // Visual feedback
        setTimeout(() => {
            targetObj.element.remove(); // Remove after a brief delay
        }, 300);

        // Remove from targets array
        const index = targets.findIndex(t => t.number === targetObj.number);
        if (index !== -1) {
            targets.splice(index, 1);
        }

        // Check if all targets are clicked
        if (targets.length === 0) {
            setTimeout(resetGame, 500); // Reset after a short delay
        }
    } else {
        alert(`Wrong! Click ${nextExpectedNumber} next.`);
    }
}

function resetGame() {
    nextExpectedNumber = 1;
    createTargets(); // Create new dots (same count)
}