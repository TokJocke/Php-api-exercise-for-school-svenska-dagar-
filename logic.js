document.addEventListener("onload", initsite())


function initsite() {
    getWorkFreeDays()
    getFiveYears()
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

async function getFiveYears() {
    let yearsToGet = [2015, 2016, 2017, 2018, 2019, 2020]
    let years = []
    
    for (const year of yearsToGet) {
        years = years.concat(await getDays(year))
    }
    for(let i = 0; i < years.length; i++) {
      /*   console.log("firstloop = ", years[i]) */
        
        let daysOnYear = years[i].dagar //Varför blir years[i].dagar undefined om jag försöker loopa det direkt utan variable? 
        
        for(let i = 0; i < daysOnYear.length; i++) {
            if(daysOnYear[i].helgdag === "Midsommarafton")
            console.log(daysOnYear[i])
        }
    }
    

    

}


/* function getMidsummer(days) {
    for(let i = 0; i < days.dagar.length; i++) {
        if(days.dagar[i].helgdag === "Midsommarafton"){
            console.log(days)
        }
    }
    
} */



/* async function getFiveYears() {
    let y15 = await getDays(2020)
    
    for(let i = 0; i < y15.dagar.length; i++) {
        if(y15.dagar[i].helgdag === "Midsommarafton"){
    
            console.log(y15.dagar[i]) 
    }

     



    }

} */