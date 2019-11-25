// Get the modal
var modal = document.getElementById("myModal");

// open the modal 
document.getElementById("myBtn").onclick = function () {
    modal.style.display = "block";
}

// close the modal
document.getElementsByClassName("close")[0].onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}