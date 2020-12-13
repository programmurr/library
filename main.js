function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info =  `${title} by ${author}, ${pages} pages`;
}

let myLibrary =  JSON.parse(localStorage.getItem("myLibrary") || "[]");

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read");

    if (read.checked === true) {
        read = "finished";
    } else {
        read = "not finished";
    }

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function putBookOnShelf() {
    const list = document.createElement("ul");

    for (let i = 0; i < myLibrary.length; i++) {
        const item = document.createElement("li");

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        const readStatus = document.createElement("input");
        readStatus.type = "button";
        readStatus.value = "Finished/Not Finished";
        
        item.setAttribute("id", `book-${i}`)
        item.appendChild(document.createTextNode(myLibrary[i].info));
        item.appendChild(document.createTextNode(`, ${myLibrary[i].read}`));
        item.appendChild(document.createElement("br"));
        item.appendChild(readStatus);
        item.appendChild(removeButton);
        list.appendChild(item);

        updateLocalStorage();

        removeButton.addEventListener("click", function() {
            if (myLibrary.length === 0) {
                return
            } else {
                myLibrary.splice(i, 1);
                removeBookFromShelf(i);
                updateLocalStorage();
            }
        });

        readStatus.addEventListener("click", function() {
            if (myLibrary[i].read === "finished") {
                myLibrary[i].read = "not finished";
            } else {
                myLibrary[i].read = "finished";
            }
            updateBookShelf(i);
            updateLocalStorage();
        })
    }
    return list;
}

function updateBookShelf(i) {
    item = document.getElementById(`book-${i}`);
    item.childNodes[1] = `, ${myLibrary[i].read}`;
    document.getElementById("shelf").innerHTML = "";
    document.getElementById("shelf").appendChild(putBookOnShelf());
}

function removeBookFromShelf(i) {
    document.getElementById(`book-${i}`).remove();
}

function clearInputs() {
    let inputs = Array.from(document.querySelectorAll("input"));

    for (let i = 0; i < inputs.length; i ++) {
        if (inputs[i].type === "text") {
            inputs[i].value = "";
        }
    }

    const checkbox = document.getElementById("read");
    checkbox.checked = false;
}


const newButton = document.createElement("button");
newButton.id = "new-book";
newButton.textContent = "New Book";
document.getElementById("add-form").appendChild(newButton);

let isNewButtonClicked = false;

const addButton = document.createElement("button");
addButton.textContent = "Add Book";

const cancelButton = document.createElement("button");
cancelButton.textContent = "Cancel";

const formContainer = document.createElement("div");
formContainer.setAttribute("id", "form");


function createTitleInput(formContainer) {
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "title";
    titleInput.placeholder = "Title";
    titleInput.appendChild(document.createElement("br"))
    formContainer.appendChild(titleInput); 
}

function createAuthorInput(formContainer) {
    const authorInput = document.createElement("input");
    authorInput.type = "text";
    authorInput.id = "author";
    authorInput.placeholder = "Author";
    authorInput.appendChild(document.createElement("br"));
    formContainer.appendChild(authorInput);
}

function createPagesInput(formContainer) {
    const pagesInput = document.createElement("input");
    pagesInput.type = "text";
    pagesInput.id = "pages";
    pagesInput.placeholder = "No. pages";
    pagesInput.appendChild(document.createElement("br"));
    formContainer.appendChild(pagesInput);
}

function createReadInput(formContainer) {
    const readInput = document.createElement("input");
    readInput.type = "checkbox";
    readInput.id = "read";

    const readLabel = document.createElement("label");
    readLabel.htmlFor = "read";
    readLabel.textContent = "Finished reading?";

    readLabel.appendChild(readInput);
    readLabel.appendChild(document.createElement("br"));
    formContainer.appendChild(readLabel);
}

function createAddForm() {
    if (isNewButtonClicked === false) {
        document.getElementById("add-form").appendChild(formContainer);

        createTitleInput(formContainer);
        createAuthorInput(formContainer);
        createPagesInput(formContainer)
        createReadInput(formContainer);
        
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

function inputsCheck() {
    let inputs = Array.from(document.querySelectorAll("input"));
    for (let i = 0; i < inputs.length; i ++) {
        if (inputs[i].type === "text" && inputs[i].value === "") {
            return false;
        }
    }
}

function addBookFunctions() {
    if (inputsCheck() == false) {
        alert("Please fill out all the values!");
        return;
    };
    addBookToLibrary()
    document.getElementById("shelf").innerHTML = "";
    document.getElementById("shelf").appendChild(putBookOnShelf());
    clearInputs();
    updateLocalStorage();
}

function updateLocalStorage() {
    window["localStorage"].setItem('myLibrary', JSON.stringify(myLibrary));
};

document.getElementById("shelf").appendChild(putBookOnShelf());

newButton.addEventListener("click", createAddForm);
cancelButton.addEventListener("click", removeAddForm);
addButton.addEventListener("click", addBookFunctions);

updateLocalStorage();