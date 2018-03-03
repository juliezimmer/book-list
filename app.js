// book constructor function
function Book (title, author, isbn) {
   this.title = title;
   this.author = author;
   this.isbn = isbn;
}

// UI Constructor function - this takes care of adding the book to the list in the browser.
// Functionalilty (methods) will go on the prototype object. 
function UI () {}

// Create a prototype for the Book object
// Add the Book to List
// the method addBookToList is now on the prototype
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
// Show alert
UI.prototype.showAlert = function(message, className) {
   // Create a div for the new book
   const div = document.createElement('div');
   // Add classes
   div.className = `alert ${className}`;
   // Add text
   div.appendChild(document.createTextNode)
}

// Clear input fields
UI.prototype.clearFields = function() {
   document.getElementById('title').value = '';
   document.getElementById('author').value = '';
   document.getElementById('isbn').value = '';
}
   
// Event LIsteners
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
      UI.showAlert('Please fill in all fields');
   } else {
      // Add book to list
      ui.addBookToList(book);

      // Clear input fields
      ui.clearFields();
   }
   e.preventDefault();
});