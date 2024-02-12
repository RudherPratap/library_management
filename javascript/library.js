let library = [];

function addBook() {
  const bookId = document.getElementById("book_id").value;
  const bookTitle = document.getElementById("book_title").value;
  const bookAuthor = document.getElementById("book_author").value;

  if (!bookId || !bookTitle || !bookAuthor) {
    alert("Input fields are empty.");
    return;
  }

  const newBook = {
    id: bookId,
    title: bookTitle,
    author: bookAuthor,
    isBorrowed: false
  };

  library.push(newBook);
  displayBooks();
  clearFields();
}

function displayBooks() {
  const bookList = document.getElementById("book_list");
  bookList.innerHTML = "";//this line will set the inner html of the element with the id to an empty string.

  library.forEach(book => {
    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML = `${book.title} by ${book.author}   [ID - ${book.id}]`;

    const borrowButton = document.createElement("button");
    borrowButton.className = "button_term"
    if (book.isBorrowed) {
      borrowButton.textContent = "Return";
    } else {
      borrowButton.textContent = "Borrow";
    }

    borrowButton.addEventListener("click", () => toggleBorrowStatus(book));
    li.appendChild(borrowButton);
    bookList.appendChild(li);
  });

}

function toggleBorrowStatus(book) {
  book.isBorrowed = !book.isBorrowed;
  displayBooks();
}

function searchBook() {
  const searchItem = document.getElementById("searchbook").value.toLowerCase();
  const searchResult = library.filter(book => book.title.toLowerCase().includes(searchItem));

  if (searchResult.length === 0) {
    alert("No matching result found.");
    return;
  }
  displayResult(searchResult);
}

function displayResult(result) {
  clearSearchList();

  const bookList = document.getElementById("book_result");
  bookList.innerHTML = "";

  result.forEach(book => {
    const li = document.createElement("li");
    li.innerHTML = `${book.title} by ${book.author} [ID - ${book.id}]`;
    bookList.appendChild(li);
  });

}

function clearFields() {
  document.getElementById("book_id").value = "";
  document.getElementById("book_title").value = "";
  document.getElementById("book_author").value = "";
}
function clearSearchList() {
  const bookList = document.getElementById("book_result");
  bookList.innerHTML = "";
}

document.getElementById("add_book").addEventListener("click", addBook);
document.getElementById("search_book").addEventListener("click", searchBook);

displayBooks();