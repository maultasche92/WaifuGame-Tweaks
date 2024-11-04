// ==UserScript==
// @name         WaifuGame Inbox Tweaks
// @description  WG Tweaks by Maultasche
// @match        https://waifugame.com/inbox*
// @namespace    https://github.com/maultasche92/WaifuGame-Tweaks
// @author       maultasche92
// @version      1.0
// @updateURL    https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Inbox%20Tweaks.user.js
// @downloadURL  https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Inbox%20Tweaks.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        unsafeWindow
// ==/UserScript==

(function () {
    'use strict';

    document.getElementById("mark_read_all_form").insertAdjacentHTML('afterend', `<button onclick="$.post(location.origin + '/inbox', { 'action': 'take_all', '_token': token }).then(() => {$.post(location.origin + '/inbox', { 'action': 'mark_read_all', '_token': token })}).then(()=>setTimeout(() => location.reload(), 500)).catch(console.error).catch(console.error);" class="btn btn-outline-primary btn-sm"><i class="fas fa-mail-bulk"></i> Do both actions</button>`);
})();