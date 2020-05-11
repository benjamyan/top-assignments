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


// prototype to render userBookLibrary to the DOM
AddNewBook.prototype.renderNewBook = function(newBookIndex) {
    // better to keep inlined onclick statements rather than bog down the user with a lot of eventListeners
    document.querySelector(DOM.renderArea).innerHTML += ` 
        <div class="render-area-item" data-item="${newBookIndex}"> 
            <a id="removeBook" onclick="inputController(event);">remove</a>
            <h2>${this.title}</h2>
            <h4>${this.author}</h4>
            <sub>${this.pages} pages long</sub>
            <p>Book was read.</p>
        </div>`; // ^^ renders the object into the DOM
    if (this.isRead !== true)
        this.renderNewBookOptions(newBookIndex);
}
// prototype to render further options to DOM element created by renderNewBook
AddNewBook.prototype.renderNewBookOptions = function(newBookIndex) {
    const renderNewBookDOM = document.querySelector(DOM.renderArea + ` div[data-item='${newBookIndex}'`),
          newBookDOMtext = renderNewBookDOM.querySelector('p'),
          newBookDOMbtn = document.createElement("button");
    newBookDOMtext.innerHTML = "This book was not read"; // change the text
    newBookDOMbtn.setAttribute("id","finishBook"); // set the id of newBookDOMbtn
    newBookDOMbtn.setAttribute("onclick","inputController(event);"); // set the onclick event of newBookDOMbtn
    newBookDOMbtn.innerHTML = "Finished it!"; // set the inner text of newBookDOMbtn
    renderNewBookDOM.appendChild(newBookDOMbtn) // append newBookDOMbtn to the div
}
// prototype to add book to local cache
AddNewBook.prototype.cacheBooks = function(indexValue, designation) {
    if (designation === "add") {
        window.localStorage.setItem( // add object to localStorage
            `userBookLibrary[${indexValue}]`, // set the key value as a refernce to the objects position in userBookLibrary
            JSON.stringify(this) // set new AddNewBook object as a string
        )
    };
    if (designation === "remove") {
        window.localStorage.removeItem( // remove item from local storage
            `userBookLibrary[${indexValue}]` // reference the item through index # passed
        )
    };
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
          targetValue = targetWrapper.dataset.item,
          targetReference = userBookLibrary[targetValue]; // get the data-item number for reference
    toggleUserAreas = ()=> {
        Func.toggleEl( // toggle welcome area
            document.querySelector(DOM.welcomeArea)
        );
        Func.toggleEl( // toggle input area
            document.querySelector(DOM.inputArea)
        );
    }
    addNewBook = ()=> {
        const newBook = getUserBook(); // called getUsedBook using inherited `this` and returns AddNewBook object
        userBookLibrary.push(newBook); // adds returned object from above to the userBookLibrary array
        const newBookIndex = Func.getIndex(userBookLibrary, newBook); 
        newBook.cacheBooks( // add returned object from above to localStorage
            newBookIndex, // pass the index for identification later
            "add" // the kind of cache function we want to call
        );
        newBook.renderNewBook( // render returned object from above to the DOM
            newBookIndex // pass through the index for identification later
        );
    }
    finishBook = ()=> {
        const targetWrapperText = targetWrapper.querySelector('p'),
              targetWrapperButton = targetWrapper.querySelector("button");
        targetReference.cacheBooks(targetValue,"remove"); // remove target from localStorage
        targetWrapperText.innerHTML = "Book was read"; // change the text of the DOM element
        targetWrapper.removeChild(targetWrapperButton) // remove the button from the DOM element
        targetReference.isRead = true; // change the value of isRead to true
        targetReference.cacheBooks(targetValue, "add"); // add new target to localStorage
    }
    removeBook = ()=> {
        targetWrapper.parentElement.removeChild(targetWrapper); // remove the item from the DOM
        targetReference.cacheBooks(targetValue, "remove") // remove the item from localStorage
        userBookLibrary.splice(targetValue) // remove the item from userBookLibrary array
    }
    if (targetID === "showInputArea" || 
        targetID === "closeInputArea") toggleUserAreas();
    if (targetID === "addNewBook") addNewBook();
    if (targetID === "finishBook") finishBook();
    if (targetID === "removeBook") removeBook();
}


// renders the items in local storage and adds them to array for reference later
renderLocalStorage = ()=> {
    for (let i = 0; i < localStorage.length; i++) { // loops through all items in localStorage based on length of localStorage
        const currentBook = new AddNewBook( // passes parsed JSON into AddNewBook consturctor
            ...Object.values(JSON.parse( // parses current item for JSON
                window.localStorage.getItem( // gets current item from localStorage
                    `userBookLibrary[${i}]` // searches for item based on object name which includes index
                )
            ))
        );
        currentBook.renderNewBook(i); // render the current AddNewBook object
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
// self-explanatory IIFE
(function(){ 
    console.log("Initialized");
    renderLocalStorage();
    setupEventListeners();
})();