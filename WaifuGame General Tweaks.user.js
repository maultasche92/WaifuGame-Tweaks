// ==UserScript==
// @name         WaifuGame General Tweaks
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/*
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      1.0
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20General%20Tweaks.user.js
// @downloadURL  https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20General%20Tweaks.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        unsafeWindow
// ==/UserScript==
(function () {
    'use strict';

    let lastCardName;
    setInterval(() => {
        const cardname = document.querySelector("#cardInfo .insertWaifuName").innerText;
        if (lastCardName !== cardname) {
            $.get("https://waifugame.com/hotel?sortBy=Lv&sortOrder=desc&rating=-999&rarity=-1&element=0&search=" + encodeURIComponent(cardname)).then((homeHtml) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(homeHtml, 'text/html');
                let counter = 0;

                doc.querySelectorAll('.hotelListing .actionShowHotelWaifu').forEach(el => { if (el.dataset.name === cardname) counter++ });
                if (document.querySelector("#cardInfo .insertWaifuName").innerText === cardname)
                    document.querySelector("#cardInfo .insertWaifuName").insertAdjacentHTML('beforeend', "<span> (" + counter + "x)</span>");
            });
        }
        lastCardName = cardname;
    }, 500);
})();