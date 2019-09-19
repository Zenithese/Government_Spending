let abbs = [
    "AK",
    "AL",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NH",
    "NE",
    "NV",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY"
]

let fips = [
    "02",
    "01",
    "04",
    "05",
    "06",
    "08",
    "09",
    "10",
    "12",
    "13",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "33",
    "31",
    "32",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "53",
    "54",
    "55",
    "56"
]

let statesData = {};
let maxState = 10;
let maxCapita = 10;
let maxPop = 10;
let maxIncome = 10;

fips.map(fip => {
    
    getData(`https://api.usaspending.gov/api/v2/recipient/state/${fip}`).then(data => {
        
        Object.assign(statesData, { [data.code]: data })
        if (maxState < data.total_prime_amount) { maxState = data.total_prime_amount};
        if (maxCapita < data.award_amount_per_capita) { maxCapita = data.award_amount_per_capita };
        if (maxPop < data.population) { maxPop = data.population };
        if (maxIncome < data.median_household_income) { maxIncome = data.median_household_income};
    })

})

setTimeout(() => {
    slider.max = maxState;
    slider2.max = maxCapita;
    slider3.max = maxPop;
    slider4.max = maxIncome;
}, 1700)