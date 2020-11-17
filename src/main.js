let summonerName;

function init() {
    document.querySelector("#searchBtn").onclick = (e) => {
        let content = document.querySelector("#content");
        summonerName = document.querySelector("#summonerName").value;

        // 2. Create an XHR object to download the web service
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/
        const xhr = new XMLHttpRequest();
        const apiKey = "RGAPI-0aba2c2c-ebb5-4ea1-a265-6ab0824fa7e4";
        //https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Doublelift?api_key=RGAPI-YOUR-API-KEY
        const url = `https://people.rit.edu/kct2548/330/project-3/history_proxy.php?summoner=${summonerName}&apiKey=${apiKey}`;


        let endIndex = 5;
        let beginTime = 1605225600;
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
    let allTimeeammates = {};
    let keys = [];
    let win = 0, lose = 0;

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
        if (match["teams"]["win"] == "Win") {
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
                        allTimeeammates[tempSumName] = 1;
                    }
                    else {
                        allTimeeammates[tempSumName]++;
                    }
                }
            }


            // opponent 
            else {

            }
        }



        // sort team mates //////////////////


        // testing content
        let p = document.createElement("p");
        p.innerHTML = `<b>Participant ID: ${summonerPID}</b><hr>`;
        content.appendChild(p);

    } // end of matches loop

    // sort teammates
    keys = Object.keys(allTimeeammates);
    keys.sort((a, b) => {
        let countA = allTimeeammates[a];
        let countB = allTimeeammates[b];
        return countB - countA;
    });

    for (let i = 0; i < 5; i++) {
        let p = document.createElement("p");
        p.innerHTML = `<b>${keys[i]}: ${allTimeeammates[keys[i]]}</b><br>`;
        content.appendChild(p);
    }

    let p = document.createElement("p");
    p.innerHTML = `<b>Wins: ${win}</b><br><b>Loses: ${lose}</b>`;
    content.appendChild(p);
}

export { init };