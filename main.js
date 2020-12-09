let myLibrary = [];


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info =  `${title} by ${author}, ${pages} pages, ${read}`;
}

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

const addButton = document.querySelector("button.add-book");
addButton.onclick = function () {
    addBookToLibrary()
    document.getElementById("shelf").innerHTML = "";
    document.getElementById("shelf").appendChild(putBookOnShelf());
}





// make add book button
//  make onclick event for add book button
// addBookToLibrary runs on click
// display library above button