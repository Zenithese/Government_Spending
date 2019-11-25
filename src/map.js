var states = [],
    selectedStates = [];

function drawMap() {
    d3.select("#grid").text().split("\n").forEach(function (line, i) {
        var re = /\w+/g, m;
        while (m = re.exec(line)) states.push({
            name: m[0],
            selected: selectedStates.indexOf(m[0]) >= 0,
            x: m.index / 3,
            y: i
        });
    });

    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var gridWidth = d3.max(states, function (d) { return d.x; }) + 1,
        gridHeight = d3.max(states, function (d) { return d.y; }) + 1;
        cellSize = 60;

    var state = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .selectAll(".state")
        .data(states)
        .enter().append("g")
        .attr("class", function (d) { return "state" + (d.selected ? " state--selected" : ""); })
        .attr("transform", function (d) { return "translate(" + (d.x - gridWidth / 2) * cellSize + "," + (d.y - gridHeight / 2) * cellSize + ")"; })
        .on("click", selectState);

    state.append("rect")
        .attr("x", -cellSize / 2 )
        .attr("y", -cellSize / 2 )
        .attr("width", cellSize - 1 )
        .attr("height", cellSize - 1 );

    state.append("text")
        .attr("dy", ".35em")
        .text(function (d) { return d.name; });
}

    var updateFunction = drawMap();

    let stateDefault = 0;
    let perCapitaDefault = 0;
    let populationDefault = 0;
    let medianIncomeDefault = 0;

    let ceiling = false;

    function floorOrCeiling() {
        ceiling = !ceiling
        displayQualified();
    }
    
function selectState(d) {
    selectedStates = [d.name];
    slider.value = statesData[d.name].total_prime_amount;
    output.innerHTML = '$' + slider.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    slider2.value = statesData[d.name].award_amount_per_capita;
    output2.innerHTML = '$' + slider2.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    slider3.value = statesData[d.name].population;
    output3.innerHTML = slider3.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    slider4.value = statesData[d.name].median_household_income;
    output4.innerHTML = '$' + slider4.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    stateDefault = statesData[d.name].total_prime_amount;
    perCapitaDefault = statesData[d.name].award_amount_per_capita;
    populationDefault = statesData[d.name].population;
    medianIncomeDefault = statesData[d.name].median_household_income;
    drawMap();
    console.log(d)
    var st = document.getElementsByClassName("state--selected");
    for (let i = 0; i < st.length; i++) {
        ceiling ? st[i].childNodes[0].style.fill = "#f70022" : st[i].childNodes[0].style.fill = "#2196F3";
    }
}

function displayQualified(stateValue = stateDefault, perCapitaValue = perCapitaDefault, populationValue = populationDefault, medianIncomeValue = medianIncomeDefault, category = 'total_prime_amount', category2 = 'award_amount_per_capita', category3 = 'population', category4 = 'median_household_income') {
    stateDefault = stateValue;
    perCapitaDefault = perCapitaValue;
    populationDefault = populationValue;
    medianIncomeDefault = medianIncomeValue;
    
    if (ceiling) {
        abbs.forEach(state => {
            if (statesData[state][category] <= stateValue && !selectedStates.includes(state)) {
                selectedStates.push(state)
            } 

            if (statesData[state][category2] <= perCapitaValue && !selectedStates.includes(state)) {
                selectedStates.push(state)
            } 

            if (statesData[state][category3] <= populationValue && !selectedStates.includes(state)) {
                selectedStates.push(state)
            } 

            if (statesData[state][category4] <= medianIncomeValue && !selectedStates.includes(state)) {
                selectedStates.push(state)
            } 

            if ((Math.floor(statesData[state][category]) > stateValue
                || Math.floor(statesData[state][category2]) > perCapitaValue
                || Math.floor(statesData[state][category3]) > populationValue
                || Math.floor(statesData[state][category4]) > medianIncomeValue) && selectedStates.includes(state)) {
                // selectedStates = selectedStates.filter(selected => selected !== state)
                for (let i = selectedStates.length - 1; i >= 0; i--) {
                    if (selectedStates[i] === state) {
                        selectedStates.splice(i, 1);
                    }
                }
            }
        });
    } else {
        abbs.forEach(state => {
            if (statesData[state][category] >= stateValue && !selectedStates.includes(state)) {
                selectedStates.push(state)
            } 

            if (statesData[state][category2] >= perCapitaValue && !selectedStates.includes(state)) {
                selectedStates.push(state)
            } 

            if (statesData[state][category3] >= populationValue && !selectedStates.includes(state)) {
                selectedStates.push(state)
            } 

            if (statesData[state][category4] >= medianIncomeValue && !selectedStates.includes(state)) {
                selectedStates.push(state)
            } 

            if (  (statesData[state][category]  < stateValue
                || statesData[state][category2] < perCapitaValue
                || statesData[state][category3] < populationValue
                || statesData[state][category4] < medianIncomeValue) && selectedStates.includes(state)) {
                // selectedStates = selectedStates.filter(selected => selected !== state)
                for (let i = selectedStates.length - 1; i >= 0; i--) {
                    if (selectedStates[i] === state) {
                        selectedStates.splice(i, 1);
                    }
                }
            }
        });
    }

    drawMap();

    var st = document.getElementsByClassName("state--selected");
    for (let i = 0; i < st.length; i++) {
        ceiling ? st[i].childNodes[0].style.fill = "#f70022" : st[i].childNodes[0].style.fill = "#2196F3";
    }
}

dragElement(document.getElementById("radar-controls"));
dragElement(document.getElementById("a"));
dragElement(document.getElementById("b"));
dragElement(document.getElementById("c"));
dragElement(document.getElementById("d"));
dragElement(document.getElementById("d3"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "-header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
