const DOM = {
    grid: ".grid",
    gridItem: ".grid-item"
};

buildGrid = ()=> {
    const gridWrapper = document.querySelector(DOM.grid);
    for (let i = 0; i < 256; i++) {
        let newGridItem = document.createElement("div");
        newGridItem.classList.add("grid-item");
        gridWrapper.appendChild(newGridItem);
    }
}

(()=>{
    buildGrid();
    console.log("App initalized");
})();