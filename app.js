let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let timer;
let timeLeft;
let h2 = document.querySelector("h2");

// Get player name and selected time from URL
const urlParams = new URLSearchParams(window.location.search);
const playerName = urlParams.get('name') || "Guest";
const timeLimit = parseInt(urlParams.get('time')) || 60; // Default: 60s

// Display time on screen
let timerDisplay = document.getElementById("timer");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
        startTimer(timeLimit); // Start timer when game starts
    }
});

// Start countdown timer
function startTimer(seconds) {
    timeLeft = seconds;
    updateTimerDisplay();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            gameOver("Time's Up!");
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerDisplay.innerText = `Time Left: ${timeLeft}s`;
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOver("Game Over!");
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

// Handle game over
function gameOver(message) {
    clearInterval(timer); // Stop timer
    h2.innerHTML = `${message} Your score was <b>${level}</b> <br>Press any key to restart.`;
    document.querySelector("body").style.backgroundColor = "#fd1c03";
    setTimeout(() => document.querySelector("body").style.backgroundColor = "#092e1a80", 250);

    save_score(playerName, level);
    reset();
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    timeLeft = 0;
}

function save_score(playerName, score) {
    console.log("Saving score...");

    fetch("http://localhost/anuj/save_score.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player_name: playerName, score: score })
    })
    .then(response => response.json())
    .then(data => console.log("Score saved:", data))
    .catch(error => console.error("Error saving score:", error));
}

// Add event listeners to buttons
document.querySelectorAll(".btn").forEach(btn => btn.addEventListener("click", btnPress));

// Open leaderboard in a new tab
document.getElementById("show-leaderboard").addEventListener("click", function () {
    window.open("leaderboard.html", "_blank");
});
