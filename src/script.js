let myLibrary = [];
const table = document.querySelector(".book-display");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ` + (this.read ? "read." : "not read yet."); //This line will only work if I can use ternary operator and concatenation after a return like this. Might need parentheses. 
};

//let book1 = new Book("Adventure", "Bob", 10, true);


function addBookToLibrary(library, title, author, pages, read) {
    library.push(new Book(title, author, pages, read));
};

//addBookToLibrary("Adventure", "Bob", 10, true)

function displayAllBooks(library) {
    library.forEach((book) => {
        let bookRow = document.createElement("tr");
        for (key in book) {
            if (Object.hasOwn(book, key)) {
                let dataCell = document.createElement("td");
                dataCell.textContent = book[key];
                bookRow.appendChild(dataCell);
            }
        }
        table.appendChild(bookRow);
    });
};

addBookToLibrary(myLibrary, "AART", "Hank Green", 392, true);
addBookToLibrary(myLibrary, "Paper Towns", "John Green", 200, false);

displayAllBooks(myLibrary);