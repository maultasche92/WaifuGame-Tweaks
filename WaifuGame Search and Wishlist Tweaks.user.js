// ==UserScript==
// @name         WaifuGame Search and Wishlist Tweaks
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/search*
// @match        https://waifugame.com/profile/wishlist*
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      1.1
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Search%20and%20Wishlist%20Tweaks.user.js
// @downloadURL  https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Search%20and%20Wishlist%20Tweaks.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        unsafeWindow
// ==/UserScript==
(function () {
    'use strict';
    function showMetadata() {
        window.setInterval(() => {
            var timeout = 0;
            document.querySelectorAll("div[data-cardid]").forEach((card) => {
                if (card.lastChild.className !== "custominfo") {
                    timeout += 250;
                    var div = document.createElement("div");
                    div.classList.add("custominfo");
                    card.appendChild(div);
                    window.setTimeout(() => {
                        $.getJSON('/json/card/' + card.dataset.cardid, function (data) {
                            var trait = data.Trait;
                            if (["Perceptive", "Lucky", "Charismatic"].indexOf(data.Trait) > -1) {
                                trait = "<b style='color: red'>" + trait + "</b>";
                            }
                            var stats = data.Element + ' | ' + data.Nature + ' | ' + trait;
                            div.innerHTML = stats;
                        }).fail(() => { card.removeChild(div) });
                    }, timeout);
                }
            })
        }, 500)
    }
    function showStock() {
        var timeout = 0;
        (document.querySelector("#wishedCards") || document.querySelector("#searchResults")).querySelectorAll(".card:not(.stock)").forEach((card) => {
            timeout += 1000;

            window.setTimeout(() => {
                var name = card.querySelector("div").innerText;

                $.get("https://waifugame.com/hotel?sortBy=Lv&sortOrder=desc&rating=-999&rarity=-1&element=0&search=" + encodeURIComponent(name)).then((homeHtml) => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(homeHtml, 'text/html');
                    let counter = 0;
    
                    doc.querySelectorAll('.hotelListing .actionShowHotelWaifu').forEach(el => { if (el.dataset.name === name) counter++ });
                    card.querySelector("div").insertAdjacentHTML('beforeend', "<span> (" + counter + "x)</span>");
                });
                card.classList.add("stock");
            }, timeout);

        })
    }
    document.querySelector("#wishedCards")?.insertAdjacentHTML('beforebegin', "<button id='showMetadata' style='margin: 10px'>Show Metadata</button>");
    document.querySelector("form.content")?.insertAdjacentHTML('afterend', "<button id='showMetadata' style='margin: 10px'>Show Metadata</button>");

    document.querySelector("#wishedCards")?.insertAdjacentHTML('beforebegin', "<button id='showStock' style='margin: 10px'>Show Stock</button>");
    document.querySelector("form.content")?.insertAdjacentHTML('afterend', "<button id='showStock' style='margin: 10px'>Show Stock</button>");

    document.getElementById('showMetadata').addEventListener('click', showMetadata);
    document.getElementById('showStock').addEventListener('click', showStock);
})();
