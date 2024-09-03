// ==UserScript==
// @name         WaifuGame Hotel Tweaks
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/hotel*
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      1.0
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Hotel%20Tweaks.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        unsafeWindow
// ==/UserScript==
(function () {
    'use strict';
    document.querySelectorAll(".actionShowHotelWaifu").forEach((el) => {
        el.addEventListener("contextmenu", (e) => {
            unsafeWindow.showCardInfoMenuLookup(el.dataset.cardid)
            e.preventDefault();
        })
    })
})();