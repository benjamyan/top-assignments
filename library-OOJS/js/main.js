const DOM = {
    inputArea: ".input-area",
    inputForm: ".input-area-form",
    renderArea: ".render-area",
    renderItem: ".render-area-item"
}
const userInputFields = Array.from(document.querySelectorAll(`${DOM.inputForm} > input:not([type='submit'])`));
// Array to hold all the books added
const userBookLibrary = [
    { title:"The Exquisite Book" , author:"Some Guy" , pages:100 , isRead:false },
    { title:"Another Book" , author:"Walter Fleminge" , pages:2780 , isRead:true }
];


// prototype function to read back information about a book
/*AddNewBook.prototype.sayBookInfo = function() {
    let wasBookRead;
    this.isRead === true ? 
        wasBookRead = "was read" : wasBookRead = "was not read";
    return `${this.title} by ${this.author}, is ${this.pages} pages long, and ${wasBookRead}.`
}*/
// prototype to render userBookLibrary to the DOM
AddNewBook.prototype.renderBooks = function() {
    let wasBookRead;
    this.isRead === true ? 
        wasBookRead = "was read" : wasBookRead = "not read";
    document.querySelector(DOM.renderArea).innerHTML = `
        <div class="render-area-item">
            <h2>${this.title}</h2>
            <h4>${this.author}</h4>
            <p><sub>${this.pages}</sub></p>
            <p>${wasBookRead}</p>
        </div>
    `
}
// the object constructor for the books that are added from user input
function AddNewBook(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}


getInputValue = (el)=> {
    let inputValue = el.value;
    if (el.type !== "text") {
        if (el.type === "checkbox")
            el.checked ? 
                inputValue = true : inputValue = false;
        if (el.type === "number")
            inputValue = Number(el.value);
    };
    return inputValue
}
getUserBook = ()=> {
    const userInfo = [];
    userInputFields.forEach(function(current){
        userInfo.push(getInputValue(current));
        current.value = '', current.checked = false;
    });
    return new AddNewBook(...userInfo)
}
// adds book to UBL using user input from form
function inputController() {
    let newBook = getUserBook();
    newBook.renderBooks();
    userBookLibrary.push(newBook);
}


(function(){
    console.log("Initialized");
    userBookLibrary.forEach(function(current){
        current.renderBook();
    });
})();