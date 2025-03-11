let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

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
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "#fd1c03";
        setTimeout(() => document.querySelector("body").style.backgroundColor = "#092e1a80", 250);

        const playerName = new URLSearchParams(window.location.search).get('name') || "Guest";
        save_score(playerName, level);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
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

// Open leaderboard in a new tab when button is clicked
document.getElementById("show-leaderboard").addEventListener("click", function () {
    window.open("leaderboard.html", "_blank");
});
