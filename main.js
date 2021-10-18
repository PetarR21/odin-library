let myLibrary = [];

let libraryElement = document.querySelector('#books');
let overlayElement = document.querySelector('#overlay');
let formElement = document.querySelector('#form');
let addNewBookBtns = document.querySelectorAll('.btn-add-group');
let submitBtn = document.querySelector('#btn-submit');

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function createBookElement(book) {
  let newBookElement = document.createElement('div');
  newBookElement.classList = "book";
  let title = document.createElement('p');
  title.textContent = book.title;
  let author = document.createElement('p');
  author.textContent = book.author;
  let pages = document.createElement('p');
  pages.textContent = (book.pages + " page" + (book.pages === 1 ? "" : "s"));
  let read = document.createElement('button');
  read.classList = "btn";
  read.textContent = book.read;
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

addNewBookBtns.forEach(button => {
  button.addEventListener('click',() => {
    activateOverlay();
  })
})

submitBtn.addEventListener('click',() =>{
  deactivateOverlay();
})
