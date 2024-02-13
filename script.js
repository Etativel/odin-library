const addBookBtn = document.querySelector(".addBook-btn")
const formDialog = document.querySelector(".formDialog");
const cancelForm = document.querySelector(".cancel-form")
const submitForm = document.querySelector("form")
const bookMainContainer = document.querySelector(".main")
const deleteBookBtn = document.querySelectorAll(".delete-book-card")

let bookList = []

function Book(title, author, genre, alreadyRead, rating) {
    this.title = title
    this.author = author
    this.genre = genre
    this.alreadyRead = alreadyRead
    this.rating = rating
}

function addBookToLibrary(){
    const title = document.getElementById("book-title-form").value;
    const author = document.getElementById("book-author-form").value;
    const genre = document.getElementById("book-genre-form").value;
    const alreadyRead = document.getElementById("book-read-form").checked;
    const rating = document.getElementById("book-rating-form").value;

    const currentBook = new Book(title, author, genre, alreadyRead, rating)

    bookList.push(currentBook)

}


function showBookList(bookList){
    bookMainContainer.innerHTML = "";
    for (let i = 0; i < bookList.length; i++){
        
        const title = bookList[i].title
        const author = bookList[i].author
        const readMark = bookList[i].alreadyRead
        const rating = bookList[i].rating
        const genre = bookList[i].genre

        let bookCard = document.createElement("div");
        let bookTitle = document.createElement("h3");
        let bookReadMarker = document.createElement("input");
        let bookAuthor = document.createElement("p");
        let bookGenre = document.createElement("p");
        let bookRating = document.createElement("div");
        let bookDeleteButton = document.createElement("button")
    
        bookCard.classList.add("book-card")
        bookTitle.classList.add("book-title-card")
        bookReadMarker.classList.add("book-marker")
        bookReadMarker.type = "checkbox"
        bookAuthor.classList.add("book-author-card")
        bookGenre.classList.add("book-genre-card")
        bookRating.classList.add("book-rating-card")
        bookDeleteButton.classList.add("delete-book-card")
    
        bookTitle.textContent = title;
        bookAuthor.textContent = author;
        bookGenre.textContent = genre;
        bookRating.textContent = rating + " Star";
        bookDeleteButton.textContent = "Delete";
    
        bookTitle.appendChild(bookReadMarker);
        bookRating.appendChild(bookDeleteButton);
    
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookGenre);
        bookCard.appendChild(bookRating);

        bookMainContainer.appendChild(bookCard);
    
    }
}

function deleteBook(titleName, bookList){
    return bookList.filter(book => book.title != titleName)
}

addBookBtn.addEventListener("click", ()=>{
    formDialog.showModal();
})


cancelForm.addEventListener("click", (e)=>{
    e.preventDefault()
    formDialog.close()
})

submitForm.addEventListener("submit", (e) => {
    addBookToLibrary()
    showBookList(bookList)
    e.preventDefault()
    submitForm.reset()
    formDialog.close()

});


bookMainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-book-card")) {
        e.preventDefault();
        var bookTitleToDelete = e.target.closest(".book-card").querySelector(".book-title-card").textContent.trim();
        console.log(bookTitleToDelete);
        bookList = deleteBook(bookTitleToDelete, bookList)
        showBookList(bookList)
    }
});