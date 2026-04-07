const myLibrary = [];

function Book(id, title, author, pages) {
  // the constructor...
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToTable(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  addBookToLibrary(title, author, pages);
  document.getElementById("add-book-form").reset();
}

function displayBooks() {
  const container = document.getElementById("book-container");
  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Book ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Pages</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;
  const tbody = container.querySelector("tbody");

  myLibrary.forEach((bookObj) => {
    const row = document.createElement("tr");

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      const idx = myLibrary.findIndex((b) => b.id === bookObj.id);
      if (idx !== -1) myLibrary.splice(idx, 1);
      displayBooks();
    });

    [bookObj.id, bookObj.title, bookObj.author, bookObj.pages].forEach((cellText) => {
      const td = document.createElement("td");
      td.textContent = cellText;
      row.appendChild(td);
    });

    const actionTd = document.createElement("td");
    actionTd.appendChild(deleteButton);
    row.appendChild(actionTd);

    tbody.appendChild(row);
  });
}

function addBookToLibrary(title, author, pages) {
  const book = new Book(crypto.randomUUID(), title, author, pages);
  myLibrary.push(book);
  displayBooks();
}

document.getElementById("add-book-form").addEventListener("submit", addBookToTable);
displayBooks();
