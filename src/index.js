/////////////////api request functions////////////////////

function getData(url) {
    return fetch(url).then(response => response.json())
    }

function postData(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),

    })
        .then(response => response.json())
}

fiscalYear = "2018"

function selectFiscalYear(selectedFiscalYear) {
    fiscalYear = selectedFiscalYear;
}

//////////////////////////// API Request /////////////////////////////////

const freedom = () => {
    budget_function_titles = []
    budget_function_codes = []
    budget_function_amounts = []
    federal_budget = 0

    _promise1 = getData('https://api.usaspending.gov/api/v2/budget_functions/list_budget_functions/').then(data => {
        // console.log(data)
        data.results.map((result) => {
            // budget_function_titles.push(result.budget_function_title)
            budget_function_codes.push(result.budget_function_code)
        }).then(budget_function_codes.map((code) => {
            postData('https://api.usaspending.gov/api/v2/spending/', {
                "type": "budget_function",
                // "state": "CA",
                "filters": {
                    "fy": fiscalYear,
                    "budget_function": code,
                }
            }).then(data => {
                budget_function_amounts.push(data)
            }).catch(error => {
                console.log(error)
            })
        }))

    })
        .catch(error => console.log(error))

    ///////////////////////// Chart ////////////////////////////////

    setTimeout(() => {
        Promise.all([_promise1]).then(
            // console.log(budget_function_amounts),
            // console.log(budget_function_titles),
            colors = [
                // 'rgb(37, 97, 114)',
                'rgb(50, 50, 140)',
                'rgb(200, 40, 90)',
                // 'rgb(42, 102, 119)',
                'rgb(45, 45, 150)',
                'rgb(211, 36, 78)',
                // 'rgb(51, 132, 155)',
                'rgb(40, 40, 160)',
                'rgb(220, 28, 69)',
                // 'rgb(53, 139, 162)',
                'rgb(35, 35, 170)',
                'rgb(228, 25, 64)',
                // 'rgb(55, 145, 169)',
                'rgb(30, 30, 180)',
                'rgb(227, 18, 57)',
                // 'rgb(58, 151, 176)',
                'rgb(25, 25, 190)',
                'rgb(235, 15, 50)',
                // 'rgb(65, 171, 199)',
                'rgb(20, 20, 205)',
                'rgb(240, 11, 59)',
                // 'rgb(68, 177, 207)',
                'rgb(15, 15, 225)',
                'rgb(245, 10, 58)',
                // 'rgb(69, 180, 210)',
                'rgb(10, 10, 245)',
                'rgb(251, 8, 58)',
                // 'rgb(71, 186, 217)',
                'rgb(0, 0, 255)',
                'rgb(255, 8, 55)',
                // 'turquoise',
                // 'darkslategrey',
                // 'cyan',
                // 'bisque',
                // 'aliceblue',
                // 'RosyBrown',
                // 'DeepPink',
                // "dimgrey",
                // 'indigo',
                // 'lavender',
                // 'peachpuff',
                // 'royalblue',
                // 'salmon',
                // 'gold',
                // 'crimson',
                // 'blue',
                // 'skyblue',
                // 'ivory',
                // 'khaki'
            ],
            budget_function_amounts.sort(function (a, b) {
                return b.total - a.total;
            }),
            ctx = document.getElementById("circle"),
            Chart.defaults.global.defaultFontFamily = "monospace",
            myPieChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: budget_function_amounts.map((result) => {
                        if (result.results.length === 0) {
                            return "CALL YOUR CONGRESSPERSON"
                        } else {
                            return result.results[0].name
                        }
                    }),
                    datasets: [{
                        label: "",
                        data: budget_function_amounts.map(result => {
                            if (result.results.length === 0) {
                                return 0
                            } else {
                                return result.results[0].amount
                            }

                        }),
                        backgroundColor: colors,
                        borderWidth: 2,
                        hoverBorderColor: [
                        ]
                    }]

                },
                options: {
                    responsive: true,
                    margin: 0,
                    // maintainAspectRatio: false,
                    legend: {
                        responsive: true,
                        display: false,
                        position: 'left',
                        // onClick: null
                        labels: {
                            boxWidth: 10,
                            fontSize: 12,
                            padding: 2,
                            fontColor: '#f5deb3',
                        }
                    },
                }
            }))

        breakdown(budget_function_amounts, colors)
    }, 3000)
};

freedom();

// graveyard

// function pieChart(data) {
//     const svg = d3.select(".piechart")
//         .attr("width", 400)
//         .attr("height", 400)

//     var g = svg.append("g")
//         .attr("transform", "translate(' + 500 + ',' + 500 + ')");

//     var color = d3.scaleOrdinal(d3.schemeParied);

//     var pie = d3.pie().value(function (d) {
//         return d.budget_function;
//     });

//     var path = d3.arc()
//         .outerRadius(500)
//         .innerRadius(0);

//     var arc = g.selectAll("arc")
//         .data(pie(data))
//         .enter()
//         .append("g");

//     arc.append("path")
//         .attr("d", path)
//         .attr("fill", function (d) { return color(d.data.budget_function); });

//     var label = d3.arc()
//         .outerRadius(radius)
//         .innerRadius(0);

//     arc.append("text")
//         .attr("transform", function (d) {
//             return "translate(" + label.centroid(d) + ")";
//         })
//         .attr("text-anchor", "middle")
//         .text(function (d) { return d.data.name + ":" + d.data.budget_function; });
// }

// postData('https://api.usaspending.gov/api/v2/search/spending_by_category', {
//     "type": "budget_function",
//     "filters": {
//         "fy": "2018",
//         "budget_function": code,
//     }
// }).then(data => {
//     console.log(data)
// }).catch(error => {
//     console.log(error)
// })

// budget_function_titles = ["National Defense", "Medicare", "Social Security", "Health", "Income Security", "Net Interest", "General Government", "Veterans Benefits and Services", "International Affairs", "Education, Training, Employment, and Social Services", "Transportation", "Administration of Justice", "Natural Resources and Environment", "Agriculture", "Community and Regional Development", "General Science, Space, and Technology", "Commerce and Housing Credit", "Energy", "Governmental Receipts"]
// budget_function_codes = ["050", "570", "650", "550", "600", "900", "800", "700", "150", "500", "400", "750", "300", "350", "450", "250", "370", "270", "000"]
// budget_function_titles = ["Administration of Justice", "Agriculture", "Commerce and Housing Credit", "Community and Regional Development", "Education, Employment, and Social Services", "Energy", "General Government", "General Science, Space, and Technology", "Governmental Receipts", "Health", "Income Security", "International Affairs", "Medicare", "Multiple functions", "National Defense", "Natural Resources and Environment", "Net Interest", "Social Security", "Transportation", "Veterans Benefits and Services"]
// budget_function_codes = ["750", "350", "370", "450", "500", "270", "800", "250", "000", "550", "600", "150", "570", "990", "050", "300", "900", "650", "400", "700"]

//     'rgb(75, 75, 75)',
//     'rgb(75, 0, 0)',
//     'rgb(0, 0, 105)',
//     'rgb(105, 105, 105)',
//     'rgb(105, 0, 0)',
//     'rgb(0, 0, 135)',
//     'rgb(135, 135, 135)',
//     'rgb(135, 0, 0)',
//     'rgb(0, 0, 165)',
//     'rgb(165, 165, 165)',
//     'rgb(165, 0, 0)',
//     'rgb(0, 0, 195)',
//     'rgb(195, 195, 195)',
//     'rgb(195, 0, 0)',
//     'rgb(0, 0, 225)',
//     'rgb(225, 225, 225)',
//     'rgb(225, 0, 0)',
//     'rgb(0, 0, 255)',
//     'rgb(255, 255, 255)',
//     'rgb(255, 0, 0)',