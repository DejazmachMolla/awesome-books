class BookStore {
  constructor() {
    this.newBookDiv = '';
    this.booksArray = JSON.parse(localStorage.getItem('Books') || '[]');
    this.bookForm = document.forms['book-form'];
    this.bookContentContainer = document.getElementById('book-content-container');
    this.bookTitle = document.getElementById('title');
    this.bookDescription = document.getElementById('description');
    this.dateTimeSpan = document.getElementById('date-time-span');
    this.dateTime = luxon.DateTime;
  }

  isFormSubmit = () => {
    this.bookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const book = {
        title: this.bookTitle.value,
        description: this.bookDescription.value,
      };

      this.addBookToList(book);
    });
  }

  bookDetails = (book) => {
    this.newBookDiv += `<tr class='flex items-center justify-between h-10 px-2 my-3 font-glory'>
      <td class='text-gray-600 font-bold font-roboto'>'${book.title}' by ${book.description}</td>
      <td class='text-gray-600 font-bold'>
      <button class='remove-book bg-blue-500 text-white p-1 rounded shadow-lg border hover:shadow-none hover:bg-transparent hover:border-blue-500 hover:text-gray-700'>Remove</button>
      </td>
      </tr>`;
  }

  addBookToList = (newBook) => {
    // append the new book
    this.bookDetails(newBook);
    this.booksArray.push(newBook);// push the book to the array
    localStorage.setItem('Books', JSON.stringify(this.booksArray));// set the new book to the local storage
    window.location.reload();// relaod the window
  }

  removeBookFromList = () => {
    document.querySelectorAll('.remove-book').forEach((item, bookIndex) => {
      item.addEventListener('click', () => {
        const newBooksArray = this.booksArray.filter((book, index) => bookIndex !== index);
        localStorage.setItem('Books', JSON.stringify(newBooksArray));// set the new book to the local storage
        window.location.reload();// reload the page
      });
    });
  }

  showAllBooks = () => {
    if (this.booksArray.length > 0) {
      this.booksArray.forEach((book) => {
        this.bookDetails(book);
      });
    }

    this.bookContentContainer.innerHTML = this.newBookDiv;
  }

  getCurrentDateTime = () => {
    const today = this.dateTime.now();
    const formatted = {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'};
    this.dateTimeSpan.innerHTML = today.toLocaleString(formatted);
  }
}

const bookStore = new BookStore();
bookStore.isFormSubmit();
bookStore.showAllBooks();
bookStore.removeBookFromList();
bookStore.getCurrentDateTime();
