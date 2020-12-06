import * as data from "./data.js";
import * as main from "./main.js";

const app = new Vue({
    el: '#app',
    data: {
        lastSearchedTitle: "Last Summoners Searched",
        winsandlossesTitle: "Champs Selected",
        gameRecords: [],
        lastSearched: [],
    },
    methods: {
        updateLocalStorage() {
            main.playerSearch();
            //this.gameRecords = data.gameRecords;
            this.lastSearched = data.storedNames;
        },
        deleteLocalStorage() {
            localStorage.clear();
            lastSearched.clear();
            localStorage.setItem("StoredSummoners");
        },
    },
    mounted: function() {
        //main.playerSearch();
        //this.lastSearchedTitle = "test";
        this.lastSearched = JSON.parse(localStorage.getItem("storedSummoners"));
    },
});

export { app };