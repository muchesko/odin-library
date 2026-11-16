const myLibrary = [];

function Book(title, author, genre, pages, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, genre, pages, read) {
    const book = new Book(title, author, genre, pages, read);
    myLibrary.push(book);
}

const library = document.querySelector("#library");

const newBookButton = document.querySelector("#new-book");
const newBookDialog = document.querySelector("#new-book-dialog");
newBookButton.addEventListener("click", function () {
    newBookDialog.showModal();
});

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const genre = document.querySelector("#genre").value;
    const pages = Number(document.querySelector("#pages").value);
    const read = document.querySelector("#read-true").checked;

    addBookToLibrary(title, author, genre, pages, read);
    form.reset();
    newBookDialog.close();
    displayBooks();
});

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function displayBooks() {

    library.textContent = "";

    for (let i = 0; i < myLibrary.length; i++) {

        const bookCard = document.createElement("div");
        library.appendChild(bookCard);

        bookCard.classList.add("book-card")

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container");
        bookCard.appendChild(infoContainer);

        const bookTitle = document.createElement("p");
        bookTitle.textContent = `Title: ${myLibrary[i].title === "" ? "Unknown Title" : myLibrary[i].title}`;
        infoContainer.appendChild(bookTitle);

        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = `Author: ${myLibrary[i].author === "" ? "Unknown Author" : myLibrary[i].author}`;
        infoContainer.appendChild(bookAuthor);

        const bookGenre = document.createElement("p");
        bookGenre.textContent = `Genre: ${myLibrary[i].genre === "" ? "Unknown Genre" : myLibrary[i].genre}`;
        infoContainer.appendChild(bookGenre);

        const bookPages = document.createElement("p");
        bookPages.textContent = `Pages: ${myLibrary[i].pages >= 0 ? "Unknown Pages" : myLibrary[i].pages}`;
        infoContainer.appendChild(bookPages);

        const bookRead = document.createElement("p");
        bookRead.textContent = `Read?: ${myLibrary[i].read === true ? "Yes" : "No"}`;
        infoContainer.appendChild(bookRead);

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container")
        bookCard.appendChild(buttonContainer);

        const toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = "Toggle Read Status";
        buttonContainer.appendChild(toggleReadButton)

        toggleReadButton.classList.add("toggle-read-button");

        toggleReadButton.addEventListener("click", function () {
            const bookToToggle = myLibrary.find(book => book.id === bookCard.dataset.id);
            if (bookToToggle) {
                bookToToggle.toggleRead();
                displayBooks();
            }
        }); 

        const removeBookButton = document.createElement("button");
        removeBookButton.textContent = "Remove Book";
        buttonContainer.appendChild(removeBookButton);

        removeBookButton.classList.add("remove-book-button");

        removeBookButton.addEventListener("click", function () {
            const index = myLibrary.findIndex(book => book.id === bookCard.dataset.id);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                displayBooks();
            }
        });

        bookCard.dataset.id = myLibrary[i].id;
    }
}