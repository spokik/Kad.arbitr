
"use strict";
import {
  windowForUserScript,
  defaultMD,
  addBattons,
  addTamplaties,
  addStaticOnLocalStorage,
  usersSettings,
  checkReload,
  statisticsInterface
} from './index.js'

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

