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
category = "total_prime_amount"

function selectFiscalYear(selectedFiscalYear) {
    fiscalYear = selectedFiscalYear;
    document.getElementById("dropbtn").innerHTML = `${selectedFiscalYear}`
}

function selectCategory(selectedCategory = "total_prime_amount") {
    category = selectedCategory;
    document.getElementById("category").innerHTML = `${selectedCategory}`
}


//////////////////////////// API Request /////////////////////////////////
let myPieChart = null;

const freedom = () => {
    document.getElementById("spinner").style.display = ""
    document.getElementById("FSContent").style.display = "none";
    if (myPieChart !== null) {myPieChart.destroy()}
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
        document.getElementById("spinner").style.display = "none"
        document.getElementById("FSContent").style.display = "";
        Promise.all([_promise1]).then(
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
                    legend: {
                        responsive: true,
                        display: false,
                        position: 'left',
                        },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                
                                return data.labels[tooltipItem.index] + ': $' + data.datasets[0].data[tooltipItem.index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            },
                        },
                    },
                }
            }))

        breakdown(budget_function_amounts, colors)
    }, 3000)
};

freedom();