// Array to hold all the books added
const userBookLibrary = [];
const DOM = {
    inputArea: ".input-area",
    inputForm: ".input-area-form",
    renderArea: ".render-area",
    renderItem: ".render-area-item"
}
const Func = {
    getIndex: (target, el) => {
        return target.indexOf(el);
    }
}
const userInputFields = Array.from(document.querySelectorAll(`${DOM.inputForm} > input:not([type='submit'])`));


// prototype to add book to local cache
AddNewBook.prototype.cacheBooks = function(item, type) {
    if (type === "add") {
        window.localStorage.setItem(
            `userBookLibrary[${item}]`, 
            JSON.stringify(this)
        );
    }
    if (type === "remove") {
        window.localStorage.removeItem(
            `userBookLibrary[${item}]`
        );
    }
}
// prototype to render userBookLibrary to the DOM
AddNewBook.prototype.renderBooks = function(newBookIndex) {
    this.isRead === true ? 
        this.isRead = "Book was read" : this.isRead = "Book was not read";
    document.querySelector(DOM.renderArea).innerHTML += `
        <div class="render-area-item book-${newBookIndex}">
            <div name="remove-book" onclick="inputController(this);">remove</div>
            <h2>${this.title}</h2>
            <h4>${this.author}</h4>
            <sub>${this.pages} pages long</sub>
            <p>${this.isRead}</p>
            <button name="finished-book" onclick="inputController(this); return false;">Finished it!</button>
        </div>`;
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
    return inputValue
}
getUserBook = ()=> {
    const userInfo = []; // define an array to be used as property later
    userInputFields.forEach(function(current){ // cycle through inherited `this` from caller
        userInfo.push(getInputValue(current)); // add current value to userInfo array after its returned
        current.value = '', current.checked = false; // clear the fields so they can be used again
    });
    return new AddNewBook(...userInfo)
}
// adds book to UBL using user input from form
function inputController() {
    const target = event.target.name;
    if (target === "add-book") {
        let newBook = getUserBook();
        userBookLibrary.push(newBook);
        newBook.cacheBooks(Func.getIndex(userBookLibrary, newBook), "add");
        newBook.renderBooks(Func.getIndex(userBookLibrary, newBook));
    };
    if (target === "remove-book") {
        console.log(this)
    };
    if (target === "finished-book") {
        console.log(this)
    };
}


// renders the items in local storage and adds them to array for reference later
baseRender = ()=> {
    for (let i = 0; i < localStorage.length; i++) {
        let currentBook = new AddNewBook(
            ...Object.values(JSON.parse(
                window.localStorage.getItem(
                    `userBookLibrary[${i}]`
                )
            ))
        );
        currentBook.renderBooks();
        userBookLibrary.push(currentBook);
    }
}
(function(){
    console.log("Initialized");
    baseRender();
})();