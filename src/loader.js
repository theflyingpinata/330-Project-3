import * as main from "./main.js";
import * as vue from "./vue.js";

window.onload = () => {
    // load fonts, sounds, whatever ...
    // Check if local storage is supported
    // Ref: https://www.w3schools.com/html/html5_webstorage.asp

    vue.app;
    main.init();

    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        main.setStoredNames(JSON.parse(localStorage.getItem("storedSummoners")));

        console.log("local storage detected");

        console.log("Stored Summoners: " + JSON.parse(localStorage.getItem("storedSummoners")));

      } else {
        // Sorry! No Web Storage support..
        console.log("no web support for local storage");
      }
};