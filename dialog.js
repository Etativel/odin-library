const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
const selectEl = favDialog.querySelector("select");
const confirmBtn = favDialog.querySelector("#confirmBtn");

{/* <div class="outside">
outside div
<button class="inside-div">
    inside button
</button>
</div> */}

const outside = document.querySelector(".outside")
const insideButton = document.querySelector(".inside-div")

function extractText(node) {
    let text = '';
    node.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
            text += child.textContent.trim();
        }
    });
    return text;
}

// Get text content of the outside div
const outsideText = extractText(outside);
console.log(outsideText); // This will log "outside div"
// const insideButton = document.querySelector(".inside-div");

// Get text content of the inside button
// const insideButtonText = insideButton.textContent.trim();
// console.log(insideButtonText); // This will log "inside button"

const outsideTxt = outside.textContent.trim();
console.log(outsideTxt); // This will log "inside button"

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

// "Favorite animal" input sets the value of the submit button
selectEl.addEventListener("change", (e) => {
  confirmBtn.value = selectEl.value;
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
favDialog.addEventListener("close", (e) => {
  outputBox.value =
    favDialog.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  favDialog.close(selectEl.value); // Have to send the select box value here.
});