const DOM = { clear:"button", grid:".grid" };
const clearButton = document.querySelector(DOM.clear);
const gridWrapper = document.querySelector(DOM.grid);
let userInputValue;


buildGrid = (val)=> {
    // make divs recursively
    for (let i = 0; i < ((val*val)-1); i++) { // user value  * user value - 1 = length
        let newGridItem = document.createElement("div"), // create element
            getWidth = gridWrapper.clientWidth, // get width of grid wrapper
            getSize = getWidth / val + "px"; // get size of divs based on user value and grid wrapper width
        newGridItem.style.width = getSize; // set width
        newGridItem.style.height = getSize; // set height
        gridWrapper.appendChild(newGridItem); // add the div to the DOM
    }
    eventListeners(); // push event listenrs after completion
};
getGrid = ()=> {
    // get user desired grid value
    // use do statement to check for number value
    // if isnt a number run prompt again
    do {
        userInputValue = Number(window.prompt("How many cells do you want?", "Type a Number"));
    } while(isNaN(userInputValue)); // if is a number break loop
    return userInputValue; // return the number value
};
destroyGrid = ()=> {
    // clears out the inner HTML of grid wrapper div
    gridWrapper.innerHTML = "";
};


function gridItemHover(event) {
    // add active class to hovered grid div
    event.srcElement.classList.add("active");
}
function clearGrid() {
    getGrid(); // get user value
    destroyGrid(); // clear current grid
    buildGrid(userInputValue); // build new grid off user value
}
function eventListeners() {
    // setup event listeners using callback functions
    Array.from(gridWrapper.children).forEach(function(current){
        current.addEventListener("mouseover", gridItemHover);
    });
    clearButton.addEventListener("click", clearGrid);
};
(()=>{
    buildGrid(16);
    console.log("App initalized");
})();