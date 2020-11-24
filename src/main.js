import * as charting from "./charting.js";

let summonerName = "theflyingpinata";
let allTimeeammates = {};
let keys = [];
let win = 0, lose = 0;

function setupVariables() {
    summonerName = "theflyingpinata";
    allTimeeammates = {};
    keys = [];
    win = 0, lose = 0;
}
function init() {
    setupVariables();

    document.querySelector("#searchBtn").onclick = (e) => {
        //let content = document.querySelector("#content");
        setupVariables();
        summonerName = document.querySelector("#summonerName").value;

        let endIndex = 3;
        endIndex = document.querySelector("#games").value;
        let beginTime = 1605225600;
        // 2. Create an XHR object to download the web service
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/
        const xhr = new XMLHttpRequest();
        const apiKey = "RGAPI-0101d276-5c25-4b6c-8f70-9382a0e1498d";
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
            /*
            content.innerHTML = '';
            for (let value of json) {
                let p = document.createElement("p");
                p.innerHTML = `<b>${value.gameDuration}</b><i>${value.queueId}</i><hr>`;
                content.appendChild(p);
            }
            */

        }; // end xhr.onload

        // open the connection using the HTTP GET method
        xhr.open("GET", url);

        // 6. we could send request headers here if we wanted to
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader

        // finally, send the request
        xhr.send();

    }; // end onclick

}

function parseData(json) {
    win = 0;
    lose = 0;
    keys = [];
    allTimeeammates = {};
    let content = document.querySelector("#content");
    content.innerHTML = '';
    // loop through matches
    for (let match of json) {
        let summonerPID;
        let summonerTeam, teamIndex;
        // loop through the participantIdentities to find the summoner's participantId
        for (let i = 0; i < 10; i++) {
            if (match["participantIdentities"][i]["player"]["summonerName"] == summonerName) {
                summonerPID = match["participantIdentities"][i]["participantId"];
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
            win++;
        }
        else {
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
        console.log(image.src);
        image.onload = function () {
            images[i] = image;
            imagesLoaded++;
            if (imagesLoaded == 5) {
                console.log(images);
                charting.basicBarGraph(400, 1000,"# of Games with Summoner on Your Team", keys.slice(0, 5), "# of Games", data, images);
            }
        };
    }

}

export { init };