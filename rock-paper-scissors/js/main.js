let text = document.querySelector("h3");
let playerNum = document.querySelector(".player h1");
let computerNum = document.querySelector(".computer h1");
let rounds = [];
let int = 0;
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
const winner = () => {
    let winner;
    if (playerNum > computerNum) winner = "You win!";
    else winner = "You lose!";
    document.querySelector("main").innerHTML +=
    `<section class="winner">
        <h2>${winner}</h2>
        <ul></ul>
        <button onclick="reset()">
            <p>Reset game</p>
        </button>
    </section>`
    for(i=0; i < rounds.length; i++) {
        document.querySelector(".winner ul").innerHTML += 
        `<li>
            <b>${rounds[i][1] == -1 ? "Loss!" : rounds[i][1] == 1 ? "Win!" : "" }</b> 
            ${rounds[i][0]}
        </li>`
    };
};
const reset = () => {
    let panel = document.querySelector(".winner");
    playerNum.innerText = 0;
    computerNum.innerText = 0;
    text.innerText = text.dataset.text;
    panel.parentNode.removeChild(panel);
    int = 0;
};

function compare(player, computer) {
    let p = player, c = computer, loss, win, total, num;
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
    };
    return total;
};
function game(value) {
    let result = compare(playerSelect(value), computerPlay());
    int++;
    text.innerText = result[0];
    if (result[1] == -1)
        playerNum.innerText++;
    else if (result[1] == 1)
        computerNum.innerText++;
    else null;
    rounds.push(result);
};

Object.values(document.querySelectorAll("button")).forEach(function(current) {
    current.addEventListener("click", ()=> {
        if (int > 4) winner();
        else game(current.innerText.toLowerCase());
    });
});

(function() {
    text.innerText += text.dataset.text;
})();