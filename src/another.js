function breakdown(items, colors) {
    list = items.map((item, i) => {
        budget_function = item.results.length === 0 ? 'CALL YOUR CONGRESSPERSON' : item.results[0].name
        award = item.results.length === 0 ? '*' : '$' + item.results[0].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        if (item.results.length > 0) {
            return `<div id="${budget_function}" class="budget_function" style="display:flex; padding-bottom: 5px;">
                        <div style="min-width: 162px; padding-right: 10px; border-right-style: solid; border-width: 5px; border-color: ${colors[i]};">${award}</div>
                        <span style="min-width:100%; text-align:start; padding-left: 10px;">${budget_function}</span>
                    </div>`
        }
    })
    document.getElementById("left-middle").innerHTML = list.slice(",").join("")
}

function comparePage(){
    
    document.getElementById("page3").innerHTML =   `<div class="main-content" style="height: 95%; text-align: center;">
                                                        <button class="left-scroll-buttons" onclick="scrollIt('#page2')"></button>
                                                        <div class="radar-container" style="display: inline-block; padding-top: 25px;">
                                                            <div id="spinner" class="lds-ripple" style="display: none;">
                                                                <div></div>
                                                                <div></div>
                                                            </div>
                                                            <canvas id="radar" style="opacity: 0.7;"></canvas>
                                                            <h2>${category}</h2>
                                                        </div>
                                                    </div>`

    document.getElementById("scrollTo3").style.display = ""

}