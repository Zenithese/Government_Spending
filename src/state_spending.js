let Environmental = []
let Education = []
let Health = []
let Defense = []
let States = [{}, {}, {}]

let stateFilters = selectedStates

/////////////////////////api request////////////////////////////////////////////

function compare() {
    debugger
    promise1 = postData('https://api.usaspending.gov/api/v2/search/spending_by_geography/', {
        "scope": "place_of_performance",
        "geo_layer": "state",
        "geo_layer_filters": stateFilters,
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
            States[i] = Object.assign(States[i], { "health": element })
        });
    })

    promise2 = postData('https://api.usaspending.gov/api/v2/search/spending_by_geography/', {
        "scope": "place_of_performance",
        "geo_layer": "state",
        "geo_layer_filters": ["CA", "NY", "GA"],
        "filters": {
            "keywords": ['environmental'],
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
            States[i] = Object.assign(States[i], { "environmental": element })
        });
    })

    promise3 = postData('https://api.usaspending.gov/api/v2/search/spending_by_geography/', {
        "scope": "place_of_performance",
        "geo_layer": "state",
        "geo_layer_filters": ["CA", "NY", "GA"],
        "filters": {
            "keywords": ['education'],
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
            States[i] = Object.assign(States[i], { "education": element })
        });
    })

    promise4 = postData('https://api.usaspending.gov/api/v2/search/spending_by_geography/', {
        "scope": "place_of_performance",
        "geo_layer": "state",
        "geo_layer_filters": ["CA", "NY", "GA"],
        "filters": {
            "keywords": ['defense'],
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
            States[i] = Object.assign(States[i], { "defense": element })
        });
    }).catch(error => {
        console.log(error)
    })

    //////////////////////////////// Chart /////////////////////////////////////

    setTimeout(() => {
        Promise.all([promise1, promise2, promise3, promise4]).then(
            ctx2 = document.getElementById("radar"),
            Chart.defaults.global.defaultFontColor = "aliceblue",
            chart = new Chart(ctx2, {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: 'Georgia',
                            data: Object.values(States[1]),
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
                            label: 'New York',
                            data: Object.values(States[2]),
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
                        },
                        {
                            label: 'California',
                            data: Object.values(States[0]),
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
                        }
                    ],
                    labels: Object.keys(States[0])
                },
                // options: {
                //     scale: {
                //         ticks: {
                //             suggestedMin: 50,
                //             suggestedMax: 100
                //         }
                //     }
                // }
            })
        )
        console.log(States)
    }, 5000)
}