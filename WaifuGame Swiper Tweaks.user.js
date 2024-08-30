// ==UserScript==
// @name         WaifuGame Swiper Tweaks
// @namespace    WG Tweaks by Maultasche
// @description  Arrow Keys Left/Right=Swiping,Up=Switch Team (also on the new button click),Down=show stock of card
// @match        https://waifugame.com/swiper*
// @version      1.0
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waifugame.com
// @grant        none
// ==/UserScript==
var festivalChecks = ["Tier 3 Day-Pass"];

var charmId = "",swipingId = "",token = "", switchcount = 1;

document.addEventListener('keydown', function(event) {
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
    $.get("https://waifugame.com/hotel?sortBy=Lv&sortOrder=desc&rating=-999&rarity=-1&element=0&search="+encodeURIComponent(cardname)).then((homeHtml) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(homeHtml, 'text/html');
      let counter = 0;
      
      doc.querySelectorAll('.hotelListing .actionShowHotelWaifu').forEach(el => {if (el.dataset.name === cardname) counter++});
      document.querySelector(".encounter-data .color-white").parentElement.insertAdjacentHTML('beforeend',"<span> (" + counter + "x)</span>");
    });
    event.preventDefault();
  }
});
function getPartyName (htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const selectElement = doc.getElementById('party');
  document.getElementById('partyswitcher').innerHTML=selectElement.querySelector("option[selected]").textContent.replace("(Active)","")
};
function fetchTeams () {
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
    document.getElementById('partyswitcher').innerHTML=doc.getElementById('party').querySelector("option[selected]").textContent.replace("(Active)","");
  });
};
function swiping () {
  if (swipingId)	$.post(location.origin + '/formation/change', {"selected_formation": swipingId, "_token": token}).then(getPartyName).catch(fetchTeams);
};
function charming () {
  if (charmId) $.post(location.origin + '/formation/change', {"selected_formation": charmId, "_token": token}).then(getPartyName).catch(fetchTeams);
};
function switchteam () {
  switchcount=!switchcount;switchcount? swiping():charming()
};
function checkFestival() {
  $.get(location.origin + '/festival').then((htmlString) => {
    const items = [];
    let match;
    const regex = /showInfoModal\(\"(.*?)\", itemDescription\);/g;

    while ((match = regex.exec(htmlString)) !== null) {
      items.push(match[1]);
    }

    var match2 = null;
    items.forEach((item) => {
        if (!match2 && festivalChecks.indexOf(item) > -1) {
            match2=item;
            document.querySelector("#menu-main a[href$=festival]").insertAdjacentHTML("beforeend", '<span class="badge bg-highlight font-10">!!!</span>');
        }
    });
  });
}

document.getElementsByClassName("tinder--buttons")[0].insertAdjacentHTML('afterbegin', `<button title="Arrow Keys Left/Right=Swiping, Up=Switch Team, Down=show stock of card" id="partyswitcher" style="text-overflow:ellipsis;overflow: hidden;white-space: nowrap;">...</button>`);
document.getElementById('partyswitcher').addEventListener('click', switchteam);
window.setTimeout(()=> {
  checkFestival();
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