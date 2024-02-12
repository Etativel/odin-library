const addBookBtn = document.querySelector(".addBook-btn")
const formDialog = document.querySelector(".formDialog");
const cancelForm = document.querySelector(".cancel-form")
const submitForm = document.querySelector("form")

const bookList = []

function Book(title, author, pages) {
    this.title = title
}

addBookBtn.addEventListener("click", ()=>{
    formDialog.showModal();
})


cancelForm.addEventListener("click", (e)=>{
    e.preventDefault()
    formDialog.close()
})

submitForm.addEventListener("submit", (e) => {
    // e.preventDefault()
    const title = document.getElementById("book-title-form").value;
    const author = document.getElementById("book-author-form").value;
    const genre = document.getElementById("book-genre-form").value;
    const alreadyRead = document.getElementById("book-read-form").checked;
    const rating = document.getElementById("book-rating-form").value;

    bookList.push({title,author,genre,alreadyRead,rating})
    console.log(bookList)

    // Here you can perform further actions with the form data, like sending it to a server or updating the UI
});