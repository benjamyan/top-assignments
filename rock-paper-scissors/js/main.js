const playerDOM = document.querySelector(".player h1");
const computerDOM = document.querySelector(".computer h1");
const textDOM = document.querySelector("h3");
const winnerDOM = document.querySelector(".winner");
let roundNum = 0, roundTotal = [];
const playerValue = (value) => {
    return value;
};
const computerValue = () => { // returns computer play based on random value
    const num = Math.random();
    let play = "rock";
    if (num >= .33) play = "paper";
    if (num >= .66) play = "scissors";
    return play;
};

function watchGame(current) { // fires if roundNum is below 5
    if (roundNum < 5) { // adds to integer to keep count of rounds | adds round result to array
        let round = playRound(current.innerText.toLowerCase());
        roundNum++;
        roundTotal.push(round);
    } else { // fires functions that write the total game result
        writeGameWinner();
        writeGameRounds();
    }
};
function playRound(value) { // plays one round | adds result to array
    let result = roundWinner(playerValue(value), computerValue());
    textDOM.innerText = result[0];
    if (result[1] == -1)
        playerDOM.innerText++;
    else if (result[1] == 1)
        computerDOM.innerText++;
    else null;
    return result;
};
function roundWinner(player, computer) { // gets the round winner | i dont like this. too repetitive!
    let p = player, c = computer, loss, win, total, num;
    loss = `${c} beats ${p}!`;
    win = `${p} beats ${c}!`;
    if (p == c) {
        total = ["Draw!", num=0];
    } else if (p == "rock") {
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
}
function writeGameWinner() { // writes the winner of the game to the screen
    let winner;
    if (playerDOM > computerDOM) winner = "You win!";
    else winner = "You lose!";
    winnerDOM.classList.add("active");
    winnerDOM.innerHTML +=
    `<h2>${winner}</h2>
    <ul></ul>
    <button onclick="resetGame()">
        <p>Reset game</p>
    </button>`
};
function writeGameRounds() { // writes the result of each round to winner screen
    for (i=0; i < roundTotal.length; i++) {
        let result;
        if (roundTotal[i][1] == -1) result = "Loss!";
        else if (roundTotal[i][1] == 1) result = "Win!";
        else result = "";
        document.querySelector(".winner ul").innerHTML += 
        `<li>
            <b>${result}</b>
            ${roundTotal[i][0]}
        </li>`
    };
};
function resetGame() { // clears winner window | resets all watchers
    winnerDOM.classList.remove("active");
    textDOM.innerText = textDOM.dataset.text;
    winnerDOM.innerHTML = "";
    playerDOM.innerText = 0;
    computerDOM.innerText = 0;
    roundNum = 0, roundTotal = [];
};

(function() { // initializer for the game | event listener | generates text for h3 tag based on data attribute
    textDOM.innerText += textDOM.dataset.text;
    Object.values(document.querySelectorAll("button")).forEach(function(current) {
        current.addEventListener("click", ()=> {
            watchGame(current);
        });
    });
    console.log("Initialized");
})();