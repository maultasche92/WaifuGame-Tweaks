// ==UserScript==
// @name         WaifuGame Card Portfolio Tweaks
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/cards
// @match        https://waifugame.com/cards?*
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      1.0
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/blob/main/WaifuGame%20Card%20Portfolio%20Tweaks.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        none
// ==/UserScript==
var cardIds = {};
window.setInterval(() => {
    var cardId = document.querySelector("#cardActionBlock #cardID").innerHTML

    if (!cardIds[cardId]) {
        cardIds[cardId] = true;
        const cardname = document.querySelector("#cardActionBlock #cardName").innerHTML;
        $.get("https://waifugame.com/hotel?sortBy=Lv&sortOrder=desc&rating=-999&rarity=-1&element=0&search=" + encodeURIComponent(cardname)).then((homeHtml) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(homeHtml, 'text/html');
            let counter = 0;

            doc.querySelectorAll('.hotelListing .actionShowHotelWaifu').forEach(el => { if (el.dataset.name === cardname) counter++ });
            document.querySelector("#cardActionBlock #cardName").insertAdjacentHTML('beforeend', "<span> (" + counter + "x)</span>");
        });
    }
}, 500);
function showStock() {
    var timeout = 0;
    document.querySelectorAll(".selectCard:not(.stock)").forEach((card) => {
        timeout += 1000;

        window.setTimeout(() => {
            var name = card.querySelector("span").innerText;

            $.get("https://waifugame.com/hotel?sortBy=Lv&sortOrder=desc&rating=-999&rarity=-1&element=0&search=" + encodeURIComponent(name)).then((homeHtml) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(homeHtml, 'text/html');
                card.querySelector("span").insertAdjacentHTML('beforeend', "<span> (" + doc.querySelectorAll('.hotelListing').length + "x)</span>");
            });
            card.classList.add("stock");
        }, timeout);

    })
}
document.querySelector("#cardActionBlock")?.insertAdjacentHTML('afterend', "<button id='showStock' style='margin: 10px'>Show Stock</button>");
document.getElementById('showStock').addEventListener('click', showStock);

document.querySelectorAll(".selectCard").forEach((el) => {
    el.addEventListener("contextmenu", (e) => {
        showCardInfoMenuLookup(JSON.parse(el.dataset.card).id)
        e.preventDefault();
    })
})