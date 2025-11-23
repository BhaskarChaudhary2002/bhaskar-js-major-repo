let gameSeq=[];
let userSeq=[];

let btns = ["yellow", "blue", "red", "green"];

let level=0;
let started=false;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(event) {
    if(started === false) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIndex];
    let randomBtn = document.querySelector(`.${randomColor}`);
    // console.log(randomIndex);
    // console.log(randomBtn);
    // console.log(randomColor);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function checkAns(idx){
    // console.log("curr level:", level);

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
           setTimeout(levelUp, 1000);
        }
    }else {
        h2.innerHTML = `Game Over! Your score is <b>${level}</b> <br> Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white"; 
        }, 150);
        console.log("wrong");
        resetGame();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function resetGame() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}