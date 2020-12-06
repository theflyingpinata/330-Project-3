import * as main from "./main.js";
import * as vuecomponements from "./vueComponents.js";
import * as vue from "./vue.js";
import * as data from "./data.js";

window.onload = () => {
    // load fonts, sounds, whatever ...
    // Check if local storage is supported
    // Ref: https://www.w3schools.com/html/html5_webstorage.asp

    main.init();
    vuecomponements.wrapper();
    vue.app;

    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        data.setStoredNames(JSON.parse(localStorage.getItem("storedSummoners")));

        console.log("local storage detected");

        console.log("Stored Summoners: " + JSON.parse(localStorage.getItem("storedSummoners")));
        console.log(main.storedNames);

      } else {
        // Sorry! No Web Storage support..
        console.log("no web support for local storage");
      }
};