// // // const chart = () => {
// //     const root = partition(data);

// //     const svg = d3.create("svg")
// //         .style("max-width", "100%")
// //         .style("height", "auto")
// //         .style("font", "10px sans-serif")
// //         .style("margin", "5px");

// //     svg.append("g")
// //         .attr("fill-opacity", 0.6)
// //         .selectAll("path")
// //         .data(root.descendants().filter(d => d.depth))
// //         .enter().append("path")
// //         .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
// //         .attr("d", arc)
// //         .append("title")
// //         .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

// //     svg.append("g")
// //         .attr("pointer-events", "none")
// //         .attr("text-anchor", "middle")
// //         .selectAll("text")
// //         .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
// //         .enter().append("text")
// //         .attr("transform", function (d) {
// //             const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
// //             const y = (d.y0 + d.y1) / 2;
// //             return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
// //         })
// //         .attr("dy", "0.35em")
// //         .text(d => d.data.name);

// //     yield svg.node();

// //     svg.attr("viewBox", autoBox);
// // // }

// // function autoBox() {
// //     const { x, y, width, height } = this.getBBox();
// //     return [x, y, width, height];
// // }

// // data = d3.json("https://raw.githubusercontent.com/d3/d3-hierarchy/v1.1.8/test/data/flare.json")

// // partition = data => d3.partition()
// //     .size([2 * Math.PI, radius])
// //     (d3.hierarchy(data)
// //         .sum(d => d.value)
// //         .sort((a, b) => b.value - a.value));

// // color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))

// // format = d3.format(",d")

// // width = 975

// // radius = width / 2

// // arc = d3.arc()
// //     .startAngle(d => d.x0)
// //     .endAngle(d => d.x1)
// //     .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
// //     .padRadius(radius / 2)
// //     .innerRadius(d => d.y0)
// //     .outerRadius(d => d.y1 - 1)

// // d3 = require("d3@5")


// // const renderGraph = (dataSet, catIncome) => {

// //     let selectedDataSet = dataSet ? dataSets[dataSet] : s2017;
// //     let selectedIncome = catIncome ? catIncome : sIncome2017[0]
// //     const selector = parseInt(document.getElementById("graph").innerHTML);
// //     const data = parseData(selectedDataSet, selector);

// //     const colors = [];
// //     const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length));
// //     const dia = 500;
// //     const rad = dia / 2;
// //     const partition = d3.partition().size([2 * Math.PI, rad]);

// //     const graph = d3.select('#graph')
// //         .attr('width', dia)
// //         .attr('height', dia)
// //         .append('g')
// //         .attr('transform', 'translate(' + rad + ',' + rad + ')');

// //     const root = partition(
// //         d3.hierarchy(data)
// //             .sum(d => d.cost)
// //             .sort((a, b) => b.value - a.value)
// //     );

// //     const arc = d3.arc()
// //         .innerRadius(d => d.y0)
// //         .outerRadius(d => d.y1)
// //         .startAngle(d => d.x0)
// //         .endAngle(d => d.x1);

// //     const selectSubCat = segment => {
// //         const innerData = segment.__data__;
// //         let subData = innerData;
// //         let subCat = {
// //             cat: null,
// //             val: null
// //         };

// //         if (innerData.depth === 1) {
// //             subData = innerData
// //         } else if (innerData.depth === 2) {
// //             subData = innerData.parent
// //         } else if (innerData.depth === 3) {
// //             subData = innerData.parent.parent
// //         } else if (innerData.depth === 4) {
// //             subData = innerData.parent.parent.parent
// //         }
// //         subCat.cat = subData.data.category
// //         subCat.val = subData.parent.value
// //         return subCat
// //     }

// //     const displaySubTotal = segment => {
// //         const innerData = segment.__data__;
// //         const category = innerData.data.category;
// //         const color = segment.style.fill;
// //         const { cat, val } = selectSubCat(segment);
// //         const sub = document.getElementById(`${cat}`);
// //         const percent = Math.floor(100 * (innerData.value / val));
// //         let portion = percent > 1 ? `% ${percent}` : '% < 1';


// //         sub.style.color = `${color}`;
// //         sub.style.fontWeight = '900'
// //         document.getElementById(`${cat}-val`).style.color = `${color}`;
// //         document.getElementById('sub-cat').innerHTML = `${category}`;
// //         document.getElementById('sub-val').innerHTML = `${currency.format(innerData.value)}`;
// //         document.getElementById('sub-val').style.borderColor = `${color}`;
// //         document.getElementById('sub-percent').innerHTML = portion;
// //         document.getElementById('sub-percent').style.borderColor = `${color}`;
// //     }

// //     const revertSubtotal = (segment) => {
// //         const { cat, val } = selectSubCat(segment)
// //         const sub = document.getElementById(`${cat}`);

// //         sub.style.color = '#999999';
// //         sub.style.fontWeight = '400';
// //         document.getElementById(`${cat}-val`).style.color = '#000000';
// //         document.getElementById('sub-cat').innerHTML = "Segment";
// //         document.getElementById('sub-val').innerHTML = "$0.00";
// //         document.getElementById('sub-val').style.borderColor = '#000000';
// //         document.getElementById('sub-percent').innerHTML = '% 0';
// //         document.getElementById('sub-percent').style.borderColor = '#000000';
// //     }

// //     graph.selectAll('path')
// //         .data(root.descendants())
// //         .enter()
// //         .append('path')
// //         .attr('display', d => d.depth ? null : 'none')
// //         .attr('d', arc)
// //         .style('stroke-width', 2)
// //         .style('stroke', 'white')
// //         .style('fill-opacity', 0.8)
// //         .on("mouseover", function () { d3.select(this).style('fill-opacity', 1), displaySubTotal(this) })
// //         .on("mouseout", function () { d3.select(this).style('fill-opacity', 0.8), revertSubtotal(this) })
// //         .style('fill', d => {
// //             if (d.depth === 1) {
// //                 colors.push(color(d.data.category))
// //                 return color(d.data.category)
// //             } else if (d.depth === 2) {
// //                 return color(d.parent.data.category)
// //             } else if (d.depth === 3) {
// //                 return color(d.parent.parent.data.category)
// //             } else if (d.depth === 4) {
// //                 return color(d.parent.parent.parent.data.category)
// //             }
// //         })


// //     buildLedger(root, colors, selectedIncome);

// // }

// const dataset1 = [80, 100, 56, 120, 180, 30, 140, 120, 160, 200, 300, 500];
// const dataset2 = [70, 120, 156, 20, 180, 130, 240, 120, 60, 220, 40, 50];
// const dataset3 = [90, 110, 256, 20, 180, 230, 340, 120, 100, 20, 30, 90];
// const dataset4 = [60, 160, 356, 210, 180, 430, 40, 120, 170, 210, 90, 200];
// // const colors = [];
// // const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length));
// const dia = 500;
// // const rad = dia / 2;
// // const partition = d3.partition().size([2 * Math.PI, rad]);


// const svgWidth = 500, svgHeight = 300, barPadding = 5;
// const barWidth = (svgWidth / dataset1.length);



//     const svg = d3.select('svg')
//         .attr("width", "100%")
//         .attr("height", "100%");


//     // svg.append("g")
//     //     .attr("fill-opacity", 0.6)
//     //     .selectAll("path")
//     //     .data(root.descendants().filter(d => d.depth))
//     //     .enter().append("path")
//     //     .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
//     //     .attr("d", arc)
//     //     .append("title")
//     //     .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

//     const barChart = svg.selectAll("rect")

//         .data(dataset1)
//         .enter()
//         .append("rect")
//         .attr("y", function (d) {
//             return svgHeight - d
//         })
//         .attr("height", function (d) {
//             return d;
//         })
//         .attr("width", barWidth - barPadding)
//         .attr("transform", function (d, i) {
//             const translate = [barWidth * i, 0];
//             return "translate(" + translate + ")";
//         })


let ctx = document.getElementById("circle")
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["military", "education"],
            datasets: [{
                label: "",
                data: [70, 30],
                backgroundColor: [
                    'turquoise',
                    'darkslategrey',
                ],
                borderColor: [
                    'turquoise',
                    'darkslategrey',
                ],
                borderWidth: 0,
                hoverBorderColor: [
                    "black",
                    "black"
                ]
            }]

        }
    });
    // Chart.defaults.global.elements.borderWidth = 2;
    
    // Chart.defaults.global.elements.pointborderWidth = 5;
    // Chart.defaults.global.elements.pointBorderColor = 'black';

let ctx2 = document.getElementById("radar") 
    var chart = new Chart(ctx2, {
        type: 'radar',
        data: {
            datasets: [
                {
                label: 'California',
                data: [0, 20, 40, 50], 
                backgroundColor: [
                    'rgba(70, 130, 180, 0.7)',
                ],
                borderColor: [
                        'rgb(70, 130, 180)',
                    ],
                borderWidth: 3,
                pointRadius: 4,
                pointBorderColor: 'rgb(70, 130, 180)',
                hoverBorderColor: [
                        "black",
                        "black"
                ]},
                {
                label: 'New York',
                data: [50, 80, 20, 10],
                backgroundColor: [
                    'rgba(47, 79, 79, 0.7)',
                ],
                borderColor: [
                        'rgb(47, 79, 79)',
                        
                ],
                borderWidth: 3,
                pointRadius: 4,
                pointBorderColor: 'rgb(47, 79, 79)',
                hoverBorderColor: [
                    "black",
                    "black"
                ]},
                {
                label: 'Georgia',
                data: [70, 30, 10, 70],
                backgroundColor: [
                    
                    'rgba(62, 223, 207, 0.7)',
                ],
                borderColor: [
                    
                    'rgb(62, 223, 207)',
                ],
                borderWidth: 3,
                pointRadius: 4,
                pointBorderColor: 'rgb(62, 223, 207)',
                hoverBorderColor: [
                    "black",
                    "black"
                ]}
            ],
            labels: ['Military', 'Education', 'Health', 'Environment']
        },
        options: {
            scale: {
                ticks: {
                    suggestedMin: 50,
                    suggestedMax: 100
                }
            }
        }
    });
    


