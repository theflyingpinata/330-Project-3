import * as main from "./main.js";

const app = new Vue({
    el: '#app',
    data: {
        lastSearchedTitle: "Last Summoners Searched",
        lastSearched: [],
    },
    methods: {
        updateLocalStorage() {
            main.playerSearch();
            this.lastSearched = main.storedNames;
        },
        deleteLocalStorage() {
            localStorage.clear();
            localStorage.setItem("StoredSummoners");
        },
    },
    created() {
        if (JSON.parse(localStorage.getItem("storedSummoners"))  != undefined )
            this.lastSearched = JSON.parse(localStorage.getItem("storedSummoners"));
    },
});

export { app };