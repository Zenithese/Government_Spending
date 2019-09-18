document.getElementById("modal-container").innerHTML = `<button id="myBtn">FREEDOM SPENDING</button>
 
                                                    <div id="myModal" class="modal">

                                                    <div class="modal-content">
                                                            <div class="modal-header">
                                                                <span class="close">&times;</span>
                                                                <h2>Freedom Spending</h2>
                                                            </div>
                                                            <div class="modal-body">
                                                                <p>DATA act</p>
                                                                <p>Types of spending</p>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <h3>
                                                                    <a href="https://angel.co/justin-andersen-1" class="fab fa-angellist" style="text-decoration: none; color: white;"></a>
                                                                    <a href="https://github.com/Zenithese" class="fab fa-github" style="text-decoration: none; color: white;"></a>
                                                                    <a href="https://www.linkedin.com/in/justin-andersen-54750b75/" class="fab fa-linkedin-in" style="text-decoration: none; color: white;"></a>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>`

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}