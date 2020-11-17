import { usersSettings } from './usersSettings.js'

// Добавляет кнопки пользовательского интерфейса
function addBattons() {
  let footer = document.createElement("div")
  footer.className = "b-feedback"
  let xc = sostavPerDay(usersSettings.usersSS)
  footer.innerHTML = `${xc} <div id="activeStat" class="tampleteButton" style="height:23px">Статистика</div>`;

  let classBlok = document.createElement("style")
  classBlok.innerHTML = "div.tampleteButton{height: 30px;width: 130px;-webkit-appearance: button;-webkit-writing-mode: horizontal-tb !important;color: buttontext;text-shadow: none;display: inline-block;text-align: center;align-items: flex-start;background-color: buttonface;box-sizing: border-box;margin: 0em;font: 400 13.3333px Arial;padding: 1px 6px;border-width: 2px;border-style: outset;border-color: buttonface;border-image: initial;}}";
  let divBlok = document.createElement("div")
  divBlok.id = "UserTempale"
  divBlok.innerHTML = `
      <div id="istec" class="tampleteButton" >Истец</div>
      <div id="otvetchik" class="tampleteButton">Ответчик</div>
      <div id="PoObshimPravilam" class="tampleteButton">По общим</div>
      <div id="Clarify" class="tampleteButton">Уточнение.И</div>
      <br>
      <div id="hodOPriob" class="tampleteButton">Приобщении.И</div>
      <div id="Otziv" class="tampleteButton">Отзыв.О</div>
      <div id="otkazOtIska" class="tampleteButton">Отказ.И</div>
      <div id="processualnoePravopriemstvo" class="tampleteButton">Правоприемство</div>`;

  document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > div.b-popup-button.js-upload-submit").before(classBlok)
  document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > div.b-popup-button.js-upload-submit").before(divBlok)
  document.querySelector("#b-footer > div > div.b-copyright").after(footer)
}

//получает масив составов, вовзращает строку " состав: штук | состав: штук ..."
function sostavPerDay(sostavs) {
  let today = new Date().getDate()
  let month = new Date().getMonth() + 1
  let counter = {}
  for (let index = 0; index < sostavs.length; index++) {
    let starArray = JSON.parse(localStorage.getItem(`sostav${sostavs[index]}`))
    for (let key in starArray) {
      if (starArray[key].month == month) {
        if (starArray[key].day == today) {
          if (counter[sostavs[index]] == undefined) { counter[sostavs[index]] = 0 }
          counter[sostavs[index]]++
        }
      }
    }
  }
  //string stringify
  let stringReturn = ''
  for (let key in counter) {

    stringReturn = stringReturn + `${key} состав: ${counter[key]} штук | `
  }
  return stringReturn
}

export { addBattons }