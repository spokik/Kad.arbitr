'use strict';
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;

createNewScript('./modules/autoMD.js')
createNewScript('./modules/alert.js')
createNewScript('kad.js')

function createNewScript(url) {
    const name = document.createElement('script')
    name.setAttribute("type", "module");
    name.setAttribute("src", chrome.extension.getURL(url))
    head.insertBefore(name, head.lastChild);
}

