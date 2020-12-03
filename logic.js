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
    console.log("function getWorkFreeDays = ")
    let days = await getDays(2006)  
    
    for(let i = 0; i < days.dagar.length ; i++) {
        if(days.dagar[i]["arbetsfri dag"] == "Ja"){
            let dag = document.createElement("p")
            dag.innerText = days.dagar[i].veckodag + " (" + days.dagar[i].datum + ")"
            let container = document.getElementById("container")
            container.appendChild(dag)
        }
    } 

}