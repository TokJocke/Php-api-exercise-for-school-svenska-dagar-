document.addEventListener("onload", initsite())


function initsite() {
    getWorkFreeDays()
}   

async function makeReq(path) {
    try {
        let response = await fetch(path)
        let body = await response.json()
        return body
    }
    catch(err) {
        console.log("Failed fetch", err)
    }
}

async function getDays(year) {
    let days = await makeReq("http://sholiday.faboul.se/dagar/v2.1/" + year)
    return days
}

async function getWorkFreeDays() {
    let days = await getDays(2006)    
    for(let i = 0; i < days.dagar.length ; i++) {
        if(days.dagar[i]["arbetsfri dag"] == "Ja"){
            createHtml("p", days.dagar[i].veckodag + " (" + days.dagar[i].datum + ")", "container")
        }
    } 
}

function createHtml(childElement, innerText, parentElement) {
    childElement = document.createElement(childElement)
    childElement.innerText = innerText
    parentElement = document.getElementById(parentElement)
    parentElement.appendChild(childElement)
    
}


    
