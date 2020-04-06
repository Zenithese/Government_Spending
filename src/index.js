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
    freedom();
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
        data.results.map((result) => {
            // budget_function_titles.push(result.budget_function_title)
            budget_function_codes.push(result.budget_function_code)
        }).then(budget_function_codes.map((code) => {
            postData('https://api.usaspending.gov/api/v2/spending/', {
                "type": "budget_function",
                "filters": {
                    "fy": fiscalYear,
                    "budget_function": code,
                }
            }).then(data => {
                // budget_function_amounts.push(data)
                fiscalYear === "2019" ? budget_function_amounts = budget_functions_2019 : fiscalYear === "2018" ? budget_function_amounts = budget_functions_2018 : budget_function_amounts = budget_functions_2017
            }).catch(error => {
                console.log(error)
            })
        }))

    })
        .catch(error => {})

    ///////////////////////// Chart ////////////////////////////////

    setTimeout(() => {
        document.getElementById("spinner").style.display = "none"
        document.getElementById("FSContent").style.display = "";
        Promise.all([_promise1]).then(
            colors = [                
                // 'rgb(50, 50, 140)',
                // 'rgb(200, 40, 90)',
                // 'rgb(45, 45, 150)',
                // 'rgb(211, 36, 78)',
                // 'rgb(40, 40, 160)',
                // 'rgb(220, 28, 69)',
                // 'rgb(35, 35, 170)',
                // 'rgb(228, 25, 64)',
                // 'rgb(30, 30, 180)',
                // 'rgb(227, 18, 57)',
                // 'rgb(25, 25, 190)',
                // 'rgb(235, 15, 50)',
                // 'rgb(20, 20, 205)',
                // 'rgb(240, 11, 59)',
                // 'rgb(15, 15, 225)',
                // 'rgb(245, 10, 58)',
                // 'rgb(10, 10, 245)',
                // 'rgb(251, 8, 58)',
                // 'rgb(0, 0, 255)',
                // 'rgb(255, 8, 55)',
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
                'rgb(37, 97, 114)',
                'rgb(42, 102, 119)',
                'rgb(51, 112, 125)',
                'rgb(53, 119, 132)',
                'rgb(55, 125, 149)',
                'rgb(58, 131, 156)',
                'rgb(65, 141, 169)',
                'rgb(68, 157, 177)',
                'rgb(69, 160, 180)',
                'rgb(71, 166, 197)',
                'rgb(75, 172, 204)',
                'rgb(80, 178, 210)',
                'rgb(84, 184, 226)',
                'rgb(88, 190, 231)',
                'rgb(92, 196, 247)',
                'rgb(98, 200, 252)',
                'rgb(104, 196, 257)',
                'rgb(110, 190, 262)',
                'rgb(114, 185, 260)',
                'rgb(118, 180, 255)',
                'rgb(122, 175, 250)',
                'rgb(126, 170, 245)',
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
    }, 2000)
};

freedom();


    var slider = document.getElementById("categoryRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;
    slider.oninput = function () {
        output.innerHTML = '$' + this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    }
    slider.onchange = function () {
        displayQualified(this.value, perCapitaDefault, populationDefault, medianIncomeDefault);
    }


    
    var slider2 = document.getElementById("categoryRange2");
    var output2 = document.getElementById("demo2");
    output2.innerHTML = slider2.value;

    slider2.oninput = function () {
        output2.innerHTML = '$' + this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    }
    slider2.onchange = function () {
        displayQualified(stateDefault, this.value, populationDefault, medianIncomeDefault);
    }



    var slider3 = document.getElementById("categoryRange3");
    var output3 = document.getElementById("demo3");
    output3.innerHTML = slider3.value;

    slider3.oninput = function () {
        output3.innerHTML = this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    }
    slider3.onchange = function () {
        displayQualified(stateDefault, perCapitaDefault, this.value, medianIncomeDefault);
    }



    var slider4 = document.getElementById("categoryRange4");
    var output4 = document.getElementById("demo4");
    output4.innerHTML = slider4.value;

    slider4.oninput = function () {
        output4.innerHTML = '$' + this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    }
    slider4.onchange = function () {
        displayQualified(stateDefault, perCapitaDefault, populationDefault, this.value);
    }




    function scrollIt(page) {

        document.querySelector(page).scrollIntoView({
            behavior: 'smooth'
        });

    }



    function clicked() {

        comparePage()
        compare()
        scrollIt('#page3')

    }

