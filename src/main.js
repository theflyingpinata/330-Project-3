import * as charting from "./charting.js";

let summonerName = "theflyingpinata";
let storedNames = [];
let allTimeeammates = {};
let allChamps = [];
let keys = [];
let win = 0, lose = 0;

function setupVariables() {
    summonerName = "theflyingpinata";
    allTimeeammates = {};
    keys = [];
    win = 0, lose = 0;
    //names = storedNames;
}

function init() {
    setupVariables();

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

function playerSearch() {
    //let content = document.querySelector("#content");
    setupVariables();
    summonerName = document.querySelector("#summonerName").value;

    let endIndex = 3;
    endIndex = document.querySelector("#games").value;
    let beginTime = 1605225600;
    // 2. Create an XHR object to download the web service
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/
    const xhr = new XMLHttpRequest();
    const apiKey = "RGAPI-fb240766-1046-4570-b23e-7e3b2e57ac81";
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
        parseData(json);
        console.log(json);

        /*
        content.innerHTML = '';
        for (let value of json) {
            let p = document.createElement("p");
            p.innerHTML = `<b>${value.gameDuration}</b><i>${value.queueId}</i><hr>`;
            content.appendChild(p);
        }
        */

        // Only update local storage if data loaded in correctly
        if (!storedNames)
            storedNames = [];

        if (!storedNames.includes(summonerName))
            storedNames.push(summonerName);
        else {
            storedNames.splice(storedNames.indexOf(summonerName), 1);
            storedNames.push(summonerName);
        }

        console.log("storedNames: " + storedNames);
        localStorage.setItem("storedSummoners", JSON.stringify(storedNames));

    }; // end xhr.onload

    // open the connection using the HTTP GET method
    xhr.open("GET", url);

    // 6. we could send request headers here if we wanted to
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader

    // finally, send the request
    xhr.send();

    //getChampName(selectedChampID);
}

const parseData = async(json) => {
    win = 0;
    lose = 0;
    keys = [];
    allChamps = [];
    allTimeeammates = {};
    let winloss = [];
    let content = document.querySelector("#content");
    content.innerHTML = '';
    // loop through matches
    for (let match of json) {
        let summonerPID;
        let summonerTeam, teamIndex;
        let selectedChampID = 0;
        // loop through the participantIdentities to find the summoner's participantId
        for (let i = 0; i < 10; i++) {
            if (match["participantIdentities"][i]["player"]["summonerName"] == summonerName) {
                summonerPID = match["participantIdentities"][i]["participantId"];
                selectedChampID = match["participants"][i]["championId"];
                await getChampName(selectedChampID);
                break;
            }
        }

        // Set the summoner's team. Blue side is 100, red side is 200
        if (summonerPID <= 5) {
            summonerTeam = 100;
            teamIndex = 0;
        }
        else {
            summonerTeam = 200;
            teamIndex = 1;
        }

        // Team stats
        if (match["teams"][teamIndex]["win"] == "Win") {
            winloss.push("Win");
            win++;
        }
        else {
            winloss.push("Loss");
            lose++;
        }

        // individual stats
        for (let i = 0; i < 10; i++) {
            // teammates
            if (match["participants"][i]["teamId"] == summonerTeam) {
                let tempSumName = match["participantIdentities"][i]["player"]["summonerName"];
                if (tempSumName != summonerName) {
                    if (allTimeeammates[tempSumName] == undefined) {
                        allTimeeammates[tempSumName] = [];
                        allTimeeammates[tempSumName]["count"] = 1;
                        allTimeeammates[tempSumName]["profileIcon"] = match["participantIdentities"][i]["player"]["profileIcon"];
                    }
                    else {
                        allTimeeammates[tempSumName]["count"]++;
                    }
                }
            }

            // opponent 
            else {

            }
        }

        // sort team mates //////////////////

        /*
                // testing content
                let p = document.createElement("p");
                p.innerHTML = `<b>Participant ID: ${summonerPID}</b><hr>`;
                content.appendChild(p);
                */

    } // end of matches loop

    // sort teammates
    keys = Object.keys(allTimeeammates);
    keys.sort((a, b) => {
        let countA = allTimeeammates[a]["count"];
        let countB = allTimeeammates[b]["count"];
        return countB - countA;
    });

    let summonerHeader = document.createElement("p");
    summonerHeader.innerHTML = `<h2> <u>${summonerName} </u> </h2>`;
    content.appendChild(summonerHeader);

    let teammatesP = document.createElement("p");
    teammatesP.innerHTML = `<b> <u> Top 5 Teammates In Past ${document.querySelector("#games").value} Games</u> </b> <br>`;
    content.appendChild(teammatesP);

    let teammatesList = document.createElement("ol");
    for (let i = 0; i < 5; i++) {
        let p = document.createElement("p");
        p.innerHTML = `<li><b>${keys[i]}: ${allTimeeammates[keys[i]]["count"]}</b></li>`;
        content.appendChild(p);
    }
    teammatesList.append("ol");


    // Wins and loses
    let p = document.createElement("p");
    p.innerHTML = `<b> <u> Win/Loss Ratio </u> </b> <br>`;
    p.innerHTML += `<b> Wins: ${win}</b><br><b>Loses: ${lose} </b>`;
    content.appendChild(p);

    // Wins and loses with champ info
    let champWinsLoss = document.createElement("p");
    champWinsLoss.innerHTML = `<b> <u> Champs Selected </u> </b> <br>`;
    console.log(allChamps);
    for (let i = 0; i < allChamps.length; i++) {
        champWinsLoss.innerHTML += `<b> Game ${(i + 1)}: ${allChamps[i]} | Result: ${winloss[i]} <b> <br>`;
    }
    content.appendChild(champWinsLoss);

    //allChamps = [];
    initChart();
}

function initChart() {

    //let ctx = document.querySelector("canvas").getContext('2d');
    // chart
    let data = [];
    for (let i = 0; i < 5; i++) {
        data.push(allTimeeammates[keys[i]]["count"]);
    }

    // profile icon example
    // http://ddragon.leagueoflegends.com/cdn/10.23.1/img/profileicon/588.png

    let images = [];
    let imagesLoaded = 0;
    for (let i = 0; i < 5; i++) {
        let image = new Image(100, 100);
        image.src = `http://ddragon.leagueoflegends.com/cdn/10.23.1/img/profileicon/${allTimeeammates[keys[i]]["profileIcon"]}.png`;
        //console.log(image.src);
        image.onload = function () {
            images[i] = image;
            imagesLoaded++;
            if (imagesLoaded == 5) {
                //console.log(images);
                charting.basicBarGraph(400, 1000, "# of Games with Summoner on Your Team", keys.slice(0, 5), "# of Games", data, images);
            }
        };
    }

}

function setStoredNames(item) {
    storedNames = item;
}

// Reference: https://gist.github.com/4dams/1808b051c4a3419e96f20ec4d19d2124
let getChampName = async (champID) => {
    // const xhr = new XMLHttpRequest();
    // const champJson = "http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/champion.json";

    // xhr.onerror = (e) => console.log("error");

    // xhr.onload = (e) => {
    //     const headers = e.target.getAllResponseHeaders();
    //     const jsonString = e.target.response;
    //     //console.log(`headers = ${headers}`);
    //     //console.log(`jsonString = ${jsonString}`);

    //     // update the UI by showing the joke
    //     const json = JSON.parse(jsonString);
    //     //parseData(json);
    //     let champList = json.data;

    //     //console.log(champList);

    //     for (let i in champList) {
    //         if (champList[i].key == champID) {
    //             //console.log(champList[i].name);
    //             allChamps.push(champList[i].name);
    //             console.log(allChamps);
    //         }
    //         //console.log(champList[i].id + " | " + champList[i].key);
    //     }
    // };

    // xhr.open("GET", champJson);

    // xhr.send();

    try {
        const response = await fetch("http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/champion.json");
        const data = await response.json();
        //console.log(data);

        let champList = data.data;
        for (let i in champList) {
            if (champList[i].key == champID) {
                //console.log(champList[i].name);
                allChamps.push(champList[i].name);
                console.log(allChamps);
            }
        }

    } catch {
        console.log(err);
    }
}

export { init, setStoredNames, playerSearch, summonerName, storedNames };