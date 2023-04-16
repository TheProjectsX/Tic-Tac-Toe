// Const Variables
const noticeBoard = document.getElementById("noticeBoard");
const noticeHeader = document.getElementById("noticeHeader");
const goBack = document.getElementById("goBack");
const restartGame = document.getElementById("restartGame");


const userVsComputer = document.getElementById("userVsComputer");
const userVsPlayer = document.getElementById("userVsPlayer");

const player01Type = document.getElementById("player01Type");
const player02Type = document.getElementById("player02Type");

const player01Score = document.getElementById("player01Score");
const player02Score = document.getElementById("player02Score");
const drawScore = document.getElementById("drawScore");

const resetScore = document.getElementById("resetScore");
const resetGame = document.getElementById("resetGame");



const optionBox1 = document.getElementById("optionBox1");
const optionBox2 = document.getElementById("optionBox2");
const optionBox3 = document.getElementById("optionBox3");
const optionBox4 = document.getElementById("optionBox4");
const optionBox5 = document.getElementById("optionBox5");
const optionBox6 = document.getElementById("optionBox6");
const optionBox7 = document.getElementById("optionBox7");
const optionBox8 = document.getElementById("optionBox8");
const optionBox9 = document.getElementById("optionBox9");

const turnOf = document.getElementById("turnOf");

// Script Helper Variales

const winningPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

let player01Positions, player02Positions, currentTurnOf, currentPlayer01Score, currentPlayer02Score, currentDrawScore, gameOver;

// Setup Game
function setupGame() {
    player01Positions = [];
    player02Positions = [];

    vsComputer = userVsComputer.checked;

    // 1 = Player 01 / User
    // 2 = Player 02 / Computer
    currentTurnOf = [1, 2][Math.floor(Math.random() * 2)];
    setTurn(currentTurnOf);

    currentPlayer01Score = Number.parseInt(localStorage.getItem("player01Score"));
    currentPlayer02Score = Number.parseInt(localStorage.getItem("player02Score"));
    currentDrawScore =  Number.parseInt(localStorage.getItem("drawScore"));

    if (isNaN(currentPlayer01Score) || isNaN(currentPlayer02Score) || isNaN(currentDrawScore)) {
        currentPlayer01Score = 0;
        currentPlayer02Score = 0;
        currentDrawScore = 0;

        localStorage.setItem("player01Score", 0);
        localStorage.setItem("player02Score", 0);
        localStorage.setItem("drawScore", 0);
    }

    player01Score.innerText = currentPlayer01Score.toString().length < 2 ? "0" + currentPlayer01Score : currentPlayer01Score;

    player02Score.innerText = currentPlayer02Score.toString().length < 2 ? "0" + currentPlayer02Score : currentPlayer02Score;

    drawScore.innerText = currentDrawScore.toString().length < 2 ? "0" + currentDrawScore : currentDrawScore;

    // Hide Notice Board
    noticeBoard.style.display = "none";

    // Remove the Selection
    optionBox1.innerText = "";
    optionBox2.innerText = "";
    optionBox3.innerText = "";
    optionBox4.innerText = "";
    optionBox5.innerText = "";
    optionBox6.innerText = "";
    optionBox7.innerText = "";
    optionBox8.innerText = "";
    optionBox9.innerText = "";

    gameOver = false;

    if (currentTurnOf == 2 && vsComputer) {
        let turn = computerTurn();
        setTimeout(() => {
            optionClicked(turn, document.getElementById(`optionBox${turn}`))
        }, 1000);
    }
}

// Set Turn of
function setTurn(turn) {
    if (turn == null) {
        if (currentTurnOf == 1) {
            currentTurnOf = 2;
        } else if (currentTurnOf == 2) {
            currentTurnOf = 1;
        }
    }

    if (currentTurnOf == 1) {
        turnOf.innerText = vsComputer ? "Your Turn: X" : "Player 01's Turn: X"
    } else if (currentTurnOf == 2) {
        turnOf.innerText = vsComputer ? "Computer's Turn: O" : "Player 02's Turn: O"
    }
}

// Get turn of Computer
function computerTurn() {
    let turn = null;

    // Try to Win First!
    for (let i = 0; i < winningPositions.length; i++) {
        let position = winningPositions[i];

        if (player02Positions.includes(position[0]) && player02Positions.includes(position[1]) && (!player01Positions.includes(position[2]))) {
            turn = position[2];
            break
        } else if (player02Positions.includes(position[1]) && player02Positions.includes(position[2]) && (!player01Positions.includes(position[0]))) {
            turn = position[0];
            break
        } else if (player02Positions.includes(position[0]) && player02Positions.includes(position[2]) && (!player01Positions.includes(position[1]))) {
            turn = position[1];
            break
        }
    }

    if (!(turn == null)) {
        return turn;
    }

    // Try to Stop User from winning
    for (let i = 0; i < winningPositions.length; i++) {
        let position = winningPositions[i];

        if (player01Positions.includes(position[0]) && player01Positions.includes(position[1]) && (!player02Positions.includes(position[2]))) {
            turn = position[2];
            break
        } else if (player01Positions.includes(position[1]) && player01Positions.includes(position[2]) && (!player02Positions.includes(position[0]))) {
            turn = position[0];
            break
        } else if (player01Positions.includes(position[0]) && player01Positions.includes(position[2]) && (!player02Positions.includes(position[1]))) {
            turn = position[1];
            break
        }
    }

    if (!(turn == null)) {
        return turn;
    }

    // Random Turn
    for (let i = 0; i < winningPositions.length; i++) {
        let position = winningPositions[i];

        if (player02Positions.includes(position[0]) && (!(player01Positions.includes(position[1]) || (player02Positions.includes(position[1]))))) {
            turn = position[1];
            break
        } else if (player02Positions.includes(position[1]) && (!(player01Positions.includes(position[2]) || (player02Positions.includes(position[2]))))) {
            turn = position[2];
            break
        } else if (player02Positions.includes(position[2]) && (!(player01Positions.includes(position[0]) || (player02Positions.includes(position[0]))))) {
            turn = position[0];
            break
        }
    }

    if (!(turn == null)) {
        return turn;
    }

    // At last, If all fails, give a random position
    let choices = [5, 9, 1, 3, 7]
    for (let i = 0; i < choices.length; i++) {
        let choice = choices[i]
        if (!(player01Positions.includes(choice)) && !(player02Positions.includes(choice))) {
            turn = choice;
            break;
        }
    }

    return turn;

}

// Check Who is The winner
function checkWinner() {
    let winner = null;

    for (let i = 0; i < winningPositions.length; i++) {
        let position = winningPositions[i];

        if (player01Positions.includes(position[0]) && player01Positions.includes(position[1]) && player01Positions.includes(position[2])) {
            winner = 1;
            break;
        } else if (player02Positions.includes(position[0]) && player02Positions.includes(position[1]) && player02Positions.includes(position[2])) {
            winner = 2;
            break;
        }
    }

    if (winner == 1) {
        gameOver = true;
        turnOf.innerText = vsComputer ? "You Won!" : "Player 01 Won!"
        currentPlayer01Score += 1;
        showWinner("01");
    } else if (winner == 2) {
        gameOver = true;
        turnOf.innerText = vsComputer ? "Computer Won!" : "Player 02 Won!"
        currentPlayer02Score += 1;
        showWinner("02");
    } else if ((player01Positions.length + player02Positions.length) == 9) {
        gameOver = true;
        turnOf.innerText = "Match Draw!"
        currentDrawScore += 1;
        showWinner("draw");
    }

    player01Score.innerText = currentPlayer01Score.toString().length < 2 ? "0" + currentPlayer01Score : currentPlayer01Score;

    player02Score.innerText = currentPlayer02Score.toString().length < 2 ? "0" + currentPlayer02Score : currentPlayer02Score;

    drawScore.innerText = currentDrawScore.toString().length < 2 ? "0" + currentDrawScore : currentDrawScore;

    localStorage.setItem("player01Score", currentPlayer01Score);
    localStorage.setItem("player02Score", currentPlayer02Score);
    localStorage.setItem("drawScore", currentDrawScore);

}

// Show winner
function showWinner(winner){
    let text;
    if (winner == "01"){
        text = vsComputer ? "You Won!" : "Player 01 Won";
    } else if (winner == "02"){
        text = vsComputer ? "Computer Won!" : "Player 02 Won";
    } else if (winner == "draw"){
        text = "Match Draw!"
    }

    noticeHeader.innerText = text;
    setTimeout(() => {
        noticeBoard.style.display = "block";
    }, 100);
}


// Check user Click and Respond as is
function optionClicked(btnNo, btn) {
    if (player01Positions.includes(btnNo) || player02Positions.includes(btnNo) || gameOver) {
        return;
    }

    if (currentTurnOf == 1) {
        btn.innerText = "X";
        player01Positions.push(btnNo);
        currentTurnOf = 2;
    } else {
        btn.innerText = "O";
        player02Positions.push(btnNo);
        currentTurnOf = 1;
    }

    setTurn(currentTurnOf);
    checkWinner();
    if (vsComputer && currentTurnOf == 2) {
        let turn = computerTurn();
        setTimeout(() => {
            optionClicked(turn, document.getElementById(`optionBox${turn}`))
        }, 1000);
    }
}

// Game Playing Event Listeners
// Play Aginst Change Listener
userVsComputer.addEventListener("change", () => {
    if (!(userVsComputer.checked)) {
        return;
    }

    player01Type.innerText = "User";
    player02Type.innerText = "Computer";

    if (currentTurnOf == 1){
        turnOf.innerText = "Your Turn: X"
    } else if (currentTurnOf == 2){
        turnOf.innerText = "Computer's Turn: O"
        
        let turn = computerTurn();
        setTimeout(() => {
            optionClicked(turn, document.getElementById(`optionBox${turn}`))
        }, 1000);
    }

    vsComputer = true;
});

userVsPlayer.addEventListener("change", () => {
    if (!(userVsPlayer.checked)) {
        return;
    }

    player01Type.innerText = "Player 01";
    player02Type.innerText = "Player 02";
    vsComputer = false;

    
    if (currentTurnOf == 1){
        turnOf.innerText = "Player 01's Turn: X"
    } else if (currentTurnOf == 2){
        turnOf.innerText = "Player 02's Turn: O"
    }

});

// Score / Game Reset Listener
resetScore.addEventListener("click", () => {
    currentPlayer01Score = 0;
    currentPlayer02Score = 0;
    currentDrawScore = 0;

    localStorage.setItem("player01Score", 0);
    localStorage.setItem("player02Score", 0);
    localStorage.setItem("drawScore", 0);

    player01Score.innerText = "00";
    player02Score.innerText = "00";
    drawScore.innerText = "00";
})

resetGame.addEventListener("click", setupGame);

// Notice Board Buttons Event Listener
goBack.addEventListener("click", () => {
    noticeBoard.style.display = "none";
})

restartGame.addEventListener("click", setupGame);

// Play Options Event Listeners
optionBox1.addEventListener("click", (e) => {
    if (currentTurnOf == 2 && vsComputer) {
        return
    }

    optionClicked(1, e.target);
});

optionBox2.addEventListener("click", (e) => {
    if (currentTurnOf == 2 && vsComputer) {
        return
    }

    optionClicked(2, e.target);
});

optionBox3.addEventListener("click", (e) => {
    if (currentTurnOf == 2 && vsComputer) {
        return
    }

    optionClicked(3, e.target);
});

optionBox4.addEventListener("click", (e) => {
    if (currentTurnOf == 2 && vsComputer) {
        return
    }

    optionClicked(4, e.target);
});

optionBox5.addEventListener("click", (e) => {
    if (currentTurnOf == 2 && vsComputer) {
        return
    }

    optionClicked(5, e.target);
});

optionBox6.addEventListener("click", (e) => {
    if (currentTurnOf == 2 && vsComputer) {
        return
    }

    optionClicked(6, e.target);
});

optionBox7.addEventListener("click", (e) => {
    if (currentTurnOf == 2 && vsComputer) {
        return
    }

    optionClicked(7, e.target);
});

optionBox8.addEventListener("click", (e) => {
    if (currentTurnOf == 2 && vsComputer) {
        return
    }

    optionClicked(8, e.target);
});

optionBox9.addEventListener("click", (e) => {
    if (currentTurnOf == 2 && vsComputer) {
        return
    }

    optionClicked(9, e.target);
});


setupGame()