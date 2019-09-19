document.getElementById("modal-container").innerHTML = `<div class="header-left">FREEDOM SPENDING</div><div class="header-right"><button id="myBtn">ABOUT</button></div>

 
                                                    <div id="myModal" class="modal">

                                                    <div class="modal-content">
                                                            <div class="modal-header">
                                                                <span class="close">&times;</span>
                                                                <h2>Freedom Spending</h2>
                                                            </div>
                                                            <div class="modal-body">
                                                                <p>This data vizualization was made possible via the Digital Accountability and Transparency Act of 2014 (DATA Act) (P.L. 113-101) signed by President Obama in May 2014. Thanks to the data's accessibilty I was able to create a visualization of Federal spending parsed into the US Treasury's budget functions. Additonally, here you'll find federal spending per state. I hope this project insipres increasingly incisive data visualizations that increase transperency.</p>
                                                                <p>In the spirit of transparency, consider the differnent types of federal spending, mainly: discresionary and mandatory. Discresionary spendings are decided via a appropreation process by congress every year, whereas mandatory do not require that same yearly process. Addtionally, tax breaks are considered tax expenditures (i.e. it sacrifices tax revenue to the benefit of specific economic sectors). These considerations would be a healthy addition for this project, and are being considered for future development.</p>
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