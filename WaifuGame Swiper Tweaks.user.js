// ==UserScript==
// @name         WaifuGame Swiper Tweaks
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/swiper*
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      1.2
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/blob/main/WaifuGame%20Swiper%20Tweaks.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        unsafeWindow
// ==/UserScript==
var charmId = "", swipingId = "", token = "", switchcount = 1;

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
        var cardname = document.querySelector(".encounter-data .color-white").innerHTML;
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

document.getElementsByClassName("tinder--buttons")[0].insertAdjacentHTML('afterbegin', `<button title="Arrow Keys Left/Right=Swiping, Up=Switch Team, Down=show stock of card" id="partyswitcher" style="text-overflow:ellipsis;overflow: hidden;white-space: nowrap;">...</button>`);
document.getElementById('partyswitcher').addEventListener('click', switchteam);

window.setTimeout(() => {
    fetchTeams();
    window.setInterval(() => {
        if (document.querySelector(".tinder--cards strong").innerText.includes("Just for you")
            && document.querySelectorAll("div.tinder--card:nth-child(2) .droptype_flag").length > 0) {
            document.querySelector(".btnCharm").style.visibility = "hidden";
            document.querySelector("#love").style.visibility = "hidden"
        } else {
            document.querySelector(".btnCharm").style.visibility = "visible";
            document.querySelector("#love").style.visibility = "visible"
        }
    }, 1)
}, 1000)