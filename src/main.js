import * as charting from "./charting.js";
import * as dataJS from "./data.js";



function init() {

    dataJS.init();

    //setupVariables();

    {
        //#region OLD INIT
    // document.querySelector("#searchBtn").onclick = (e) => {
    //     //let content = document.querySelector("#content");
    //     setupVariables();
    //     summonerName = document.querySelector("#summonerName").value;

    //     if (!storedNames)
    //         storedNames = [];

    //     if (!storedNames.includes(summonerName))
    //         storedNames.push(summonerName);
    //     else {
    //         storedNames.splice(storedNames.indexOf(summonerName), 1);
    //         storedNames.push(summonerName);
    //     }

    //     console.log("storedNames: " + storedNames);
    //     localStorage.setItem("storedSummoners", JSON.stringify(storedNames));

    //     let endIndex = 3;
    //     endIndex = document.querySelector("#games").value;
    //     let beginTime = 1605225600;
    //     // 2. Create an XHR object to download the web service
    //     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/
    //     const xhr = new XMLHttpRequest();
    //     const apiKey = "RGAPI-971dd69c-024f-43c8-81a8-5dfb6a915e71";
    //     //https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Doublelift?api_key=RGAPI-YOUR-API-KEY
    //     const url = `https://people.rit.edu/kct2548/330/project-3/php/history_proxy.php?summoner=${summonerName}&apiKey=${apiKey}&endIndex=${endIndex}`;


    //     // my account id
    //     // ihBG1EIlGbon_KNR8HJ0J6lQM03qPILNpcJWK3_wlV5pSVc

    //     // test game id
    //     // 3665816766

    //     // time stamp for 11/13/2020 (third day of preseason)
    //     // 1605225600

    //     /*
    //     Who you beat and lose to the most
    //     Average dragon and baron takes
    //     */

    //     // set `onerror` handler
    //     xhr.onerror = (e) => console.log("error");

    //     // set `onload` handler
    //     xhr.onload = (e) => {
    //         const headers = e.target.getAllResponseHeaders();
    //         const jsonString = e.target.response;
    //         //console.log(`headers = ${headers}`);
    //         //console.log(`jsonString = ${jsonString}`);

    //         // update the UI by showing the joke
    //         const json = JSON.parse(jsonString);
    //         parseData(json);
    //         /*
    //         content.innerHTML = '';
    //         for (let value of json) {
    //             let p = document.createElement("p");
    //             p.innerHTML = `<b>${value.gameDuration}</b><i>${value.queueId}</i><hr>`;
    //             content.appendChild(p);
    //         }
    //         */

    //     }; // end xhr.onload

    //     // open the connection using the HTTP GET method
    //     xhr.open("GET", url);

    //     // 6. we could send request headers here if we wanted to
    //     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader

    //     // finally, send the request
    //     xhr.send();

    // }; // end onclick
    //#endregion
    }
}

function playerSearch() {
    //let content = document.querySelector("#content");
    //setupVariables();
    let summonerName = document.querySelector("#summonerName").value.toLowerCase();
    dataJS.setSummonerName(summonerName);
    let endIndex = 3;
    endIndex = document.querySelector("#games").value;
    let beginTime = 1605225600;
    // 2. Create an XHR object to download the web service
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/
    const xhr = new XMLHttpRequest();
    const apiKey = "RGAPI-37fad064-9b72-4ead-a57b-0d7c17635bfc";
    //https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Doublelift?api_key=RGAPI-YOUR-API-KEY
    const url = `https://people.rit.edu/kct2548/330/project-3/php/history_proxy.php?summoner=${summonerName}&apiKey=${apiKey}&endIndex=${endIndex}`;


    // my account id
    // ihBG1EIlGbon_KNR8HJ0J6lQM03qPILNpcJWK3_wlV5pSVc

    // test game id
    // 3665816766

    // time stamp for 11/13/2020 (third day of preseason)
    // 1605225600

    /*
    Who you beat and lose to the most
    Average dragon and baron takes
    */

    // set `onerror` handler
    xhr.onerror = (e) => console.log("error");

    // set `onload` handler
    xhr.onload = (e) => {
        const headers = e.target.getAllResponseHeaders();
        const jsonString = e.target.response;
        //console.log(`headers = ${headers}`);
        //console.log(`jsonString = ${jsonString}`);

        // update the UI by showing the joke
        const json = JSON.parse(jsonString);
        dataJS.parseData(json);
        console.log(json);

        /*
        content.innerHTML = '';
        for (let value of json) {
            let p = document.createElement("p");
            p.innerHTML = `<b>${value.gameDuration}</b><i>${value.queueId}</i><hr>`;
            content.appendChild(p);
        }
        */

        dataJS.updateLocalStorage();

    }; // end xhr.onload

    // open the connection using the HTTP GET method
    xhr.open("GET", url);

    // 6. we could send request headers here if we wanted to
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader

    // finally, send the request
    xhr.send();
}


export { init, playerSearch };// setStoredNames, summonerName, storedNames