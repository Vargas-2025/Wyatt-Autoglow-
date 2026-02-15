console.log("JS is connected");

const bookBtn = document.getElementById("bookBtn");
if (bookBtn) {
    bookBtn.addEventListener("click", function () {
        alert("Booking coming soon!");
    });
}