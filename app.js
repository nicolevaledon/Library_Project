console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

const books = [
  {
    id: 1,
    title: "Name of the Wind",
    author: "Patrick Rothfuss",
    read: true,
  },
];
class Book {
  constructor(id, title, author, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.read = read;
  }
}
class Library {
  constructor(books) {
    this.bookCount = books.length;
    this.books = books;
    this.nextId =
      this.books.length > 0
        ? Math.max(...this.books.map((book) => book.id)) + 1
        : 1;
  }

  addBook() {
    //console.log(this.addBook);
    //Take s the inputs from the form
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const read = document.getElementById("read");

    this.nextId++;

    const newBook = new Book(
      this.nextId,
      title.value,
      author.value,
      read.checked
    );
    //Push the new book into the library array
    this.books.push(newBook);
    //Increment book count property

    //console.log(this.books, this.bookCount);
    // Adding to the table
    // Displaying the new inputs
    //selecting the table
    const tbody = document.getElementById("tableBody");
    //Create new table row
    const newTr = document.createElement("tr");
    newTr.classList.add("book-" + newBook.id);
    newTr.addEventListener("dblclick", () => {
      this.removeBook(newBook.id);
    });
    //Create new table cells
    const newTitle = document.createElement("td");
    const newAuthor = document.createElement("td");
    const newRead = document.createElement("td");

    newTitle.textContent = title.value;
    newAuthor.textContent = author.value;
    const newCheckbox = document.createElement("input");

    newCheckbox.classList.add(newBook.id);
    newCheckbox.type = "checkbox";
    newCheckbox.checked = read.checked;
    newCheckbox.disabled = read.checked;
    newCheckbox.addEventListener("click", (event) => {
      this.markRead(event.target, newBook.id);
    });
    newRead.appendChild(newCheckbox);

    newTr.append(newTitle);
    newTr.append(newAuthor);
    newTr.append(newRead);
    tbody.appendChild(newTr);
  }

  markRead(checkbox, id) {
    this.books.forEach((book) => {
      if (id === book.id) {
        book.read = true;
        //checkbox.checked = true;
        checkbox.disabled = true;
      }
    });
  }
  removeBook(bookId) {
    this.books = this.books.filter(({ id }) => bookId !== id);
    const tbody = document.getElementById("tableBody");
    const rowToRemove = document.getElementsByClassName("book-" + bookId)[0];
    //tbody.removeChild(document.getElementsByClassName(bookId)[0]);
    tbody.removeChild(rowToRemove);
  }
}

const library = new Library(books);

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  library.addBook();
});
