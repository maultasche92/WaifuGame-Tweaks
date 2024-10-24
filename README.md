# WaifuGame Tweaks by Maultasche

This is a collection of userscripts to enhance the browser game https://waifugame.com

I initially wrote the scripts for myself to make playing more enjoyable. But I would like to share them with the other players. The scripts include QoL and styling changes, see below for more details.

> [!WARNING]
> Use at your own risk, I take no responsibility if something unexpected leads to problems. Also do not expect features like idle swiping or getting things you would not get without the script, because this would be against the TOS of the game.


## Setup

You have to do a bit of work yourself. The first thing you have to change is how the game is displayed in your browser:
Go to your [WaifuGame Profile](https://waifugame.com/profile) and activate "Don't Display App in iFrame". If you do not activate it, the game is rather small and things added by my scripts may not work.

### Stylus

Stylus allows you to easily install themes and designs for many popular websites
A WG player has written a very useful style for the game, which already offers many useful features and makes the game prettier in some places. It is not really required, but highly recommended because I also have it installed.

#### Stylus setup instructions
The following instructions are for Desktop or Laptop computer.
Installation on a mobile phone or tablet is not covered, but might be possible with Firefox for Android.
In nutshell: [Extension](https://add0n.com/stylus.html); [Style](https://userstyles.world/style/2434/waifugame-tweaks) -
or read on for step-by-step instruction:
- install Stylus browser extension appropriate to your internet browser:
  - for [Firefox](https://addons.mozilla.org/en-GB/firefox/addon/styl-us/) 
  - for [Chrome](https://chromewebstore.google.com/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne)
- navigate to "WaifuGame Tweaks by kaorinite" in the public repository of styles: https://userstyles.world/style/2434/waifugame-tweaks
- use blue "Install" button on right hand side to start installation process
- use gray "Install style" button in upper left corner to complete installation
- you can further tweak settings to your liking. We recommend you leave "Check for updates" as enabled.
- if you use a link or a bookmark to open the WaifuGame, ensure it does *not* contain "pc" in the url as that would reset the setting

> [!NOTE]
> This style is hosted in a public repository of styles we have no control over it. It gets automatically updated by default.

### Tampermonkey

Tampermonkey manages the so called userscripts. Userscripts are used to customize the display and functionality of web pages with some JavaScript.
This Addon is necessary to install and update my scripts.
You can get the Addon in your browser extension store.
* There might be an Addon for your mobile browser, but my scripts are not tested with those.

> [!IMPORTANT]
> In Chrome and chromium based browsers, you need to enable the developer mode in order for tampermonkey to work. There is a switch on the top right of the chrome://extensions/ page.

## Installing the scripts

Once you have finished the setup, it is now relatively simple. You click on the script you want to use and Tampermonkey should automatically suggest the installation, which you then only have to confirm. The scripts should update automatically, this can be configured in your Tampermonkey Addon and you can also manually update them.
There are some scripts that require a little configuration from you, this is added to the corresponding script section.

#### [Festival Checker](https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Festival%20Checker.user.js)

* Checks the festival when visiting any page of the game and if one of your configured items is on the wheel, the sidebar gets a highlight.

> [!IMPORTANT]
> Configuration: After installation, open the script with Tampermonkey. You will quickly notice a section, which has an instruction on how to add items.

#### [Swiper](https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Swiper%20Tweaks.user.js)

* Swipe with keyboard arrow key.
* Quickly change between two formations.
* Show how often you already have the card in the hotel.
* Make Charm button invisible when a JustForYou-Wishlist Encounter appears, to prevent the current bug. This is temporary until they can be charmed that way (you have to use debonaire charms until then). This is just visual and a quick hack to draw your attention to the encounter.

> [!IMPORTANT]
> Configuration: For the formation switcher to work, you need to include "charming" in the name of one your formations and "swiping" in another.
Why different formations? You can use one team for both (just include both words at once) but the idea is, that you use a formation with a charisma of 7 to swipe, this has the best ratio of encounter-resisting and getting good enough items on resist.

#### [Card Portfolio](https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Card%20Portfolio%20Tweaks.user.js)

* Shows how often the active card is in the hotel.
* A button to show how often every card in the current list is in the hotel (with a delay between each card).
* Rightclick on card to show card menu.
* Get informed when your card storage is full

#### [Festival](https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Festival%20Tweaks.user.js)

* Show your active subscription tier very visible on page load.

#### [Home](https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Home%20Tweaks.user.js)

* Show the stats of your formation members, highlight Perception, Charisma and Luck

#### [Hotel](https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Hotel%20Tweaks.user.js)

* Rightclick on card to show card menu.

#### [Items](https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Items%20Tweaks.user.js)

* Sell maximum amount (except one) of item after item (if you have 30 onions, 29 will be sold).

> [!IMPORTANT]
> Configuration: It's not really a configuration, but you have to something technical to start it: In the url, add ?sell=food at the end. Loading the items page with this parameter, triggers the script and it sells one item, then the game reloads the page and the script triggers again until you have 1 of every item left, every time with a delay to reduce server stress. Important: sell=food means, it sells the items in the food tab, you can change it to gift or combat for the other tabs. Every item with purple or higher rarity is ignored, except the combat tab.

#### [MySponsored](https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20MySponsored%20Tweaks.user.js)

* Highlights the cards in your sponsored page, which are currently in the raffle.

> [!IMPORTANT]
> Configuration: in the 4th line, there is a "sponsored_by=372112". Change the id to your id, you can find your id in the url after clicking on your name in the sidebar.

#### [Search and Wishlist](https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Search%20and%20Wishlist%20Tweaks.user.js)

* A button to show how often every card in the current list is in the hotel (with a delay between each card).
* Show the Metadata (Nature, Element, Trait) of the cards (with a delay between each card), highlight Perception, Charisma and Luck.

#### [General](https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20General%20Tweaks.user.js)

* Shows how often the card in the card info window is in the hotel (right side of headline).

#### [Trading](https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Trading%20Tweaks.user.js)

* Adds checkboxes to the items in the selection menu to provide a multiselection. Confirm your selection with a green button near the close button.

> [!CAUTION]
> WIP: This feature is not completely finished, for example, unselecting does not remove the item from your selected items, you have to use the normal way of removing an item. Too many selections at once can cause stress to the server, resulting in you having to wait a bit.


---
> [!NOTE]
> This GitHub platform is just for sharing the scripts, do not try to communicate here.<br>If you want to contact me, join the discord server and send a message.


*Join WaifuGame Community server to discuss, ask questions, get support, report bugs: https://discord.com/invite/waifugame*
