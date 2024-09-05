// ==UserScript==
// @name         WaifuGame Trading Tweaks
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/player_trade*
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      1.1
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Trading%20Tweaks.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        unsafeWindow
// ==/UserScript==
(function () {
    'use strict';

    window.setTimeout(() => {
        var idMap = {};
        // add checkboxes
        document.querySelectorAll("#traderItemList div").forEach((div) => {
            div.style = 'width:95%';

            let checkbox = document.createElement("input");
            checkbox.type = 'checkbox';
            checkbox.style = 'margin-left:95%;scale:2;top:30px;position:relative;';

            div.insertAdjacentElement('beforebegin', checkbox)
        });

        // add button
        let a = document.createElement('a');
        a.href = '#';
        a.style = 'color: green !important;right:60px';
        a.classList.add('close-menu');
        a.innerHTML = '<i class="fa fa-check-circle"></i>';
        a.onclick = () => {
            a.nextElementSibling.click();
            // add all checked items, remove unchecked
            document.querySelectorAll("#traderItemList input").forEach((checkbox) => {
                if (!checkbox.checked && idMap[checkbox.nextElementSibling.dataset.iid]) {
                    var inp = $("input[data-item='" + checkbox.nextElementSibling.dataset.iid + "']");
                    inp.val(1).trigger("change");

                    //inp.prev().click();
                } else if (checkbox.checked && !idMap[checkbox.nextElementSibling.dataset.iid]) {
                    checkbox.nextElementSibling.click();
                }
                checkbox.checked = false;
            });
        }
        document.querySelector("#traderAddItemMenu .close-menu").insertAdjacentElement('beforebegin', a);

        // listener on the menu button
        document.querySelector("button[data-menu]").addEventListener('click', () => {
            idMap = {};
            // remember which items already added
            document.querySelector("button[data-menu]").previousElementSibling.querySelectorAll("input").forEach((inp) => {
                idMap[inp.dataset.item] = true;
            });
            // check the boxes for already added items
            document.querySelectorAll("#traderItemList div").forEach((div) => {
                if (div.previousElementSibling && div.previousElementSibling.tagName === 'INPUT') div.previousElementSibling.checked = idMap[div.dataset.iid];
            });
        });

        // Listen to the filter field
        let timeoutID = null;
        document.getElementById('filterTraderAddItem').addEventListener('keyup', function (e) {
            clearTimeout(timeoutID);
            const str = e.target.value
            timeoutID = setTimeout(() => {
                // hide all checkboxes of the filtered items
                document.querySelectorAll('#traderItemList > div:not([data-tag*="' + str + '"])').forEach((div) => {
                    if (div.previousElementSibling && div.previousElementSibling.tagName === 'INPUT') div.previousElementSibling.style.display = 'none';
                });
            }, 500)
        });
    }, 2000);
})();