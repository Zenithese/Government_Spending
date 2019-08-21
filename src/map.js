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
        gridHeight = d3.max(states, function (d) { return d.y; }) + 1,
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
        .attr("x", -cellSize / 2)
        .attr("y", -cellSize / 2)
        .attr("width", cellSize - 1)
        .attr("height", cellSize - 1);

    state.append("text")
        .attr("dy", ".35em")
        .text(function (d) { return d.name; });
}

var updateFunction = drawMap();

function selectState(d) {
    selectedStates.includes(d.name) ?
    selectedStates = selectedStates.filter(el => el !== d.name) 
    : selectedStates.push(d.name);
    
    if ( selectedStates.length > 3 ) { selectedStates.shift() }
     
    drawMap();
}