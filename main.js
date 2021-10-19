let myLibrary = [];

let libraryElement = document.querySelector('#books');
let overlayElement = document.querySelector('#overlay');
let formElement = document.querySelector('#form');
let formTitle = document.querySelector('#input-title');
let formAuthor = document.querySelector('#input-author');
let formPages = document.querySelector('#input-pages');
let formRead = document.querySelector('#input-read');
let titleWarningElement = document.querySelector('#title-warning');
let addNewBookBtns = document.querySelectorAll('.btn-add-group');
let submitBtn = document.querySelector('#btn-submit');
let checkBoxElement = document.querySelector('#input-read');

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function addBookToDOM(id) {
  let newBookElement = createBookElement(myLibrary[id]);
  libraryElement.appendChild(newBookElement);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  addBookToDOM(Number(book.id));
}

function createBookElement(book) {
  let newBookElement = document.createElement('div');
  newBookElement.classList = "book";
  let title = document.createElement('p');
  title.textContent = book["title"];
  let author = document.createElement('p');
  author.textContent = book.author;
  let pages = document.createElement('p');
  pages.textContent = (book.pages + " page" + (book.pages === 1 ? "" : "s"));
  let read = document.createElement('button');
  read.classList = "btn";
  read.textContent = (String(book.read) === "true" ? "READ" : "NOT READ");
  let deleteBtn = document.createElement('button');
  deleteBtn.textContent = "REMOVE";
  deleteBtn.classList = "btn";

  newBookElement.appendChild(title);
  newBookElement.appendChild(author);
  newBookElement.appendChild(pages);
  newBookElement.appendChild(read);
  newBookElement.appendChild(deleteBtn);
  newBookElement.id = book.id;

  return newBookElement;
}

function activateOverlay() {
  overlayElement.classList = "active";
  formElement.classList = "active";
}

function deactivateOverlay() {
  overlayElement.classList = "hidden";
  formElement.classList = "hidden";
}

function resetForm() {
  formAuthor.value = "";
  formTitle.value = "";
  formPages.value = "";
  formRead.checked = false;
  titleWarningElement.classList = "hidden";
}

function alreadyContainsTitle(title) {
  for (let i = 0; i < myLibrary.length; i++) {

    if (myLibrary[i].title === title) {
      return true;
    }
  }

  return false;
}

addNewBookBtns.forEach(button => {
  button.addEventListener('click', () => {
    activateOverlay();
  })
})

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  if (alreadyContainsTitle(formTitle.value + "")) {
    titleWarningElement.classList = "active";
    return;
  }

  addBookToLibrary(new Book(formTitle.value, formAuthor.value, Number(formPages.value), formRead.checked,myLibrary.length));
  deactivateOverlay();
  resetForm();
  console.log(myLibrary);
})






