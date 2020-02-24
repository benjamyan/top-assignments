const DOM = { 
    clear:"button", 
    grid:".grid" 
};
const clearButton = document.querySelector(DOM.clear);
const gridWrapper = document.querySelector(DOM.grid);
let userInputValue;


buildGrid = (val)=> { // make grid divs recursively
    for (let i = 0; i < (val*val); i++) { // user value  * user value - 1 = length
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


function eventListeners() { // setup event listeners
    let gridItemHover, clearGrid;
    gridItemHover = (event)=> {
        event.srcElement.classList.add("active"); // add active class
    };
    clearGrid = ()=> {
        getGrid(); // get user value
        if (userInputValue !== 0) {
            destroyGrid(); // clear current grid
            buildGrid(userInputValue); // build grid off value
        };
    };
    Array.from(gridWrapper.children).forEach(function(current) {
        current.addEventListener("mouseover", gridItemHover); // grid div
    }); // run through every child of grid
    clearButton.addEventListener("click", clearGrid); // clear button
}
(()=>{ // initialize
    buildGrid(16); // load base grid on init
    console.log("App initalized");
})();