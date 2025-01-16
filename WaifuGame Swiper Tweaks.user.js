// ==UserScript==
// @name         WaifuGame Swiper Tweaks
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/swiper*
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      2.4
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Swiper%20Tweaks.user.js
// @downloadURL  https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Swiper%20Tweaks.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// ==/UserScript==
(function () {
    'use strict';
    var charmId = "", swipingId = "", token = "", switchcount = 1, lastTime = 0, toId;
    const originalConsoleLog = unsafeWindow.console.log;
    const lastEncounters = {
        Store: {
            _limit: 99,
            addEncounterCard: (EncounterID, card) => {
                var queue = GM_getValue('queue', []);
                queue.unshift({ EncounterID: EncounterID, card: card });
                while (queue.length > lastEncounters.Store._limit)
                    queue.pop();
                GM_setValue('queue', queue);
                lastEncounters.renderEncounterCard(card);
            },
            getQueue: () => {
                return GM_getValue('queue', []);
            }
        },
        setupPreloader() {
            const container = $('#page .tinder--cards').get(0);
            container.addEventListener('load', function (event) {
                if (!$(event.target).hasClass('img-fluid actionShowCard'))
                    return;
                if (event.target.src) {
                    const urlSmall = String(event.target.src).replace(/@[0-9]X([.][^/]+)$/, '$1');
                    console.log('>>>> PRELOADING ', urlSmall, ' because of ', event.target.src);
                    const img = new Image();
                    img.src = urlSmall;
                }
            }, true);
        },
        setup() {
            const cc = lastEncounters.getContainer();
            var list = lastEncounters.Store.getQueue();
            while (list.length)
                cc.append(lastEncounters.cardHTML(list.shift().card));
            lastEncounters.setupPreloader();
        },
        getContainer() {
            if ($('#wgssc-container').length == 0) {
                const c = $('.page-content');
                const c2 = c.parent().parent();
                GM_addStyle(`
                    @media (min-width: 840px) {
                        #wgssc-container-outer {
                            margin-left: 280px;
                            /*max-width: var(--maxwidth);*/
                        }
                    }
                    #wgssc-container-outer {
                        overflow-y: scroll;
                        overflow-x: visible;
                        z-index: 94; /* below .tinder--buttons */
                        position: absolute;
                        width: 100px;
                        height: 93vh;
                        top: 0px;
                        left:0px;
                        margin-top:63px;
                        padding-top: 40px;
                    }
                    #wgssc-container-outer::-webkit-scrollbar {
                        display: none;
                    }
                    #wgssc-container-outer {
                        -ms-overflow-style: none;  /* IE and Edge */
                        scrollbar-width: none;  /* Firefox */
                    }
                    #wgssc-container .wgssc-mini-card {
                        display: block;
                        margin: 0 10px 10px;
                        padding: 0;
                        position: relative;
                    }
                    #wgssc-container .wgssc-mini-card .card-img-container {
                        width: 80px;
                        overflow: hidden;
                    }
                `);
                c2.append('<div id="wgssc-container-outer"><div id="wgssc-container" ></div></div>');
            }
            return $('#wgssc-container');
        },
        cardHTML(card) {
            const imgwidth = 200;
            const imgheight = 300;
            const imgsrc = String(card.image).replace(/@[0-9]X([.][^/]+)$/, '$1');
            return `
                <a onclick="showCardInfoMenuLookup($(this).data('cardid')); return false;" title="${HTML(card.name)}" href="#" class="actionShowCard wgssc-mini-card" data-cardid="${HTML(card.CardID)}">
                    <div class="card-img-container rounded-s ${HTML(card.rarityglow)}">
                        <img width="${HTML(imgwidth)}" height="${HTML(imgheight)}" data-rating="${HTML(card.rating)}" src="${HTML(imgsrc)}" style="max-width: 80px; max-height: 120px; height: auto; display: block;">
                    </div>
                </a>`;
        },
        renderEncounterCard(card) {
            const cc = lastEncounters.getContainer();
            cc.prepend(lastEncounters.cardHTML(card));
            cc.children().first().css({ opacity: 0, 'max-height': 0 });
            cc.children().first().animate({ opacity: 1, 'max-height': '240px' });
        },
        encounterExtractRarityGlow(Card) {
            const name = Card.attr('class');
            const re = /\bglow-[0-9]+\b/;
            if (name.match(re))
                return name.match(re)[0];
        }
    };

    function HTML(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, function (m) { return map[m]; });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            document.getElementById('nope').click();
            event.preventDefault();
        } else if (event.key === 'ArrowRight') {
            if ((Date.now() - lastTime) < 300) {
                clearTimeout(toId);
                lastTime = 0;
                $('.btnCharm').click();
            } else {
                lastTime = Date.now();
                toId = setTimeout(() => {
                    document.getElementById('love').click();
                }, 300);
            }
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
                document.querySelector(".tinder--card:not(.removed) .encounter-data .color-white").parentElement.insertAdjacentHTML('beforeend', "<span> (" + counter + "x)</span>");
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

    fetchTeams();
    lastEncounters.setup();

    // use the call of log, to get the exact moment, when the encounter got swiped
    unsafeWindow.console.log = function (message) {
        if (message
            && message.constructor === String
            // && message.classList.contains('tinder--card')
            // && message.querySelector("img.actionShowCard")
            && message.match(/Encounter\ (\d+)/)) {
            const encId = message.match(/Encounter\ (\d+)/)[1];
            const Card = $('[data-encounterid="' + encId + '"]');
            lastEncounters.Store.addEncounterCard(encId, {
                name: Card.find('h4').first().text(),
                CardID: Number(Card.find('.card-img-container img').data('cardid')),
                rarityglow: lastEncounters.encounterExtractRarityGlow(Card),
                rating: Number(Card.find('.card-img-container img').data('rating')),
                image: Card.find('.card-img-container img').attr('src'),
            });
        }

        originalConsoleLog.apply(unsafeWindow.console, arguments);
    };
    executeAutoplayAction = function () {
        // Only if there are cards left
        if ($('.tinder--card:not(.removed)').length === 0) {
            return;
        }

        if (autoplayMode === 'flirt') {
            if (document.querySelector(".tinder--card:not(.removed)").className.match(/glow-(\d)/)[1] >= autoFlirtRarity.value) {
                $('#love').click();
            } else {
                $('#nope').click();
            }
        } else if (autoplayMode === 'crush') {
            $('#nope').click();
        }
    }
    window.setTimeout(() => {
        autoPlayMenu.style.height = '350px';
    }, 1000);
    document.querySelector(".btnAutoFlirt").insertAdjacentHTML("afterend",
        `Flirt filter: Rarity must be at least <select id="autoFlirtRarity" class="form-control" style="width:200px;display:inline;">
            <option value="0">Common</option>
            <option value="1">Uncommon</option>
            <option value="2">Rare</option>
            <option value="3">Epic</option>
            <option value="4">Legendary</option>
            <option value="5">Mythic</option>
        </select>`);
    document.getElementById('autoFlirtRarity').value = GM_getValue('autoFlirtRarity') || 0;
    document.getElementById('autoFlirtRarity').addEventListener('change', (event) => { GM_setValue('autoFlirtRarity', event.target.value) });
    deb.parent().remove();
})();
