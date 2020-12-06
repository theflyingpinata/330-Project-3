let championJSON, spellJSON, itemJSON;


function init() {

    championJSON = getJSONData("champion");

}

let getJSONData = async (value) => {
    try {
        const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/${value}.json`);
        const data = await response.json();
        return data.data;

    } catch {
        console.log(err);
        return null;
    }
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

export { init, getChampName, getSpellName };