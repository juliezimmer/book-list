class Book {
   constructor (title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
   }
}

// methods for the UI go in this class
class UI {
   addBookToList(book){
      const list = document.getElementById('book-list');
      const row = document.createElement('tr'); 
      row.innerHTML =   `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td> <a href="#" class="delete">X</a> </td> `;
     
      list.appendChild(row);
   }
   
   showAlert (message, className) {
      // Create div
      const div = document.createElement('div');
      // Add classes
      div.className = `alert ${className}`;
      // Add text/textNode
      div.appendChild(document.createTextNode(message));
      // Get parent
      const container = document.querySelector('.container');
      // Get form
      const form = document.querySelector('#book-form');
      // Insert alert
      container.insertBefore(div,form);

      // Info to be cleared after 3 seconds using setTimeout 
      setTimeout(function(){
      document.querySelector('.alert').remove();
      }, 3000);
   }

   deleteBook(target) {
      if(target.className === 'delete') {
         target.parentElement.parentElement.remove();
      }
   }

   clearFields() {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
   }
}

// Local Storage Class
class Storage {
   // all methods will be static
   // fetches books from local storage
   static getBooks() {
      let books;
      // check storage for the book
      // if the book isn't in local storage, set books equal to an empty array.
      // getItem() is a method on the localStorage
      if(localStorage.getItem('books') === null ) {
          books = [];
      } else { // if there are books in local storage, get the books and parse the JSON so it is returned in object format.
         books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
   }

   // displays books from storage on the DOM
   static displayBooks() {
      const books = Storage.getBooks();
      
      // loop through the array of books
      books.forEach(function(book){
         const ui = new UI;
         // Add Book to UI
         ui.addBookToList(book);
      });
   }
   
   // adds a book to local storage
   static addBook(book){
      // the class name, Storage, is used because this is a static method and does not require instantiation. 
      const books = Storage.getBooks();
      books.push(book);
      // set local storage with the new book that was just pushed to the array, but it needs to be put in JSON format to be stored in localStorage.
      localStorage.setItem('books', JSON.stringify(books));
   }

   // deletes book from storage
   static removeBook(isbn){
      const books = Storage.getBooks();
      books.forEach(function(book, index){
         if(book.isbn === isbn) {
            books.splice(index, 1);
         }
      });
      localStorage.setItem('books', JSON.stringify(books));
   }
}

// DOM load Event
// When the DOM content loads, the displayBooks() method  in the storage class is called. 
document.addEventListener('DOMContentLoaded', Storage.displayBooks);


// Event Listener for adding book
document.getElementById('book-form').addEventListener('submit', function(e){
   // variables for form values
   const title = document.getElementById('title').value;
   const author = document.getElementById('author').value;  
   const isbn = document.getElementById('isbn').value;  

   //  Instantiate the book object
   const book = new Book(title, author, isbn);

   // Instantiate a UI object
   const ui = new UI();
   console.log(ui);

   // Validate input
   if (title === '' || author === '' || isbn === ''){  
      ui.showAlert('Please fill in all fields', 'error');
   } else {
      // Add book to list
      ui.addBookToList(book);

      // Add book to local storage
      Storage.addBook(book);

      // Show Success
      ui.clearFields('Book successfully added!', 'success');

   // Clear input fields
      ui.clearFields();
   }
   e.preventDefault();
});

// Event listener for deleting book
document.getElementById('book-list').addEventListener('click', function(e){
   // Instantitate the UI
   const ui = new UI();
   
   // delete book
   ui.deleteBook(e.target);

   // remove from localStorage
   // 'e.target.parentElement' grabs the <td> tag
   // To target the isbn number, use the previousElementSibling() method and .textContent will target the text inside of it.
   Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

   // Show alert after delete
   ui.showAlert('Book successfully removed', 'success');
   
   e.preventDefault();
});
