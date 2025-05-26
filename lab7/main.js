const ball = document.getElementById("ball");
const game = document.getElementById("game");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreDisplay = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");

let counter = 0;
let score = 0;
let timeLeft = 60;
let gameRunning = true;
let blockGenerationInterval;
let gameTimer;

function initGame() {
    counter = 0;
    score = 0;
    timeLeft = 60;
    gameRunning = true;
    
    timeDisplay.textContent = `Time: ${timeLeft}s`;
    scoreDisplay.textContent = `Score: ${score}`;
    gameOverScreen.style.display = "none";
    
    const existingBlockContainers = game.querySelectorAll("div");
    existingBlockContainers.forEach(el => {
        if (el.querySelector(".block")) el.remove();
    });

    ball.style.top = "0px";
    ball.style.left = "250px";
    startTimers();
}


//timer
function startTimers() {
    gameTimer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
        endGame();
    }
}, 1000);
    
blockGenerationInterval = setInterval(createBlockWithHole, 3000);
}

function endGame() {
    gameRunning = false;
    clearInterval(gameTimer);
    clearInterval(blockGenerationInterval);
    finalScoreDisplay.textContent = `Your Score: ${score}`;
    gameOverScreen.style.display = "flex";
}

//strzalki
        
function moveRight() {
    if (!gameRunning) return;    
    const left = parseInt(window.getComputedStyle(ball).getPropertyValue("left") || "0");
    const ballWidth = ball.offsetWidth;
    const gameWidth = game.offsetWidth;
    if (left + ballWidth + 2 <= gameWidth) {
        ball.style.left = (left + 2) + "px";
    }
}

function moveLeft() {
    if (!gameRunning) return;
    const left = parseInt(window.getComputedStyle(ball).getPropertyValue("left") || "0");
    if (left - 2 >= 0) {
        ball.style.left = (left - 2) + "px";
    }
}

function moveDown() {
    if (!gameRunning) return;
    const top = parseInt(window.getComputedStyle(ball).getPropertyValue("top") || "0");
    const ballHeight = ball.offsetHeight;
    const gameHeight = game.offsetHeight;
    if (top + ballHeight + 2 <= gameHeight) {
        ball.style.top = (top + 2) + "px";
    }
}

function moveUp() {
    if (!gameRunning) return;
    const top = parseInt(window.getComputedStyle(ball).getPropertyValue("top") || "0");
    if (top - 2 >= 0) {
        ball.style.top = (top - 2) + "px";
    }
}

// ta sztuka dzieki ktorej na telefonie mozna grac
document.addEventListener("keydown", (event) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
}
            
    if (event.key === "ArrowLeft") moveLeft();
    else if (event.key === "ArrowRight") moveRight();
    else if (event.key === "ArrowUp") moveUp();
    else if (event.key === "ArrowDown") moveDown();

    checkForHoleCollision();
});

    if (window.DeviceOrientationEvent) {
        window.addEventListener(
        "deviceorientation",
        (event) => {
            if (!gameRunning) return;    
            const leftToRight = event.gamma;
            const frontToBack = event.beta;

            if (leftToRight > 5) moveLeft();
            else if (leftToRight < -5) moveRight();
            if (frontToBack > 5) moveUp();
            else if (frontToBack < -5) moveDown();
                    
            checkForHoleCollision();
        },
        true
);
}

function checkForHoleCollision() {
    if (!gameRunning) return;
    
    const ballRect = ball.getBoundingClientRect();
    const ballCenterX = ballRect.left + ballRect.width / 2;
    const ballCenterY = ballRect.top + ballRect.height / 2;
    const blocks = document.querySelectorAll('.block');
    for (let i = 0; i < blocks.length; i++) {
        const blockContainer = blocks[i].parentNode;
        const blockRect = blocks[i].getBoundingClientRect();
        if (Math.abs(ballCenterY - blockRect.top) < 10) {
            const hole = blockContainer.querySelector('.hole');
            const holeRect = hole.getBoundingClientRect();
            if (ballCenterX >= holeRect.left && ballCenterX <= holeRect.right) {
                if (!hole.dataset.counted) {
                    score++;
                    scoreDisplay.textContent = `Score: ${score}`;
                    hole.dataset.counted = "true";
}
}
    // } else {
                    //     ball.style.top = "0px";
                    //     ball.style.left = "0px";
                    //     return;
                    // }
                }
            }
        }


function createBlockWithHole() {
    const blockContainer = document.createElement("div");
    blockContainer.style.position = "absolute";

    blockContainer.style.width = "100%";
    blockContainer.style.top = "500px"; 
    blockContainer.style.height = "10px";
            
    const block = document.createElement("div");
    block.classList.add("block");
    block.id = "block" + counter;
            
    const hole = document.createElement("div");
    hole.classList.add("hole");
    hole.id = "hole" + counter;
            
           
    const holeWidth = 40;
    const gameWidth = game.offsetWidth;
    const randomLeft = Math.floor(Math.random() * (gameWidth - holeWidth));
    hole.style.left = randomLeft + "px";
    
    blockContainer.appendChild(block);
    blockContainer.appendChild(hole);
    game.appendChild(blockContainer);
    
    let position = 500;
    const moveBlocks = setInterval(() => {
        if (!gameRunning || position < -20) { 
            clearInterval(moveBlocks);
        if (blockContainer.parentNode) {
            blockContainer.remove();
        }
    } else {
        position -= 1;
        blockContainer.style.top = position + "px";
    }
}, 20);

counter++;
}



restartButton.addEventListener("click", initGame);
        
initGame();