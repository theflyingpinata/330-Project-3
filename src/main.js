let summonerName;
let allTimeeammates = {};
let keys = [];
let win = 0, lose = 0;

function init() {
    document.querySelector("#searchBtn").onclick = (e) => {
        let content = document.querySelector("#content");
        summonerName = document.querySelector("#summonerName").value;

        let endIndex = 3;
        let beginTime = 1605225600;
        // 2. Create an XHR object to download the web service
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/
        const xhr = new XMLHttpRequest();
        const apiKey = "RGAPI-0aba2c2c-ebb5-4ea1-a265-6ab0824fa7e4";
        //https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Doublelift?api_key=RGAPI-YOUR-API-KEY
        const url = `https://people.rit.edu/kct2548/330/project-3/history_proxy.php?summoner=${summonerName}&apiKey=${apiKey}&endIndex=${endIndex}`;


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


    // Wins and loses
    let p = document.createElement("p");
    p.innerHTML = `<b>Wins: ${win}</b><br><b>Loses: ${lose}</b>`;
    content.appendChild(p);
    
    initChart();
}

function initChart(){

    // chart
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [keys[0],keys[1],keys[2],keys[3],keys[4]],
            datasets: [{
                label: '# of Games',
                data: [allTimeeammates[keys[0]], allTimeeammates[keys[1]], allTimeeammates[keys[2]], allTimeeammates[keys[3]], allTimeeammates[keys[4]]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

export { init };