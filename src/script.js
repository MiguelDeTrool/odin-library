let myLibrary = {
    books: [],
    addBookToLibrary : function(title, author, pages, read) {
        this.books.push(new Book(title, author, pages, read))
    },
    displayAllBooks : function () {
        this.books.forEach((book, index) => {
            let bookRow = document.createElement("tr");
            for (key in book) {
                if (Object.hasOwn(book, key)) {
                    let dataCell = document.createElement("td");
                    if (key === "read") {
                        dataCell.innerHTML = `<button>${book[key] ? "Read" : "Not Read"}</button>`;
                    } else dataCell.textContent = book[key];
                    bookRow.appendChild(dataCell);
                }
            }
            let removalButton = document.createElement("td");
            removalButton.innerHTML = `<button data-attribute="${index}">Remove</button>`;
            bookRow.appendChild(removalButton);
            table.appendChild(bookRow);
        });
    },
    removeBook : function() {},
};

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


myLibrary.addBookToLibrary("AART", "Hank Green", 392, true);
myLibrary.addBookToLibrary("Paper Towns", "John Green", 200, false);

myLibrary.displayAllBooks(myLibrary);