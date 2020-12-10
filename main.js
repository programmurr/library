function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info =  `${title} by ${author}, ${pages} pages, ${read} pages read`;
}

const firstBook = new Book("Starship Troopers", "Robert A. Heinlein", 263, 263);
const secondBook = new Book("Hyperion", "Dan Simmons", 482, 482);

let myLibrary = [firstBook, secondBook];

// HTML for below removed, update to DOM
function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function putBookOnShelf() {
    const list = document.createElement("ul");

    for (let i = 0; i < myLibrary.length; i++) {
        const item = document.createElement("li");
        item.appendChild(document.createTextNode(myLibrary[i].info));
        list.appendChild(item);
    }
    return list;
}

function clearInputs() {
    inputs = Array.from(document.querySelectorAll("input"));
    for (let i = 0; i < inputs.length; i ++) {
        inputs[i].value = "";
    }
}

document.getElementById("shelf").appendChild(putBookOnShelf());

const newButton = document.createElement("button");
newButton.textContent = "New Book";
document.getElementById("add-form").appendChild(newButton);

const addButton = document.createElement("button");
addButton.textContent = "Add Book";



newButton.onclick = function () {
    // Get line breaks working for after each  input box
    const formContainer = document.createElement("div");
    formContainer.setAttribute("id", "form");
    document.getElementById("add-form").appendChild(formContainer);
    // display inputs
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "title";

    const titleLabel = document.createElement("label");
    titleLabel.htmlFor = "title";
    titleLabel.textContent = "Title";

    titleLabel.appendChild(titleInput);
    formContainer.appendChild(titleLabel);

    const authorInput = document.createElement("input");
    authorInput.type = "text";
    authorInput.id = "author";

    const authorLabel = document.createElement("label");
    authorLabel.htmlFor = "author";
    authorLabel.textContent = "Author";

    authorLabel.appendChild(authorInput);
    formContainer.appendChild(authorLabel);

    const pagesInput = document.createElement("input");
    pagesInput.type = "text";
    pagesInput.id = "pages";

    const pagesLabel = document.createElement("label");
    pagesLabel.htmlFor = "pages";
    pagesLabel.textContent = "Pages";

    pagesLabel.appendChild(pagesInput);
    formContainer.appendChild(pagesLabel);

    const readInput = document.createElement("input");
    pagesInput.type = "text";
    pagesInput.id = "read";

    const readLabel = document.createElement("label");
    readLabel.htmlFor = "read";
    readLabel.textContent = "Pages read";

    readLabel.appendChild(readInput);
    formContainer.appendChild(readLabel);

    // display Add Book Button
    
    formContainer.appendChild(addButton);
}


addButton.onclick = function () {
    addBookToLibrary()
    document.getElementById("shelf").textContent = "";
    document.getElementById("shelf").appendChild(putBookOnShelf());
    clearInputs();
}

// Only display books
// Button that says NEW BOOK
// Click NEW BOOK
// Inputs and Add Book appear
// Tidy up New Book on click function
// Hook up addButton functions to new DOM elements




