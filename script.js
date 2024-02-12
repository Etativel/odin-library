const addBookBtn = document.querySelector(".addBook-btn")
const formDialog = document.querySelector(".formDialog");
const cancelForm = document.querySelector(".cancel-form")
const submitForm = document.querySelector("form")

const bookList = []

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



addBookBtn.addEventListener("click", ()=>{
    formDialog.showModal();
})


cancelForm.addEventListener("click", (e)=>{
    e.preventDefault()
    formDialog.close()
})

submitForm.addEventListener("submit", (e) => {
    addBookToLibrary()

    e.preventDefault()
    submitForm.reset()
    formDialog.close()
    console.log(bookList)

});