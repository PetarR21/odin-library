const storageKey = 'myLibrary';


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

let myLibrary = [];
if (!localStorage.getItem(storageKey)) {
  localStorage.setItem(storageKey, JSON.stringify(myLibrary));
} else {
  myLibrary = localStorage.getItem(storageKey);
  myLibrary = JSON.parse(myLibrary);
  addBooksFromStorage();
}

console.log(myLibrary);

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}



function addBookToDOM() {
  let newBookElement = createBookElement(myLibrary[myLibrary.length - 1]);
  libraryElement.appendChild(newBookElement);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  localStorage.setItem(storageKey, JSON.stringify(myLibrary));
  addBookToDOM();
}

function removeBookFromList(id) {
  let index = -1;
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title === id) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    return;
  }

  myLibrary.splice(index, 1);
  localStorage.setItem(storageKey,JSON.stringify(myLibrary));
}

function removeElement(e) {
  let clickedBook = e.target.parentNode;
  let books = clickedBook.parentNode;
  const removedBookID = clickedBook.id;
  books.removeChild(clickedBook);
  removeBookFromList(removedBookID);
}

function createBookElement(book) {
  let newBookElement = document.createElement('div');
  newBookElement.classList = "book";
  let title = document.createElement('p');
  title.textContent = '"' + book["title"] + '"';
  let author = document.createElement('p');
  author.textContent = book.author;
  let pages = document.createElement('p');
  pages.textContent = (book.pages + " page" + (book.pages === 1 ? "" : "s"));
  let read = document.createElement('button');
  read.classList = "btn";
  read.classList.add("btn-read");
  read.textContent = (String(book.read) === "true" ? "READ" : "NOT READ");
  read.style.backgroundColor = (String(book.read) === "true" ? "#cff8c9" : "#f8c9cf")
  read.addEventListener('click', changeReadBtn);
  let deleteBtn = document.createElement('button');
  deleteBtn.textContent = "REMOVE";
  deleteBtn.classList = "btn";
  deleteBtn.classList.add("btn-remove");
  deleteBtn.addEventListener('click', removeElement);

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

function changeReadBtnInList(id) {

  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title === id) {
      if (myLibrary[i].read === false) {
        myLibrary[i].read = true;
      } else {
        myLibrary[i].read = false;
      }
      break;
    }
  }
  console.log(myLibrary);
  localStorage.setItem(storageKey,JSON.stringify(myLibrary));
}

function changeReadBtn(e) {

  let button = e.target;
  if (button.textContent === "READ") {
    button.textContent = "NOT READ";
    button.style.backgroundColor = "#f8c9cf";
  } else {
    button.textContent = "READ";
    button.style.backgroundColor = "#cff8c9";
  }
  let parentID = e.target.parentNode.id;
  changeReadBtnInList(parentID);

}

function addBooksFromStorage() {
  for (let i = 0; i < myLibrary.length; i++) {
    let newBookElement = createBookElement(myLibrary[i]);
    libraryElement.appendChild(newBookElement);
  }
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

  addBookToLibrary(new Book(formTitle.value, formAuthor.value, Number(formPages.value), formRead.checked, formTitle.value));
  deactivateOverlay();
  resetForm();
})

overlayElement.addEventListener('click', deactivateOverlay);



