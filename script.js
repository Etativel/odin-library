const addBookBtn = document.querySelector(".addBook-btn")
const formDialog = document.querySelector(".formDialog");
const cancelForm = document.querySelector(".cancel-form")
const submitForm = document.querySelector("form")
const bookMainContainer = document.querySelector(".main")
const deleteBookBtn = document.querySelectorAll(".delete-book-card")
const stars = document.querySelectorAll(".book-star i");

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.main');
    
    container.addEventListener("click", (event) => {
        if (event.target.classList.contains("fa-star")) {
            const stars = event.target.parentElement.querySelectorAll(".fa-star");
            const clickedStarIndex = Array.from(stars).indexOf(event.target);
            
            stars.forEach((star, index) => {
                if (index <= clickedStarIndex) {
                    star.classList.add("active");
                } else {
                    star.classList.remove("active");
                }
            });
        }
    });
});

// // Loop through the "stars" NodeList
// stars.forEach((star, index1) => {
//   // Add an event listener that runs a function when the "click" event is triggered
//   star.addEventListener("click", () => {
//     // Loop through the "stars" NodeList Again
//     stars.forEach((star, index2) => {
//       // Add the "active" class to the clicked star and any stars with a lower index
//       // and remove the "active" class from any stars with a higher index
//       index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
//     });
//   });
// });


let bookList = []

function addBookToLibrary(){
    const title = document.getElementById("book-title-form").value;
    const author = document.getElementById("book-author-form").value;
    const genre = document.getElementById("book-genre-form").value;
    const alreadyRead = document.getElementById("book-read-form").checked;
    const rating = document.getElementById("book-rating-form").value;

    bookList.push({title, author, genre, alreadyRead, rating})

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
    
        console.log(star)

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
        
        for (let i = 0; i < 5; i++) {
            let clonedStar = star.cloneNode(true); // Clone the star element
            startContainer.appendChild(clonedStar); // Append the cloned star to the container
        }

        bookRating.appendChild(startContainer);
        bookRating.appendChild(bookDeleteButton);
    
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookGenre);
        bookCard.appendChild(bookRating);

        console.log(bookRating)
        console.log(startContainer)

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
    e.preventDefault()
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