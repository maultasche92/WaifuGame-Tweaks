// ==UserScript==
// @name         WaifuGame Home Tweaks
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/home*
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      1.0
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Home%20Tweaks.user.js
// @downloadURL  https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Home%20Tweaks.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        unsafeWindow
// ==/UserScript==
(function () {
    'use strict';
    document.querySelectorAll(".tapToOpenAction.card").forEach((card) => {
        $.getJSON('/json/am/' + card.dataset.amid, function (data) {
            var div = document.createElement("div");
            var stats = "";
            for (const [key, value] of Object.entries(data.special)) {
                var stat = key + ":" + value;
                if (["P", "C", "L"].indexOf(key) > -1) {
                    stat = "<b style='color:red'>" + stat + "</b>";
                }
                stats += stat + " ";
            }
            div.innerHTML = stats;
            card.appendChild(div)
        });
    })
})();