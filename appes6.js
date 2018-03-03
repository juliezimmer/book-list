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

   // Show alert after delete
   ui.showAlert('Book successfully removed', 'success');
   
   e.preventDefault();
});
