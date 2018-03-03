// book constructor function
function Book (title, author, isbn) {
   this.title = title;
   this.author = author;
   this.isbn = isbn;
}

// UI Constructor function - functionalilty (methods) will go on the prototype object. 
function UI () {}

// AddBookToList method - created on the prototype 
UI.prototype.addBookToList = function(book){
   const list = document.getElementById('book-list');
   // Create a table row and add it dynamically to the table.
   const row = document.createElement('tr'); 
   // Insert cols
   row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td> <a href="#" class="delete">X</a> </td>
   `;
   // This adds the row dynamically to the table. 
   list.appendChild(row);
}
console.log(UI.prototype);
// Show alert
UI.prototype.showAlert = function(message, className) {
   // Create a div 
   const div = document.createElement('div');
   // Add classes
   div.className = `alert ${className}`;
   // Add text/textNode
   div.appendChild(document.createTextNode(message));
   // Get parent
   const container = document.querySelector('.container');
   // Get Container
   const form = document.querySelector('#book-form');
   // Insert alert
   container.insertBefore(div,form);

   // Info to be cleared after 3 seconds using setTimeout function
   setTimeout(function(){
      document.querySelector('.alert').remove();
   }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function (target) {
   if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
   }
}

// Clear input fields
UI.prototype.clearFields = function() {
   document.getElementById('title').value = '';
   document.getElementById('author').value = '';
   document.getElementById('isbn').value = '';
}
   
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

   // Validate input
   if (title === '' || author === '' || isbn === ''){  
      // error alert
      ui.showAlert('Please fill in all fields', 'error');
   } else {
      // Add book to list
      ui.addBookToList(book);

      // Show Success
      ui.showAlert('Book successfully added!', 'success');

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

   // Show alert after delete
   ui.showAlert('Book successfully removed', 'success');
   
   e.preventDefault();
});
