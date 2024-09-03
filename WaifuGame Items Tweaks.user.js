// ==UserScript==
// @name         WaifuGame Items Tweaks
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/items*
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      1.2
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Items%20Tweaks.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        unsafeWindow
// ==/UserScript==

(function () {
    'use strict';
    if (location.href.indexOf("sell=") > -1) {
        window.setTimeout(() => {
            const type = location.href.match(/sell\=(.+)/)[1];
            function iterateFunctions(functions) {
                let currentIndex = 0;

                function executeFunction(func) {
                    let interval = setInterval(() => {
                        let element = func();
                        if (element instanceof HTMLElement) {
                            clearInterval(interval);
                            element.click();
                            currentIndex++;
                            if (currentIndex < functions.length) {
                                executeFunction(functions[currentIndex]);
                            }
                        }
                    }, 10);
                }

                if (functions.length > 0) {
                    executeFunction(functions[currentIndex]);
                }
            };
            iterateFunctions([
                () => Array.from(document.querySelectorAll("#tab-" + type + " .list-group a"))
                    .find((a) => {
                        let imgCl = a.querySelector('img').classList;
                        return a.querySelector('span.float-right')?.textContent !== '1x'
                            && (type === 'combat' || (imgCl.contains("glow-2") || imgCl.contains("glow-1") || imgCl.contains("glow-0")))
                    }),
                () => document.querySelector('#actionSellCustom'),
                () => document.querySelector('#customAmountBtnMax'),
                () => document.querySelector('.customAmountStepper > div:nth-child(1) > a:nth-child(1)'),
                () => document.querySelector('button.btn-success:nth-child(6)'),
            ]);
        }, 3000)
    }
})();