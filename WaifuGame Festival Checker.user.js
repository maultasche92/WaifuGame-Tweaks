// ==UserScript==
// @name         WaifuGame Festival Checker
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/*
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      1.01
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/blob/main/WaifuGame%20Festival%20Checker.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        none
// ==/UserScript==

// Configurable part begins
// Add the item name (exact name) into the brackets, surrounded by quotes and separated by comma
var festivalChecks = ["Tier 3 Day-Pass"];
// Configurable part ends


(function () {
    'use strict';
    $.get(location.origin + '/festival').then((htmlString) => {
        const items = [];
        let match;
        const regex = /showInfoModal\(\"(.*?)\", itemDescription\);/g;

        while ((match = regex.exec(htmlString)) !== null) {
            items.push(match[1]);
        }

        var match2 = null;
        items.forEach((item) => {
            if (!match2 && festivalChecks.indexOf(item) > -1) {
                match2 = item;
                document.querySelector("#menu-main a[href$=festival]").insertAdjacentHTML("beforeend", '<span class="badge bg-highlight font-10">!!!</span>');
            }
        });
    });
})();