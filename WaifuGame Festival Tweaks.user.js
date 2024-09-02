// ==UserScript==
// @name         WaifuGame Festival Tweaks
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/festival*
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      1.0
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/blob/main/WaifuGame%20Festival%20Tweaks.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        unsafeWindow
// ==/UserScript==
(function () {
    'use strict';
    $.get("https://waifugame.com/profile").then((htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        unsafeWindow.showSuccessToast2("You are currently: " + doc.querySelector("h4").innerHTML);
    });
})();