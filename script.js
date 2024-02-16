const addBookBtn = document.querySelector(".addBook-btn")
const formDialog = document.querySelector(".formDialog");
const cancelForm = document.querySelector(".cancel-form")
const submitForm = document.querySelector(".dialog-form")
const bookMainContainer = document.querySelector(".main")
const container = document.querySelector('.main');
const filter = document.querySelector(".filter-form")
// const deleteBookBtn = document.querySelectorAll(".delete-book-card")
// const stars = document.querySelectorAll(".book-star i");

let bookList = [
    {title: 'Ocean Tales', author: 'Coraline Smith', genre: 'Adventure', alreadyRead: false, rating: 4},
    {title: 'Mystic Woods', author: 'Green Leaf', genre: 'Fantasy', alreadyRead: true, rating: 5},
    {title: 'Skyward Bound', author: 'Cloud Walker', genre: 'Science Fiction', alreadyRead: false, rating: 4},
    {title: 'Desert Mirage', author: 'Sandy Dunes', genre: 'Mystery', alreadyRead: true, rating: 4},
    {title: 'Rising Storm', author: 'Thunder Clash', genre: 'Thriller', alreadyRead: false, rating: 4},
    {title: 'Eternal Night', author: 'Luna Shadow', genre: 'Horror', alreadyRead: true, rating: 3},
    {title: 'The Last Stand', author: 'Final Hour', genre: 'Action', alreadyRead: false, rating: 4},
    {title: 'Whispering Sands', author: 'Desert Voice', genre: 'Romance', alreadyRead: true, rating: 4},
    {title: 'Frozen Secrets', author: 'Icy Whisper', genre: 'Mystery', alreadyRead: false, rating: 4}
    ]
let onFilterMode = false;
let filteredBookList;
function Book(title, author, genre, alreadyRead, rating){
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.alreadyRead = alreadyRead;
    this.rating = rating
}



function addBookToLibrary(){
    const title = document.getElementById("book-title-form").value;
    const author = document.getElementById("book-author-form").value;
    const genre = document.getElementById("book-genre-form").value;
    const alreadyRead = document.getElementById("book-read-form").checked;
    const rating = document.getElementById("book-rating-form").value;

    const newBook = new Book(title, author, genre, alreadyRead, rating)
    bookList.push(newBook)

}


function showBookList(bookList){

    if (bookList.length == 0){
        bookMainContainer.innerHTML = "";
        console.log("Library Empty")
    } else {
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
            let startContainer = document.createElement("div")
            let star = document.createElement("i")
    
    
            bookCard.classList.add("book-card")
            bookTitle.classList.add("book-title-card")
            bookReadMarker.classList.add("book-marker")
            bookAuthor.classList.add("book-author-card")
            bookGenre.classList.add("book-genre-card")
            bookRating.classList.add("book-rating-card")
            bookDeleteButton.classList.add("delete-book-card")
            startContainer.classList.add("book-star")
            star.classList.add("fa-solid")
            star.classList.add("fa-star")
    
            bookReadMarker.setAttribute('type', 'checkbox');
            bookReadMarker.setAttribute('class', 'book-marker');
            bookReadMarker.setAttribute('style', 'transform: scale(2);');
    
            bookTitle.textContent = title;
            bookAuthor.textContent = author;
            bookDeleteButton.textContent = "Delete";
    
            if (genre == ""){
                bookGenre.textContent = "No genre";
            } else {
                bookGenre.textContent = genre;
            }
           
            if (readMark == true){
                bookReadMarker.checked = true;
            }
        
            bookTitle.appendChild(bookReadMarker);
            
    
            for (let j = 0; j < 5; j++) {
                let clonedStar = star.cloneNode(true);
                if (j < rating) {
                    clonedStar.classList.add("active");
                }
                startContainer.appendChild(clonedStar);
            }
    
            bookRating.appendChild(startContainer);
            bookRating.appendChild(bookDeleteButton);
        
            bookCard.appendChild(bookTitle);
            bookCard.appendChild(bookAuthor);
            bookCard.appendChild(bookGenre);
            bookCard.appendChild(bookRating);
    
            bookMainContainer.appendChild(bookCard);
        
        }
    }
    
}

function deleteBook(titleName, bookList){
    return bookList.filter(book => book.title != titleName)
}

function findRatingByTitle(title) {
    for (let i = 0; i < bookList.length; i++) {
        if (bookList[i].title === title) {
            return bookList[i].rating;
        }
    }
    return "Title not found";
}

function findMarkByTitle(title) {
    for (let i = 0; i < bookList.length; i++) {
        if (bookList[i].title === title) {
            return bookList[i].alreadyRead;
        }
    }
    return "Title not found";
}

function filterBook(genre, rating, author) {
    let filteredBooks = [...bookList];
    if (!genre && !rating && !author) {
        return filteredBooks;
    }

    if (genre) {
        filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
    }

    if (rating) {
        filteredBooks = filteredBooks.filter(book => book.rating === parseInt(rating));
    }

    if (author) {
        filteredBooks = filteredBooks.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
    }

    
    return filteredBooks;
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

filter.addEventListener('submit',(e)=>{
    const filterGenre = document.getElementById("genre-filter").value;
    const filterRating = document.getElementById("rating-filter").value;
    const filterAuthor = document.getElementById("author-filter").value;
    if (!filterGenre && !filterRating && !filterAuthor) {
        e.preventDefault()
        onFilterMode = false;
    }else {
        onFilterMode = true;
    }
    console.log(onFilterMode)    
    filteredBookList = filterBook(filterGenre, filterRating, filterAuthor);
    showBookList(filteredBookList)
    e.preventDefault()
    
})


bookMainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-book-card")) {
        e.preventDefault();
        var bookTitleToDelete = e.target.closest(".book-card").querySelector(".book-title-card").textContent.trim();
        bookList = deleteBook(bookTitleToDelete, bookList)
        if (onFilterMode == true){
            if (filteredBookList.length = 0){
                showBookList(bookList)    
            }else{
                showBookList(filteredBookList)    
            }
        }else {
            showBookList(bookList)
        }
        
        
    }
    else if (e.target.classList.contains("fa-solid")){
        let bookTitleToRate = e.target.closest(".book-card").querySelector(".book-title-card").textContent.trim()
        // let rating = findRatingByTitle(bookTitleToRate)
        
        let stars = e.target.closest(".book-star").querySelectorAll(".fa-solid");
        let indexOfStarClicked = Array.from(stars).indexOf(e.target) + 1;


        let bookToUpdate = bookList.find(book => book.title === bookTitleToRate);
        if (bookToUpdate) {
            bookToUpdate.rating = indexOfStarClicked;
            if (onFilterMode == true){
                showBookList(filteredBookList)
            }else {
                showBookList(bookList)
            }
            
        }
    }
    else if (e.target.classList.contains("book-marker")){
        let bookTitleToMark = e.target.closest(".book-card").querySelector(".book-title-card").textContent.trim()
        let markCheck = findMarkByTitle(bookTitleToMark)
        markCheck = !markCheck

        let bookToUpdate = bookList.find(book => book.title === bookTitleToMark);
        if (bookToUpdate) {
            bookToUpdate.alreadyRead = markCheck;
            if (onFilterMode == true){
                showBookList(filteredBookList)
            }else{
                showBookList(bookList)
            }
            
        }
    }
});