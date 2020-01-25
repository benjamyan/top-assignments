let rounds = [];
let i = 0;
let text = document.querySelector("h3");
let playerNum = document.querySelector(".player h1");
let computerNum = document.querySelector(".computer h1");
const playerSelect = (value) => {
    return value;
};
const computerPlay = () => {
    const num = Math.random();
    let play = "rock";
    if (num >= .33) play = "paper";
    if (num >= .66) play = "scissors";
    return play;
};

function compare(player, computer) {
    let p = player, c = computer, loss, win, num, total;
    loss = `${c} beats ${p}!`;
    win = `${p} beats ${c}!`;
    if (p == c) total = ["Draw!", num=0];
    else if (p == "rock") {
        if (c == "paper") total = [loss, num=-1];
        if (c == "scissors") total = [win, num=1];
    } else if (p == "paper") {
        if (c == "rock") total = [win, num=1];
        if (c == "scissors") total = [loss, num=-1];
    } else {
        if (c == "rock") total = [loss, num=-1];
        if (c == "paper") total = [win, num=1];
    }
    return total;
};
function winner() {
    if (playerNum > computerNum) {
        text.innerText = "You win!"
    } else {
        text.innerText = "You lose!"
    };
    playerNum.innerText = 0;
    computerNum.innerText = 0;
};
function game(value) {
    let result = compare(playerSelect(value), computerPlay());
    i++;
    text.innerText = result[0];
    if (result[1] == -1) 
        playerNum.innerText++;
    else if (result[1] == 1) 
        computerNum.innerText++;
    else null;
    rounds.push(result)
};

Object.values(document.querySelectorAll("button")).forEach(function(current){
    current.addEventListener("click", function() {
        if (i > 5) winner();
        else game(current.innerText.toLowerCase());
    });
});