/*
*
* Declare and get DOM elements
*/
const DOM = { // elements to be used later
    clear:"button", 
    grid:".grid"
};
const clearButton = document.querySelector(DOM.clear); // clear button
const gridWrapper = document.querySelector(DOM.grid); // grid wrapper
let userInputValue; // declare as a global variable
/*
*
* Primary functions for app
*/
buildGrid = (val)=> { // make grid divs recursively
    for (let i = 0; i < (val*val); i++) { // user value * user value = length
        let newGridItem = document.createElement("div"), // create element
            getWidth = gridWrapper.clientWidth, // get width of grid wrapper
            getSize = getWidth / val + "px"; // get size of divs (width / value)
        newGridItem.style.width = getSize; // set width
        newGridItem.style.height = getSize; // set height
        gridWrapper.appendChild(newGridItem); // add the div to the DOM
    }
    eventListeners(); // push event listenrs after completion
}
getGrid  = ()=> {
    do { // do statement to check for number
        userInputValue = Number(window.prompt("How many cells long?", "Type a number")); // get user desired grid value
    } while(isNaN(userInputValue)); // if is a number break loop
    return userInputValue; // return the number value
}
destroyGrid = ()=> {
    gridWrapper.innerHTML = ""; // clears out HTML of grid div
}
/*
*
* event listeners and initializer
*/
function eventListeners() { // setup event listeners
    let gridItemHover, clearGrid;
    gridItemHover = (event)=> {
        event.srcElement.classList.add("active"); // add active class
    };
    clearGrid = ()=> {
        getGrid(); // get user value
        if (userInputValue !== 0) { // if user did not cancel
            destroyGrid(); // clear current grid
            buildGrid(userInputValue); // build grid off value
        };
    };
    clearButton.addEventListener("click", clearGrid); // clear button
    Array.from(gridWrapper.children).forEach(function(current) {
        current.addEventListener("mouseover", gridItemHover); // grid div
    }); // run through every child of grid
}
(()=>{ // initialize
    buildGrid(16); // load base grid on init
    console.log("App initalized"); // console confirmation
})();