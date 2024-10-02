// ==UserScript==
// @name         WaifuGame Swiper Tweaks
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/swiper*
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      1.6
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Swiper%20Tweaks.user.js
// @downloadURL  https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Swiper%20Tweaks.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        unsafeWindow
// ==/UserScript==
(function () {
    'use strict';
    var charmId = "", swipingId = "", token = "", switchcount = 1;
    const originalConsoleLog = unsafeWindow.console.log;
    const lastEncounters = [];

    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            document.getElementById('nope').click();
            event.preventDefault();
        } else if (event.key === 'ArrowRight') {
            document.getElementById('love').click();
            event.preventDefault();
        } else if (event.key === 'ArrowUp') {
            document.getElementById('partyswitcher').click();
            event.preventDefault();
        } else if (event.key === "ArrowDown") {
            var cardname = document.querySelector(".tinder--card:not(.removed) .encounter-data .color-white").innerHTML;
            $.get("https://waifugame.com/hotel?sortBy=Lv&sortOrder=desc&rating=-999&rarity=-1&element=0&search=" + encodeURIComponent(cardname)).then((homeHtml) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(homeHtml, 'text/html');
                let counter = 0;

                doc.querySelectorAll('.hotelListing .actionShowHotelWaifu').forEach(el => { if (el.dataset.name === cardname) counter++ });
                document.querySelector(".encounter-data .color-white").parentElement.insertAdjacentHTML('beforeend', "<span> (" + counter + "x)</span>");
            });
            event.preventDefault();
        }
    });
    function getPartyName(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const selectElement = doc.getElementById('party');
        document.getElementById('partyswitcher').innerHTML = selectElement.querySelector("option[selected]").textContent.replace("(Active)", "")
    };
    function fetchTeams() {
        $.get(location.origin + '/home').then((htmlString) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
            token = doc.getElementsByName("_token")[0].value;

            doc.querySelectorAll("#party option").forEach((o) => {
                if (o.value.startsWith("f-") && o.innerHTML.toLowerCase().includes("charming")) {
                    if (o.innerHTML.includes("(Active)")) switchcount = 0;
                    charmId = o.value;
                }
                if (o.value.startsWith("f-") && o.innerHTML.toLowerCase().includes("swiping")) {
                    if (o.innerHTML.includes("(Active)")) switchcount = 1;
                    swipingId = o.value;
                }
            });
            if (!charmId || !swipingId) {
                showInfoModal("Error (WaifuGame Swiper Tweaks)", 'Please include "charming" in the name of one formation, and include "swiping" in name of another formation')
                return;
            }
            document.getElementById('partyswitcher').innerHTML = doc.getElementById('party').querySelector("option[selected]").textContent.replace("(Active)", "");
        });
    };
    function swiping() {
        if (swipingId) $.post(location.origin + '/formation/change', { "selected_formation": swipingId, "_token": token }).then(getPartyName).catch(fetchTeams);
    };
    function charming() {
        if (charmId) $.post(location.origin + '/formation/change', { "selected_formation": charmId, "_token": token }).then(getPartyName).catch(fetchTeams);
    };
    function switchteam() {
        switchcount = !switchcount; switchcount ? swiping() : charming()
    };
    function showLastEncounters() {
        let htmlString = "<ul>";

        lastEncounters.slice(0, 7).forEach((enc) => {
            htmlString += "<li><a href='#' onclick='showCardInfoMenuLookup(" + enc.cardid + ")'>" + enc.cardname + "</a></li>";
        });
        htmlString += "</ul>";

        showInfoModal("Last 7 Encounters", htmlString);
    }

    document.getElementsByClassName("tinder--buttons")[0].insertAdjacentHTML('afterbegin', `<button title="Arrow Keys Left/Right=Swiping, Up=Switch Team, Down=show stock of card" id="partyswitcher" style="text-overflow:ellipsis;overflow: hidden;white-space: nowrap;">...</button>`);
    document.querySelector("#swiperMenu .content hr").insertAdjacentHTML("afterend", '<a id="btnLastEncounters" href="#" class="btn font-14 shadow-l btn-full rounded-s font-600 btn-secondary text-center mb-2"><i class="fa fa-info-circle"></i> Show Last 7 Encounters</a>')
    document.getElementById('partyswitcher').addEventListener('click', switchteam);
    document.getElementById('btnLastEncounters').addEventListener('click', showLastEncounters);

    fetchTeams();

    // use the call of log, to get the exact moment, when the encounter got swiped
    unsafeWindow.console.log = function (message) {
        if (message
            && message.constructor === String
            // && message.classList.contains('tinder--card')
            // && message.querySelector("img.actionShowCard")
            && message.match(/Encounter\ (\d+)/)) {
            const encId = message.match(/Encounter\ (\d+)/)[1];
            const card = document.querySelector('[data-encounterid="' + encId + '"]')
            const cardid = card.querySelector("img.actionShowCard").dataset.cardid;
            const cardname = card.querySelector(".encounter-data .color-white").innerText;
            lastEncounters.unshift({ cardid, cardname });

            /*
            if (document.querySelector(".tinder--cards strong") && document.querySelector(".tinder--cards strong").innerText.includes("Just for you")
                && document.querySelectorAll("div.tinder--card:nth-child(2) .droptype_flag").length > 0) {
                document.querySelector(".btnCharm").style.visibility = "hidden";
                document.querySelector("#love").style.visibility = "hidden"
            } else {
                document.querySelector(".btnCharm").style.visibility = "visible";
                document.querySelector("#love").style.visibility = "visible"
            }
            */
        }

        originalConsoleLog.apply(unsafeWindow.console, arguments);
    };
})();