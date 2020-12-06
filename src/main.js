import * as charting from "./charting.js";

let summonerName = "theflyingpinata";
let storedNames = [];
let allTimeeammates = {};
let allChamps = [];
let keys = [];
let win = 0, lose = 0;
let favoriteRunes = [];
let favoriteAbilities = [];
let favoriteSpells = {};

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
    const apiKey = "RGAPI-7a763ff7-81e6-42a2-b1e5-fee6f0082a73";
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
}

const parseData = async (json) => {
    win = 0;
    lose = 0;
    keys = [];
    allChamps = [];
    allTimeeammates = {};
    let winloss = [];
    let timestamps = [];
    let content = document.querySelector("#content");
    let favorites = document.querySelector("#favorites");
    let participantIndex;
    content.innerHTML = '';
    favorites.innerHTML = '';
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
                participantIndex = i;
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

        // Push timestamps of games to display
        timestamps.push(match["gameCreation"]);

        // Keep track of spells equipped

        await getSpellName(match["participants"][participantIndex]["spell1Id"]);
        await getSpellName(match["participants"][participantIndex]["spell2Id"]);

        // if (!favoriteSpells[match["participants"][participantIndex]["spell1Id"]])
        //     favoriteSpells[match["participants"][participantIndex]["spell1Id"]] = 1;
        // else
        //     favoriteSpells[match["participants"][participantIndex]["spell1Id"]] += 1;

        // if (!favoriteSpells[match["participants"][participantIndex]["spell2Id"]])
        //     favoriteSpells[match["participants"][participantIndex]["spell2Id"]] = 1;
        // else
        //     favoriteSpells[match["participants"][participantIndex]["spell2Id"]] += 1;


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
    //console.log(allChamps);
    for (let i = 0; i < allChamps.length; i++) {
        champWinsLoss.innerHTML += `<b> Game ${(i + 1)} (${new Date(timestamps[i]).toTimeString()}): ${allChamps[i]} | Result: ${winloss[i]} <b> <br>`;
    }
    content.appendChild(champWinsLoss);

    // Favorites info

    let favTitle = document.createElement("div");
    favTitle.innerHTML = `<h2> Favorites </h2>`;
    favorites.appendChild(favTitle);

    //#region SPELL FAVORITES
    let sortedSpells = sortByValue(favoriteSpells);

    let favSpells = document.createElement("p");
    favSpells.innerHTML = `<h3> Spells </h3>`;
    let countSpells = 0;

    sortedSpells.reverse();

    for (let i = 0; i < sortedSpells.length; i++) {
        favSpells.innerHTML += `<b> ${sortedSpells[i][0]} | ${sortedSpells[i][1]} Games <b> <br>`;

        countSpells++;
        if (countSpells >= 3)
            break;
    }
    favorites.appendChild(favSpells);
    //#endregion

    //#region CHAMPION FAVORITES
    let champFreq = {};

    for (let i = 0; i < allChamps.length; i++) {

        if (!champFreq[allChamps[i]])
            champFreq[allChamps[i]] = 1
        else
            champFreq[allChamps[i]] += 1;
    }

    let sortedChamps = sortByValue(champFreq);

    let favChamps = document.createElement("p");
    let countChamps = 0;
    favChamps.innerHTML = `<h3> Champions </h3>`;

    sortedChamps.reverse();

    for (let i = 0; i < sortedChamps.length; i++) {
        favChamps.innerHTML += `<b> ${sortedChamps[i][0]} | ${sortedChamps[i][1]} Games <b> <br>`;

        countChamps++;
        if (countChamps >= 3)
            break;
    }
    favorites.appendChild(favChamps);
    //#endregion

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
    try {
        const response = await fetch("http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/champion.json");
        const data = await response.json();
        //console.log(data);

        let champList = data.data;
        for (let i in champList) {
            if (champList[i].key == champID) {
                //console.log(champList[i].name);
                allChamps.push(champList[i].name);
                //console.log(allChamps);
            }
        }

    } catch {
        console.log(err);
    }
}

let getSpellName = async (spellID) => {
    try {
        const response = await fetch("http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/summoner.json");
        const data = await response.json();
        //console.log(data);

        let spellList = data.data;
        for (let i in spellList) {
            if (spellList[i].key == spellID) {
                if (!favoriteSpells[spellList[i].name])
                    favoriteSpells[spellList[i].name] = 1;
                else
                    favoriteSpells[spellList[i].name] += 1;
            }
        }

        console.log(favoriteSpells);

    } catch {
        console.log(err);
    }
}

// Reference: https://stackoverflow.com/questions/1069666/sorting-object-property-by-values 
function sortByValue(objectList) {
    var sortable = [];
    for (var value in objectList) {
        sortable.push([value, objectList[value]]);
    }

    sortable.sort(function (a, b) {
        return a[1] - b[1];
    });

    return sortable;
}

export { init, setStoredNames, playerSearch, summonerName, storedNames };