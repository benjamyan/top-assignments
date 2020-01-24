const playerSelect = (select) => {
    return select;
};
const computerPlay = () => {
    const num = Math.random();
    let play = "rock";
    if (num >= .33) play = "paper";
    if (num >= .66) play = "scissors";
    return play;
};

function compare(player, computer) {
    let p = player, c = computer, num;
    if (p == c) return "Draw!";
    if (p == "rock") {
        if (c == "paper") return "Paper beats rock!";
        if (c == "scissors") return "Rock beats paper!";
    } else if (p == "paper") {
        if (c == "rock") return "Rock beats paper!";
        if (c == "scissors") return "Scissors beat paper!";
    } else {
        if (c == "rock") return "Rock beats scissors!";
        if (c == "paper") return "Scissors beats rock!";
    };
};
function game(value) {
    for(var i = 0; i < 4; i++) {
        console.log(compare(playerSelect(value), computerPlay()));
    };
};

Object.values(document.querySelectorAll("button")).forEach(function(current){
    current.addEventListener("click", function() {
        game(current.innerText.toLowerCase());
    });
});