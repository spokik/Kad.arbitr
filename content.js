'use strict';

const script = document.createElement('script');// create new element script as module
script.setAttribute("type", "module");
script.setAttribute("src", chrome.extension.getURL('kad.js'));
const testModule = document.createElement(`script`)
testModule.setAttribute("type", "module")
testModule.setAttribute("src", chrome.extension.getURL('./modules/alert.js'))
const autoMD = document.createElement(`script`)
autoMD.setAttribute("type", "module")
autoMD.setAttribute("src", chrome.extension.getURL('./modules/alert.js'))

const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(script, head.lastChild);// add module in head
head.insertBefore(testModule, head.lastChild);
head.insertBefore(autoMD, head.lastChild);

function createNewScript(name, url) {
    const name = document.createElement('script')
    name.setAttribute("type", "module");
    name.setAttribute("src", chrome.extension.getURL(url))
    head.insertBefore(name, head.lastChild);
}
