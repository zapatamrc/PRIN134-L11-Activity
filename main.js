const gameArea = document.getElementById('gameArea');
const scoreBoard = document.getElementById('scoreBoard');
const setupInput = document.querySelector('#setupArea input');
const setupButton = document.querySelector('#setupArea button');

let completedSets = 0;
let targets = [];
let nextExpectedNumber = 1;
let numberOfTargets = 0;

setupButton.addEventListener('click', setupGame);

function setupGame() {
    targets.forEach(target => target.element.remove());
    targets = [];
    completedSets = 0;
    nextExpectedNumber = 1;
    scoreBoard.textContent = `Score: ${completedSets}`;
    
    numberOfTargets = parseInt(setupInput.value);
    
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
    
    Object.assign(newTarget.style, {
        position: 'absolute',
        width: '50px',
        height: '50px',
        backgroundColor: 'red',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold'
    });
    
    gameArea.appendChild(newTarget);
    positionWithoutOverlap(newTarget);
    
    const targetObj = { element: newTarget, number: number };
    targets.push(targetObj);
    
    newTarget.addEventListener('click', () => handleTargetClick(targetObj));
}

function positionWithoutOverlap(targetElement) {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const maxX = gameAreaRect.width - targetElement.offsetWidth;
    const maxY = gameAreaRect.height - targetElement.offsetHeight;
    
    let overlap;
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
        overlap = false;
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        
        targetElement.style.left = `${x}px`;
        targetElement.style.top = `${y}px`;
        
        // Check collision with existing targets
        const thisRect = targetElement.getBoundingClientRect();
        for (const existingTarget of targets) {
            const existingRect = existingTarget.element.getBoundingClientRect();
            if (
                thisRect.right > existingRect.left &&
                thisRect.left < existingRect.right &&
                thisRect.bottom > existingRect.top &&
                thisRect.top < existingRect.bottom
            ) {
                overlap = true;
                break;
            }
        }
        
        attempts++;
        if (attempts >= maxAttempts) break; // Prevent infinite loop
    } while (overlap);
}

function handleTargetClick(targetObj) {
    if (targetObj.number === nextExpectedNumber) {
        // Correct click - remove immediately
        targetObj.element.remove();
        targets = targets.filter(t => t.number !== targetObj.number);
        nextExpectedNumber++;
        
        if (targets.length === 0) {
            completedSets++;
            scoreBoard.textContent = `Score: ${completedSets}`;
            resetGame();
        }
    } else {
        // Wrong order
        alert(`Wrong! Click ${nextExpectedNumber} first.`);
    }
}

function resetGame() {
    nextExpectedNumber = 1;
    createTargets();
}