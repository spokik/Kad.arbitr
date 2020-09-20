
"use strict";

import { windowForUserScript } from './modules/alert.js';
import { defaultMD } from './modules/autoMD.js';
import { addBattons } from './modules/addBattons.js';
import { addTamplaties } from './modules/addTamplaties.js';
import { usersSettings } from './modules/usersSettings.js'
import { checkReload } from './modules/checkReload.js'
import { statisticsInterface } from './modules/statisticsInterface.js'
import { addStaticOnLocalStorage } from './modules/addStaticOnLocalStorage.js'


if (document.location.href === `https://kad.arbitr.ru/`) { windowForUserScript() }

if (document.location.href != `https://kad.arbitr.ru/`) {

  window.onload = onloadPage();

  function onloadPage() {
    addBattons()
    statisticsInterface()
    if (usersSettings.autoMD == "checked") { defaultMD() }
    if (usersSettings.tamplaties == "checked") { addTamplaties() }
    if (usersSettings.checkReload == "checked") { checkReload() }
    if (usersSettings.statCollect == "checked") { addStaticOnLocalStorage() }
    if (false) {
      //Тут будет выбора составов пользателя
    }

  }

}

