// ==UserScript==
// @name         WaifuGame MySponsored Tweaks
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/search?sponsored_by=372112
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      1.0
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20MySponsored%20Tweaks.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        unsafeWindow
// ==/UserScript==

(function () {
    'use strict';
    $.get(location.origin + '/raffles').then((homeHtml) => {
        const elMap = {};
        document.querySelectorAll(".card.card-style div").forEach((el) => { elMap[el.innerHTML] = el });
        const parser = new DOMParser();
        const doc = parser.parseFromString(homeHtml, 'text/html');
        doc.querySelectorAll("div.row.raffle-row h4").forEach((el) => {
            if (elMap[el.innerHTML]) {
                elMap[el.innerHTML].style.color = "red";
                elMap[el.innerHTML].classList.remove("color-white")
            }
        })
    });
})();