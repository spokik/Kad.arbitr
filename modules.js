'use strict';
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;

createNewScript('kad.js')
createNewScript('./modules/autoMD.js')
createNewScript('./modules/selectYear.js')
createNewScript('./modules/addBattons.js')
createNewScript('./modules/addTamplaties.js')
createNewScript('./modules/checkReload.js')
createNewScript('./modules/statisticsInterface.js')
createNewScript('./modules/addStaticOnLocalStorage.js')


function createNewScript(url, type = "module") {
  const name = document.createElement('script')
  name.setAttribute("type", type);
  name.setAttribute("src", chrome.extension.getURL(url))
  head.insertBefore(name, head.lastChild);
}

