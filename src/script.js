let myLibrary = {
    books: [],
    addBookToLibrary : function(title, author, pages, read) {
        this.books.push(new Book(title, author, pages, read))
    },
    removeBook : function(e) {
        let bookIndex = e.target.parentNode.parentNode.getAttribute("data-attribute"); //get data-attribute from row, which is two parents up
        myLibrary.books.splice(bookIndex, 1);
        refreshDisplay(myLibrary, bookDisplay);
    },
    toggleRead : function(e) {
        let bookIndex = e.target.parentNode.parentNode.getAttribute("data-attribute"); //get data-attribute from row, which is two parents up
        myLibrary.books[bookIndex].read = !myLibrary.books[bookIndex].read;
        refreshDisplay(myLibrary, bookDisplay);
    },
};

const bookDisplay = document.querySelector(".book-display");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ` + (this.read ? "read." : "not read yet."); //This line will only work if I can use ternary operator and concatenation after a return like this. Might need parentheses. 
};

function clearTable(table) {
    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
};

function refreshDisplay(library, table) {
    clearTable(table);
    library.books.forEach((book, index) => { //For each book, create a row, that we fill with cells containing content from each book object
        let bookRow = document.createElement("tr");
        bookRow.setAttribute("data-attribute", index);
        for (key in book) {
            if (Object.hasOwn(book, key)) {
                let dataCell = document.createElement("td");
                if (key === "read") { //special case for "Read" cell, to add toggle read status button 
                    let readButton = document.createElement("button");
                    readButton.textContent = `${book[key] ? "Read" : "Not Read"}`;
                    readButton.addEventListener("click", library.toggleRead);
                    dataCell.appendChild(readButton);
                } else dataCell.textContent = book[key];
                bookRow.appendChild(dataCell);
            }
        }

        //special case for "Remove" cell, to add removal button
        let removeCell = document.createElement("td");
        let removalButton = document.createElement("button");
        removalButton.textContent = "Remove";
        removalButton.addEventListener("click", library.removeBook);
        removeCell.appendChild(removalButton);
        bookRow.appendChild(removeCell);

        //append new row to table
        table.appendChild(bookRow);
    });
};

let newBookButton = document.querySelector(".new-book-button-container>button");
newBookButton.addEventListener("click", function() {
    document.querySelector(".add-book-form-container").style.display = "flex";
});

let closeFormButton = document.querySelector(".close-button");
closeFormButton.addEventListener("click", function() {
    document.querySelector(".add-book-form-container").style.display = "none";
});

let addBookForm = document.querySelector("form");
addBookForm.addEventListener("submit", function(e) {
    console.log(e);
});

myLibrary.addBookToLibrary("AART", "Hank Green", 392, true);
myLibrary.addBookToLibrary("Paper Towns", "John Green", 200, false);

refreshDisplay(myLibrary, bookDisplay);