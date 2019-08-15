// Api request

// document.addEventListener("submit", () => {

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
    
// })
budget_function_titles = []
budget_function_codes = []
// budget_function_titles = ["National Defense", "Medicare", "Social Security", "Health", "Income Security", "Net Interest", "General Government", "Veterans Benefits and Services", "International Affairs", "Education, Training, Employment, and Social Services", "Transportation", "Administration of Justice", "Natural Resources and Environment", "Agriculture", "Community and Regional Development", "General Science, Space, and Technology", "Commerce and Housing Credit", "Energy", "Governmental Receipts"]
// budget_function_codes = ["050", "570", "650", "550", "600", "900", "800", "700", "150", "500", "400", "750", "300", "350", "450", "250", "370", "270", "000"]
// budget_function_titles = ["Administration of Justice", "Agriculture", "Commerce and Housing Credit", "Community and Regional Development", "Education, Employment, and Social Services", "Energy", "General Government", "General Science, Space, and Technology", "Governmental Receipts", "Health", "Income Security", "International Affairs", "Medicare", "Multiple functions", "National Defense", "Natural Resources and Environment", "Net Interest", "Social Security", "Transportation", "Veterans Benefits and Services"]
// budget_function_codes = ["750", "350", "370", "450", "500", "270", "800", "250", "000", "550", "600", "150", "570", "990", "050", "300", "900", "650", "400", "700"]
budget_function_amounts = []
federal_budget = 0

getData('https://api.usaspending.gov/api/v2/budget_functions/list_budget_functions/').then(data => {
    data.results.map((result) => {
        budget_function_titles.push(result.budget_function_title)
        budget_function_codes.push(result.budget_function_code)
    }).then(budget_function_codes.map((code) => {
        postData('https://api.usaspending.gov/api/v2/spending/', {
            "type": "budget_function",
            "filters": {
                "fy": "2019",
                "budget_function": code,
            }
        }).then(data => {
            budget_function_amounts.push(data.total)
            // console.log(federal_budget += data.total)
        }).catch(error => {
            console.log(error)
        })
    }))

})
    .catch(error => console.log(error))

//STATE PARMS-------------------------------------------------------------------
let Environmental = []
let Education = []
let Health = []
let Defense = []
let states = [[],[],[]]

postData('https://api.usaspending.gov/api/v2/search/spending_by_geography/', {
    "scope": "place_of_performance",
    "geo_layer": "state",
    "geo_layer_filters": ["CA", "NY", "GA"],
    "filters": {
        "keywords": ['health'],
        "time_period": [
            {
                "start_date": "2016-10-01",
                "end_date": "2017-09-30"
            }
        ]

    },
    "subawards": false
}).then(data => {
    // debugger
    console.log(data)
    data.results.forEach(element => {
        Health.push(element.aggregated_amount)
    });
    Health.forEach((element, i) => {
        states[i].push({health: element})
    });
}).then(postData('https://api.usaspending.gov/api/v2/search/spending_by_geography/', {
    "scope": "place_of_performance",
    "geo_layer": "state",
    "geo_layer_filters": ["CA", "NY", "GA"],
    "filters": {
        "keywords" : ['environmental'],
        "time_period": [
            {
                "start_date": "2016-10-01",
                "end_date": "2017-09-30"
            }
        ]
        
    },
    "subawards": false
}).then(data => {
    // debugger
    console.log(data)
    data.results.forEach(element => {
        Environmental.push(element.aggregated_amount)
    });
    Environmental.forEach((element, i) => {
        states[i].push({envionmental: element})
    });
})).then(postData('https://api.usaspending.gov/api/v2/search/spending_by_geography/', {
    "scope": "place_of_performance",
    "geo_layer": "state",
    "geo_layer_filters": ["CA", "NY", "GA"],
    "filters": {
        "keywords" : ['education'],
        "time_period": [
            {
                "start_date": "2016-10-01",
                "end_date": "2017-09-30"
            }
        ]
        
    },
    "subawards": false
}).then(data => {
    // debugger
    console.log(data)
    data.results.forEach(element => {
        Education.push(element.aggregated_amount)
    });
    Education.forEach((element, i) => {
        states[i].push({education: element})
    });
})).then(postData('https://api.usaspending.gov/api/v2/search/spending_by_geography/', {
    "scope": "place_of_performance",
    "geo_layer": "state",
    "geo_layer_filters": ["CA", "NY", "GA"],
    "filters": {
        "keywords" : ['defense'],
        "time_period": [
            {
                "start_date": "2016-10-01",
                "end_date": "2017-09-30"
            }
        ]
        
    },
    "subawards": false
}).then(data => {
    // debugger
    console.log(data)
    data.results.forEach(element => {
        Defense.push(element.aggregated_amount)
    });
    Defense.forEach((element, i) => {
        states[i].push({defense: element})
    });
}).catch(error => {
    // debugger
    console.log(error)
})).then(console.log(states))

//STATE PARMS-------------------------------------------------------------------

// Chart.js graphs

let ctx = document.getElementById("circle")
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: budget_function_titles,
        datasets: [{
            label: "",
            data: budget_function_amounts,
            backgroundColor: [
                'turquoise',
                'darkslategrey',
                'cyan',
                'bisque',
                'aliceblue',
                'RosyBrown',
                'DeepPink',
                "dimgrey",
                'indigo',
                'lavender',
                'peachpuff',
                'royalblue',
                'salmon',
                'gold',
                'crimson',
                'blue',
                'skyblue',
                'ivory',
                'khaki'

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

    },
    options: {
        responsive: true,
        margin: 0,
        // maintainAspectRatio: false,
        legend: {
            responsive: true,
            display: true,
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
});

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
                ]
            },
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
                ]
            },
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
                ]
            }
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