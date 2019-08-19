// function getData(url) {
//     return fetch(url).then(response => response.json())
// }

// function postData(url = '', data = {}) {
//     return fetch(url, {
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache',
//         credentials: 'same-origin',
//         headers: {
//             'Content-type': 'application/json',
//         },
//         redirect: 'follow',
//         referrer: 'no-referrer',
//         body: JSON.stringify(data),

//     })
//         .then(response => response.json())
// }

// stateFIPS = []

// getData('https://api.usaspending.gov/api/v2/recipient/state/').then(data => {
    
//         data.forEach(datum => {
//             stateFIPS.push({ place : datum.name, id : datum.fips })
//         });
//     console.log(stateFIPS)
//     })

function breakdown(items, colors) {
    list = items.map((item, i) => {
        budget_function = item.results.length === 0 ? 'CALL YOUR CONGRESSPERSON' : item.results[0].name
        award = item.results.length === 0 ? '*' : item.results[0].amount
        return `<div id="${budget_function}" class="budget_function" style="display:flex; padding-bottom: 5px;">
                    <div style="min-width:120px; padding-right: 10px; border-right-style: solid; border-width: 5px; border-color: ${colors[i]};">${award}</div>
                    <span style="min-width:100%; text-align:start; padding-left: 10px;">${budget_function}</span>
                </div>`
    })
    document.getElementById("left-middle").innerHTML = list.slice(",").join("")
}

    // `${budget_function} | ${award}`

// `<div id="${budget_function}" class="ledger-item"><div>${budget_function}</div><span>${award}</span></div>`