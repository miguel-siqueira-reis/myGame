import Overwolrd from "./Overworld.js";

(function() {
    const wolrd = new Overwolrd({
        el: document.querySelector(".game")
    })

    wolrd.init();
})()