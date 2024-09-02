# WaifuGame Tweaks by Maultasche

This is a collection of userscripts to enhance the browser game https://waifugame.com

I initially wrote the scripts for myself to make playing more enjoyable. But I would like to share them with the other players. The scripts include QoL and styling changes, see below for more details.

**Do not expect features like idle swiping or getting things you would not get without the script, because this would be against the TOS of the game.**


## Setup

You have to do a bit of work yourself. First of all, you need to install two browser add-ons: Stylus and Tampermonkey/Greasemonkey

### Stylus

Stylus allows you to easily install themes and designs for many popular websites.
A WG player has written a very useful style for the game, which already offers many useful features and makes the game prettier in some places. Some of my scripts require this Style to be installed.

ToDo: Write a guide how to install Stylus and the WaifuHelper Tweaks Style

### Tampermonkey/Greasemonkey

Tampermonkey manages the so called user scripts. User scripts are used to customize the display and functionality of web pages with some JavaScript.
Greasemonkey is an alternative for Firefox.
This Addon is necessary to install and update my scripts.
You can get the Addon in your browser extension stores
* There might be an Addon for your mobile browser, but my scripts are not tested with those.

## Installing the scripts

Once you have finished the setup, it is now relatively simple. You click on the script you want to use and Tampermonkey should automatically suggest the installation, which you then only have to confirm. The scripts should update automatically, this can be configured in your Tampermonkey Addon and you can also manually update them.
There are some scripts that require a little configuration from you, this is added to the corresponding script section.

#### [Festival Checker](https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Festival%20Checker.user.js)

* Checks the festival when visiting any page of the game and if one of your configured items is on the wheel, the sidebar gets a highlight.

Configuration: After installation, open the script with Tampermonkey. You will quickly notice a section, which has an instruction on how to add items.

#### [Swiper](https://github.com/maultasche92/WaifuGame-Tweaks/raw/main/WaifuGame%20Swiper%20Tweaks.user.js)

* Swipe with keyboard arrow key.
* Quickly change between two formations
* Show how often you already have the card in the hotel
* Make Charm button invisible when a JustForYou-Wishlist Encounter appears, to prevent the current bug. This is temporary until they can be charmed that way (you have to use debonaire charms until then). This is just visual and a quick hack to draw your attention to the encounter.

Configuration: For the formation switcher to work, you need to include "charming" in the name of one your formations and "swiping" in another.
Why different formations? You can use one team for both (just include word in the name) but the idea is, that you use a formation with a charisma of 7 to swipe, this has the best ratio of encounter-resisting and getting good enough items on resist.

ToDo: the other scripts

---
*Join WaifuGame Community server to discuss, ask questions, get support, report bugs: https://discord.com/invite/waifugame*

This GitHub platform is just for sharing the scripts, do not try to communicate here.
If you want to contact me, join the discord server and send a message.