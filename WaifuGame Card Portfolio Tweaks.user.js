// ==UserScript==
// @name         WaifuGame Card Portfolio Tweaks
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/cards
// @match        https://waifugame.com/cards?*
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      1.5
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Card%20Portfolio%20Tweaks.user.js
// @downloadURL  https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Card%20Portfolio%20Tweaks.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
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
                if (document.querySelector("#cardActionBlock #cardName").innerText === cardname)
                    document.querySelector("#cardActionBlock #cardName").insertAdjacentHTML('beforeend', "<span> (" + counter + "x)</span>");
            });
        }
    }, 500);
    function showStock() {
        var timeout = 0;
        document.querySelectorAll(".selectCard:not(.stock)").forEach((card) => {
            timeout += 1000;

            window.setTimeout(() => {
                var name = card.querySelector("span").innerText.trim();

                $.get("https://waifugame.com/hotel?sortBy=Lv&sortOrder=desc&rating=-999&rarity=-1&element=0&search=" + encodeURIComponent(name)).then((homeHtml) => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(homeHtml, 'text/html');
                    let counter = 0;

                    doc.querySelectorAll('.hotelListing .actionShowHotelWaifu').forEach(el => { if (el.dataset.name === name) counter++ });
                    card.querySelector("span").insertAdjacentHTML('beforeend', "<span> (" + counter + "x)</span>");
                });
                card.classList.add("stock");
            }, timeout);
        })
    }
    function selectAll() {
        if (!multiSelectActive) toggleMulti.click();
        document.querySelectorAll("img[data-src]").forEach(img => img.click());
    }
    document.querySelector("#cardActionBlock")?.insertAdjacentHTML('afterend', "<button id='showStock' style='margin: 10px'>Show Stock</button>");
    document.getElementById('showStock').addEventListener('click', showStock);
    document.querySelector("#cardActionBlock")?.insertAdjacentHTML('afterend', "<button id='selectAllCards' style='margin: 10px'>Select all</button>");
    document.getElementById('selectAllCard').addEventListener('click', selectAll);

    document.querySelectorAll(".selectCard").forEach((el) => {
        el.addEventListener("contextmenu", (e) => {
            showCardInfoMenuLookup(JSON.parse(el.dataset.card).id)
            e.preventDefault();
        })
    });

    // let sum, max;
    // document.querySelectorAll("#storageBoxSwitcher option").forEach((o) => {
    //     let text = o.innerText;
    //     if (text.match(/Trade Portfolio\ \—\ (\d+)\/(\d+)/)) {
    //         sum = parseInt(text.match(/Trade Portfolio\ \—\ (\d+)\/(\d+)/)[1]);
    //         max = parseInt(text.match(/Trade Portfolio\ \—\ (\d+)\/(\d+)/)[2]);
    //     } else if (text.match(/Storage Box\ \d+\ \—\ (\d+)/)) {
    //         sum += parseInt(text.match(/Storage Box\ \d+\ \—\ (\d+)/)[1]);
    //     }
    // });
    // if (sum >= max) {
    //     showInfoModal("Full storage", "Your card storage is full!<br>This means, you are now in risk to lose cards!<br>Please be aware, that the storage boxes are not additional space.");
    // }
})();
