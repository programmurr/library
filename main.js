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

const cancelButton = document.createElement("button");
cancelButton.textContent = "Cancel";

let isNewButtonClicked = false;

const formContainer = document.createElement("div");
formContainer.setAttribute("id", "form");
    

function createTitleInput(formContainer) {
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "title";

    const titleLabel = document.createElement("label");
    titleLabel.htmlFor = "title";
    titleLabel.textContent = "Title";

    titleLabel.appendChild(titleInput);
    titleLabel.appendChild(document.createElement("br"));
    formContainer.appendChild(titleLabel); 
}

function createAuthorInput(formContainer) {
    const authorInput = document.createElement("input");
    authorInput.type = "text";
    authorInput.id = "author";

    const authorLabel = document.createElement("label");
    authorLabel.htmlFor = "author";
    authorLabel.textContent = "Author";

    authorLabel.appendChild(authorInput);
    authorLabel.appendChild(document.createElement("br"));
    formContainer.appendChild(authorLabel);
}

function createPagesInput(formContainer) {
    const pagesInput = document.createElement("input");
    pagesInput.type = "text";
    pagesInput.id = "pages";

    const pagesLabel = document.createElement("label");
    pagesLabel.htmlFor = "pages";
    pagesLabel.textContent = "Pages";

    pagesLabel.appendChild(pagesInput);
    pagesLabel.appendChild(document.createElement("br"));
    formContainer.appendChild(pagesLabel);
}

function createReadInput(formContainer) {
    const readInput = document.createElement("input");
    readInput.type = "text";
    readInput.id = "read";

    const readLabel = document.createElement("label");
    readLabel.htmlFor = "read";
    readLabel.textContent = "Pages read";

    readLabel.appendChild(readInput);
    readLabel.appendChild(document.createElement("br"));
    formContainer.appendChild(readLabel);
}

function createAddForm() {
    if (isNewButtonClicked === false) {
        document.getElementById("add-form").appendChild(formContainer);
        // display inputs
        createTitleInput(formContainer);
        createAuthorInput(formContainer);
        createPagesInput(formContainer)
        createReadInput(formContainer)
    
        // display Add Book Button
        formContainer.appendChild(addButton);
        formContainer.appendChild(cancelButton);
    
        isNewButtonClicked = true;
     } else {
        document.getElementById("add-form").appendChild(formContainer);
     }
}

function removeAddForm() {
    document.getElementById("add-form").removeChild(formContainer);
}

newButton.addEventListener("click", createAddForm);
cancelButton.addEventListener("click", removeAddForm, false);


// Only display books
// Button that says NEW BOOK
// Click NEW BOOK
// Inputs and Add Book appear
// Tidy up New Book on click function
// Do not allow New Book to keep adding new forms
// Hook up addButton functions to new DOM elements




