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
{/* <div class="book-card">
    <h3 class="book-title-card">
        The Time Machine
        <input type="checkbox" class="book-marker">
    </h3>
    <p class="book-author-card">H. G. Well</p>
    <p class="book-genre-card">Horror</p>
    <div class="book-rating-card">
        4 Star
        <button class="delete-book-card">Delete</button>
    </div>
</div> */}

function createBookCard(bookList){
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
    bookAuthor.classList.add("book-author-card")
    bookGenre.classList.add("book-genre-card")
    bookRating.classList.add("book-rating-card")
    bookDeleteButton.classList.add("delete-book-card")

    drawBoard.appendChild(gridBox);
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