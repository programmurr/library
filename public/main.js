var db = firebase.firestore();

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info =  `${title} by ${author}, ${pages} pages`;
}

var bookConverter = {
    toFirestore: function(book) {
        return {
            id: book.id,
            title: book.title,
            author: book.author,
            pages: book.pages,
            read: book.read,
            info: book.info
        };
    },
    fromFirestore: function(snapshot, options) {
        const data = snapshot.data(options);
        return new Book(data.id, data.title, data.author, data.pages, data.read, data.info);
    }
};

const getBooks = async () => {
    var books = [];
    await db.collection('books')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                books.push(doc.data());
            })
        })
    return books;
}

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

    let newBook = new Book(uuidv4(), title, author, pages, read);

    db.collection('books')
        .withConverter(bookConverter)
        .add(newBook);
}

// finish/fix
async function deleteBook(book, books, i) {
    if (books.length === 0) {
        console.log("No books");
        return
    } else {
        const booksQuery = await db.collection('books').where("id", "==", book.id);
        booksQuery.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                    removeBookFromShelf(i);
                })
            })
    }
}

// finish
function updateStatus() {
    const bookRef = db.collection('books').doc(books[i].id);
    if (bookRef.read === "finished") {
        bookRef.update({
            read: "not finished"
        })
        .then(() => {
            console.log("The book updated to NOT FINISHED");
        })
        .catch((error) => {
            console.error("Error updating the book to NOT FINISHED: ", error);
        });
    } else {
        bookRef.update({
            read: "finished"
        })
        .then(() => {
            console.log("The book updated to FINISHED");
        })
        .catch((error) => {
            console.error("Error updating the book to FINISHED: ", error);
        });
    }
    updateBookShelf(i, books);
}

function putBookOnShelf() {
    const booksDB = getBooks()
        .then((books) => {
            const list = document.createElement("ul");

            for (let i = 0; i < books.length; i++) {
                const item = document.createElement("li");
        
                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
        
                const readStatus = document.createElement("input");
                readStatus.type = "button";
                readStatus.value = "Finished/Not Finished";
                
                item.setAttribute("id", `book-${i}`)
                item.appendChild(document.createTextNode(books[i].info));
                item.appendChild(document.createTextNode(`, ${books[i].read}`));
                item.appendChild(document.createElement("br"));
                item.appendChild(readStatus);
                item.appendChild(removeButton);
                list.appendChild(item);
        
                removeButton.addEventListener("click", function(){deleteBook(books[i], books, i)});
        
                readStatus.addEventListener("click", function(){updateStatus(books, i)})
            }
            return list;
        })
    return booksDB;
}

function updateBookShelf(i, books) {
    item = document.getElementById(`book-${i}`);
    item.childNodes[1] = `, ${books[i].read}`;
    document.getElementById("shelf").innerHTML = "";
    document.getElementById("shelf").appendChild(newButton);
    document.getElementById("shelf").appendChild(putBookOnShelf());
}

function removeBookFromShelf(i) {
    document.getElementById(`book-${i}`).remove();
}

function clearInputs() {
    let inputs = Array.from(document.querySelectorAll("input"));

    for (let i = 0; i < inputs.length; i ++) {
        if (inputs[i].type === "text" || inputs[i].type ==="number") {
            inputs[i].value = "";
        }
    }

    const checkbox = document.getElementById("read");
    checkbox.checked = false;
}


const newButton = document.createElement("button");
newButton.id = "new-book";
newButton.textContent = "New Book";
document.getElementById("shelf").appendChild(newButton);

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
    pagesInput.type = "number";
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
    document.getElementById("shelf").appendChild(newButton);
    putBookOnShelf()
        .then((list) => {
            document.getElementById("shelf").appendChild(list);
        })
    clearInputs();
}

putBookOnShelf()
    .then((list) => {
        document.getElementById("shelf").appendChild(list);
    })


newButton.addEventListener("click", createAddForm);
cancelButton.addEventListener("click", removeAddForm);
addButton.addEventListener("click", addBookFunctions);
