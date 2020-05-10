// Array to hold all the books added
const userBookLibrary = [];
const DOM = {
    welcomeArea: ".welcome-area",
    inputArea: ".input-area",
    inputForm: ".input-area-form",
    renderArea: ".render-area",
    renderItem: ".render-area-item"
}
const Func = {
    getIndex: (target, el) => {
        return target.indexOf(el);
    },
    toggleEl: (el) => {
        el.classList.toggle("hidden");
    }
}
const userInputFields = Array.from(document.querySelectorAll(`${DOM.inputForm} > input:not([type='submit'])`));


// prototype to add book to local cache
AddNewBook.prototype.cacheBooks = function(indexValue, designation) {
    if (designation === "add") {
        window.localStorage.setItem( // add object to localStorage
            `userBookLibrary[${indexValue}]`, // set the key value as a refernce to the objects position in userBookLibrary
            JSON.stringify(this) // set new AddNewBook object as a string
        );
    }
    /*if (designation === "get") {
        const getLocalItem = window.localStorage.getItem( // gets current item from localStorage
            `userBookLibrary[${indexValue}]` // searches for item based on object name which includes index
        );
        return getLocalItem
    }*/
    if (designation === "remove") {
        window.localStorage.removeItem( // remove item from local storage
            `userBookLibrary[${indexValue}]` // reference the item through index # passed
        );
    }
}
// prototype to render userBookLibrary to the DOM
AddNewBook.prototype.renderBooks = function(newBookIndex) {
    let wasBookRead;
    this.isRead === true ? // changes the isRead value based on true or false
        wasBookRead = "This book was read" : 
        wasBookRead = "This book was not read";
    document.querySelector(DOM.renderArea).innerHTML += ` 
        <div class="render-area-item" data-item="${newBookIndex}"> 
            <a id="removeBook" onclick="inputController(event);">remove</a>
            <h2>${this.title}</h2>
            <h4>${this.author}</h4>
            <sub>${this.pages} pages long</sub>
            <p>${wasBookRead}</p>
            <button id="finishBook" onclick="inputController(event);">Finished it!</button>
        </div>`; // ^^ this fuckery renders the object into the DOM
        // better to keep inlined onclick statements rather than bog down the user with a lot of eventListeners
}
// the object constructor for the books that are added from user input
function AddNewBook(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}


// returns the actual user values to be pushed and used by functions for rendering
getInputValue = (el)=> {
    let inputValue = el.value; // if does not match statement, value stays the same
    if (el.type !== "text") { // if is not a text input
        if (el.type === "checkbox") // if has input type of checkbox
            el.checked ? // is it checked?
                inputValue = true : inputValue = false; // returns true or false
        if (el.type === "number") // if input is a number
            inputValue = Number(el.value); // turns input into a number from string
    };
    // send back the value currently being processed
    return inputValue
}
// returns a new AddNewBook object based on inherited properties
getUserBook = ()=> {
    const userInfo = []; // define an array to be used as property later
    userInputFields.forEach(function(current){ // cycle through inherited `this` from caller
        userInfo.push(getInputValue(current)); // add current value to userInfo array after its returned
        current.value = '', current.checked = false; // clear the fields so they can be used again
    });
    // send back a new AddNewBook object using the parameters added through the loop ^
    return new AddNewBook(...userInfo)
}
// the main controller for all click events in the DOM
function inputController(event) {
    const target = event.target, // get the target of the click event
          targetID = target.id, // get the id associated with click event
          targetWrapper = target.parentElement, // get parent element of click event target
          targetValue = targetWrapper.dataset.item; // get the data-item number for reference
    if (targetID === "showInputArea" || 
        targetID === "closeInputArea") {
        Func.toggleEl( // toggle welcome area
            document.querySelector(DOM.welcomeArea)
        );
        Func.toggleEl( // toggle input area
            document.querySelector(DOM.inputArea)
        );
    };
    if (targetID === "addNewBook") {
        const newBook = getUserBook(); // called getUsedBook using inherited `this` and returns AddNewBook object
        userBookLibrary.push(newBook); // adds returned object from above to the userBookLibrary array
        newBook.cacheBooks( // add returned object from above to localStorage
            Func.getIndex(userBookLibrary, newBook), // pass the index for identification later
            "add" // the kind of cache function we want to call
        );
        newBook.renderBooks( // render returned object from above to the DOM
            Func.getIndex(userBookLibrary, newBook) // pass through the index for identification later
        );
    };
    if (targetID === "finishBook") {
        // holy shit this is jenky
        // come back and redo this
        // seriously wtf
        userBookLibrary[targetValue].cacheBooks(targetValue, "remove") // remove the item from localStorage
        userBookLibrary[targetValue].isRead = true;
        // it doesnt even render without refreshing!
        userBookLibrary[targetValue].cacheBooks(targetValue, "add") // remove the item from localStorage
    };
    if (targetID === "removeBook") {
        targetWrapper.parentElement.removeChild(targetWrapper); // remove the item from the DOM
        userBookLibrary[targetValue].cacheBooks(targetValue, "remove") // remove the item from localStorage
        userBookLibrary.splice(targetValue) // remove the item from userBookLibrary array
    };
}


// renders the items in local storage and adds them to array for reference later
renderLocalStorage = ()=> {
    for (let i = 0; i < localStorage.length; i++) { // loops through all items in localStorage
        const currentBook = new AddNewBook( // passes parsed JSON into AddNewBook consturctor
            ...Object.values(JSON.parse( // parses current item for JSON
                window.localStorage.getItem( // gets current item from localStorage
                    `userBookLibrary[${i}]` // searches for item based on object name which includes index
                )
            ))
        );
        currentBook.renderBooks(i); // render the current AddNewBook object
        userBookLibrary.push(currentBook); // add the current AddNewBook object to userBookLibrary array
    }
}
// invokes the event listeners for the DOM
setupEventListeners = ()=> {
    const eventTargets = ["showInputArea","closeInputArea","addNewBook"]; // build an array of ID's to be listened
    eventTargets.forEach(function(current){ // call a forEach to loop through each ID
        document.getElementById(current).addEventListener("click", inputController); // add inputController function to these elements
    });
}
(function(){ // self-explanatory
    console.log("Initialized");
    renderLocalStorage();
    setupEventListeners();
})();