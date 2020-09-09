// ==UserScript==
// @name         Шаблоны допов dev
// @namespace    http://tampermonkey.net/
// @version      3.1.1
// @description  Шаблоны и автоматизация работы сканировщика в системе kad.arbitr.ru
// @author       @Spokik
// @match        kad.arbitr.ru/Card/*
// @grant        none
// ==/UserScript==
(function () {
  "use strict";
  let usersSettings = JSON.parse(localStorage.getItem(`usersSettings`))
  if (usersSettings == undefined) {
    usersSettings = {
      autoMD: "checked",
      tamplaties: "checked",
      checkReload: "checked",
      statisticsInterface: "checked",
      statCollect: "checked",
      usersSS: [5, 10]
    }
  }
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
  //При добавлении иска на сайт, скрипт автоматически указывает тип документа.
  function defaultMD() {
    document.getElementsByClassName(`b-popup-file_upload-attachments_list-item`)[1].onclick = () => { document.getElementsByClassName("js-input js-input--combobox js-input--deselect_with_save_val")[1].value = `Материалы по делу`; };
    document.getElementsByClassName(`b-popup-sj-link js-popup-sj-link js-popup-sj-link--upload`)[0].onclick = () => { document.getElementsByClassName("js-input js-input--combobox js-input--deselect_with_save_val")[1].value = `Материалы по делу`; };
  }
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
      <div id="PoObshimPravilam" class="tampleteButton">По общим</div><br>

      <div id="Otziv" class="tampleteButton">Отзыв.О</div>
      <div id="hodOPriob" class="tampleteButton">Приобщении.И</div>
      <div id="otkazOtIska" class="tampleteButton">Отказ.И</div>
      <div id="processualnoePravopriemstvo" class="tampleteButton">Правоприемство</div>`;

    document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > div.b-popup-button.js-upload-submit").before(classBlok)
    document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > div.b-popup-button.js-upload-submit").before(divBlok)
    document.querySelector("#b-footer > div > div.b-copyright").after(footer)
  }
  // Добавляет обработчики интерфейса
  function addTamplaties() {
    //получаем стороны
    const applicantl1 = document.querySelector("#gr_case_partps > table > tbody > tr > td.plaintiffs.first > div > ul > li > span > a").innerText; //Истец
    const applicantl2 = document.querySelector("#gr_case_partps > table > tbody > tr > td.defendants > div > ul > li > span > a").innerText; //Ответчик

    //События меняют стороны
    document.getElementById("istec").onclick = () => (document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > dl > dd > div > span > label > input").value = applicantl1);
    document.getElementById("otvetchik").onclick = () => (document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > dl > dd > div > span > label > input").value = applicantl2);
    //События Вставляют даные шблонов
    document.getElementById("Otziv").onclick = () => pastValuesFromTamplate(tamplatesValue.otziv.value, tamplatesValue.otziv.licantl, tamplatesValue.otziv.showText);
    document.getElementById("hodOPriob").onclick = () => pastValuesFromTamplate(tamplatesValue.HodOPriob.value, tamplatesValue.HodOPriob.licantl, tamplatesValue.HodOPriob.showText);
    document.getElementById("otkazOtIska").onclick = () => pastValuesFromTamplate(tamplatesValue.OtmenaIska.value, tamplatesValue.OtmenaIska.licantl, tamplatesValue.OtmenaIska.showText);
    document.getElementById("processualnoePravopriemstvo").onclick = () => pastValuesFromTamplate(tamplatesValue.processual.value, tamplatesValue.processual.licantl, tamplatesValue.processual.showText);
    document.getElementById("PoObshimPravilam").onclick = () => pastValuesFromTamplate(tamplatesValue.PoObshimPravilam.value, tamplatesValue.PoObshimPravilam.licantl, tamplatesValue.PoObshimPravilam.showText);

    function pastValuesFromTamplate(value, licantl, showText) {
      document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > table > tbody > tr > td.b-popup-sj-table-item.b-popup-sj-table-item--name > dl > dd > select > option").value = value;
      document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > dl > dd > div > span > label > input").value = licantl;
      document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > table > tbody > tr > td.b-popup-sj-table-item.b-popup-sj-table-item--name > dl > dd > a > span.selectBox-label").innerHTML = showText;
    }
    //Данные для заполнения шаблонов
    const tamplatesValue = {
      otziv: {
        value: `47c2f1f0-014f-44da-8ee7-f53c09fdf182`,
        licantl: applicantl2,
        showText: `Отзыв`,
      },
      HodOPriob: {
        value: `725a6e6a-76dd-49a2-abf0-dd2eaf5f2cca`,
        licantl: applicantl1,
        showText: `Ходатайство о приобщении к делу дополнительных документов`,
      },
      OtmenaIska: {
        value: `3e1e0fe8-5ab8-4c7d-af98-cb2ab3d5cf6f`,
        licantl: applicantl1,
        showText: `Ходатайство об отказе от иска`,
      },
      processual: {
        value: `64c6b878-d3e5-4b93-92ed-d41880b217d2`,
        licantl: applicantl2,
        showText: `Заявление о процессуальном правопреемстве`,
      },
      PoObshimPravilam: {
        value: `c8c5bdb7-5335-474e-9a49-55ca44250525`,
        licantl: applicantl2,
        showText: `Ходатайство о рассмотрении дела по общим правилам искового производства`,
      },
    };
  }
  // После и основным интерфейсом скрипта
  function statisticsInterface() {
    //Кнопка статистики
    document.getElementById("activeStat").onclick = () => {
      let promise = new Promise((resolve, reject) => {
        showSettingButton()
        reportTableBild()
        resolve()
      })
      promise.catch((err) => { console.error(`Error: `, err) })
        .then(() => { setSettings() })


    }
    //добавляет в открытое поле статистики необходимые кнопки
    function showSettingButton() {
      let now = new Date();
      let addStatInterface = document.createElement("div")
      let addSettingsButton = document.createElement("div")
      addStatInterface.innerHTML = `
      <input type="month" id="month" name="month" min="${now.toISOString().substr(0, 4)}-01" value="${now.toISOString().substr(0, 7)}">
        <input type="number" placeholder="Прошлый месяц" id="lastMonth">
        <input list="sostavNumber" id="sostavNumber">
        <datalist id="sostavNumber">
        <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option>
        </datalist>
        <div id="statStart" class="tampleteButton" style="height:23px">Посчитать</div>
    `
      let classBlok = document.createElement("style")
      classBlok.innerHTML = `
    body {
      margin: 0;
      padding: 0;
      background: #f3f3f3;
    }
    .settings {
      position: absolute;
      left: 82%;
      top: 40px;
      width: 250px;
      border: 1px solid rgb(205 205 224);
      padding: 5px;
      color: rgb(255 255 255);
      background: rgb(50 50 51);
      display: block;
    }
    #word_opts {
      position: relative;
      padding: 4px;
      width: 60px;
      height: 60px;
      background: #c6c6c6;
      outline: none;
      border-radius: 7px;
      box-shadow: inset 0 0 5px rgba(0,0,0, .2);
      transition: 0.5s;
    }

    label input[type="checkbox"]:checked + #word_opts {
      background: #02a9f4;
    }

    input[type="checkbox"] {
      width: 40px;
      height: 20px;
      -webkit-appearance: none;
      -moz-appearance: none;
      background: #c6c6c6;
      outline: none;
      border-radius: 50px;
      box-shadow: inset 0 0 5px rgba(0,0,0, .2);
      transition: 0.5s;
      position: absolute;
      right: 40px;
    }
    input:checked[type="checkbox"] {
      background: #02a9f4;
    }
    input[type="checkbox"]::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      top: 0;
      left: 0;
      background: #fff;
      transform: scale(1.1);
      box-shadow: 0 2px 5px rgba(0,0,0, .2);
      transition: 0.5s;
    }
    input:checked[type="checkbox"]::before {
      left: 20px;
    }
    `
      addSettingsButton.id = `settings`
      addSettingsButton.classList = `settings`
      function changeSS(usersSS) {
        let stringCounter = 1
        let sostavChangeBattons = `<div>`
        for (let i = 1; i <= 20; i++) {
          let sostasAsString = i
          let displayInput = ``
          if (i < 10) {
            sostasAsString = `0` + i
          }
          for (const key in usersSS) {
            if (usersSS[key] == i) {
              displayInput = `checked`
            }
          }


          sostavChangeBattons = sostavChangeBattons + `
        <label>
          <input type="checkbox" name="usersSS" style="display:none;" ${displayInput} >
          <span id="word_opts">${sostasAsString}</span>
        </label>
        `
          if (stringCounter == 5) {
            sostavChangeBattons = sostavChangeBattons + `<div></div>`
            stringCounter = 0
          }
          stringCounter++
        }
        sostavChangeBattons = sostavChangeBattons + `</div>`
        return sostavChangeBattons
      }
      addSettingsButton.innerHTML = `
      auto MD <input type="checkbox" name="autoMD" ${usersSettings.autoMD}><BR>
      Шаблоны <input type="checkbox" name="tamplaties" ${usersSettings.tamplaties}><BR>
      Проверять задвоенную загрузку <input type="checkbox" name="checkReload" ${usersSettings.checkReload}><BR>
      Собирать статистику <input type="checkbox" name="statCollect" ${usersSettings.statCollect}><BR>
      Пользователские составы
      <div>${changeSS(usersSettings.usersSS)}</div>
    <BR>
    `

      if (document.getElementById(`month`) == null) {
        document.querySelector("#b-footer > div").style.height = "500px";
        document.querySelector("#b-footer").style.height = "500px";
        document.querySelector("#b-footer > div > div.b-copyright").after(addStatInterface)
        document.querySelector("#b-footer > div > div.b-copyright").after(classBlok)
        document.querySelector("#b-footer > div > div.b-feedback").after(addSettingsButton)
      } else {
        document.querySelector("#b-footer > div").style.height = "30px";
        document.querySelector("#b-footer").style.height = "30px";
        document.querySelector("#b-footer > div > div:nth-child(2)").remove();
      }
    }

    function reportTableBild() {
      const usersButtons = document.getElementById(`statStart`)
      usersButtons.addEventListener('click', () => { statTablegeneration() })

      //Строит отчет по выбранному составу
      function statTablegeneration() {
        let dataForLS = {}
        let sostavNumber = document.querySelector("#sostavNumber").value
        const lastMonth = document.querySelector("#lastMonth").value
        dataForLS = JSON.parse(localStorage.getItem(`sostav${sostavNumber}`))
        let counter = { "Прошлый месяц": lastMonth }

        let needMonth = Number(document.querySelector("#month").value.substr(5, 7))

        for (let key in dataForLS) {
          if (dataForLS[key].month == needMonth) {
            if (counter[dataForLS[key].day] == null) {
              counter[dataForLS[key].day] = 0;
            }
            counter[dataForLS[key].day]++;
          }
        }

        let tableForStat = document.createElement(`div`);

        let tableString = `
          <table>
              <tr>
                  <td>День</td>
                  <td>Штуки</td>
              </tr>
          `;

        for (const key in counter) {
          tableString =
            tableString +
            `
              <tr>
              <td>${key}</td>
              <td>${counter[key]}</td>
          </tr>`
        }
        tableString = tableString + `</table>`
        tableForStat.innerHTML = tableString
        tableForStat.style.color = `#FFF`
        tableForStat.style.position = `absolute`
        tableForStat.style.margin = `30px 10px 10px 10px`
        document.querySelector("#b-footer > div > div.b-copyright").before(tableForStat)

      }
    }
    function setSettings() {
      let elem = document.querySelector("#settings")
      elem.addEventListener("click", () => {
        let preSet = {}

        for (let i = 0; i < document.querySelectorAll("#settings > input[type=checkbox]").length; i++) {
          let x = document.querySelectorAll("#settings > input[type=checkbox]")[i]
          if (x.checked) {
            preSet[x.name] = "checked"
          } else {
            preSet[x.name] = ""
          }
          //! Сделать меню выбора состава
          preSet.usersSS = [5, 10]
        }

        for (let i = 0; i < document.querySelectorAll("#settings > div > div > label").length; i++) {
          let ss = document.querySelectorAll("#settings > div > div > label > input[type=checkbox]")[i]
          //! Установить массив из активных составов
        }

        localStorage.setItem(`usersSettings`, JSON.stringify(preSet))
      })


    }

  }
  // Проверка задвоенной загрузки файлов
  function checkReload() {
    //Проверка повторной загрузки файлов
    let checkArray
    let checkbatton = document.getElementById("UserTempale");
    checkbatton.onmouseover = function () {
      checkArray = { isk: document.getElementsByClassName(`b-popup-sj-link js-popup-sj-link js-popup-sj-link--upload`)[0].innerText }

      for (let i = 0; document.querySelectorAll("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div > form > div > div > ul > li > a.b-popup-loaded-attachments_list-item-link").length > i; i++) {
        checkArray[`md${i}`] = document.querySelectorAll("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div > form > div > div > ul > li > a.b-popup-loaded-attachments_list-item-link")[i].innerText;
      }

      // значение прошлого иска
      const lastFilles = JSON.parse(localStorage.getItem(`downLoadFilles`))
      if (lastFilles === undefined) {
        lastFilles = {}
        return lastFilles
      }

      //Сравнивает настоящие и прошлые файлы
      for (let key in checkArray) {
        for (let prop in lastFilles) {
          if (checkArray[key] === "Прикрепить файл") { return }
          if (checkArray[key] === lastFilles[prop]) {
            alert(`Ты уже загружал(а) > ${checkArray[key]} <, но загружаешь > ${checkArray[prop]} < повторно`);
          }
        }
      }
      return checkArray;
    };

    //Установка новых значений  файлов в куки
    document.getElementsByClassName(`b-popup-button js-upload-submit`)[0].addEventListener("click", () => { testForclick(checkArray) }) //onclick = testForclick(checkArray) //
    function testForclick(array) {
      localStorage.setItem(`downLoadFilles`, JSON.stringify(array))
    }

  }
  // Добавляет статистику по загрузкам в localStorage
  function addStaticOnLocalStorage() {
    let elem = document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload")

    let promise = new Promise((resolve, reject) => {
      let observer = new MutationObserver((mutationRecords) => {
        if (mutationRecords.length > 1) {
          let saveScanStat = document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload.b-popup--edit.js-popup--edit > form > div.b-popup-button.js-upload-submit"); // кнопка по которой срабатывает скрипт
          let q = document.querySelector("#chrono_list_content > div.b-chrono-items-container.js-chrono-items-container > div").childElementCount  //Кол-во элементов для фикла
          let sostav = 100
          let docId = document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload.b-popup--edit.js-popup--edit > form > input[type=hidden]:nth-child(4)").value
          let a40 = document.querySelector("#b-case-header > ul.crumb.g-ec > li > span").textContent.split(" ")[20]


          for (let i = 1; i < q; i++) {
            if (document.querySelector(`#chrono_list_content > div.b-chrono-items-container.js-chrono-items-container > div > div:nth-child(${i}) > div.r-col > h2 > a > span`) !== null) {
              let checker = document.querySelector(`#chrono_list_content > div.b-chrono-items-container.js-chrono-items-container > div > div:nth-child(${i}) > div.r-col > h2 > a `)
                .textContent //полуучает текст
                .trim() //Удаляет пробелы "с краёв"
                .split(` `) //Правращает в масив по разделителю " "
              let stringValueCounter = 0
              if (stringValueCounter < 2) {
                for (let i = 0; i < checker.length; i++) {
                  if (checker[i] === `О` ||
                    checker[i] === `принятии` ||
                    checker[i] === `производству`) { stringValueCounter++ }
                }
              }

              if (stringValueCounter > 2) {
                sostav = document.querySelector("#chrono_list_content > div.b-chrono-items-container.js-chrono-items-container > div > div:nth-child(" + i + ") > div.r-col > h2 > span > p:nth-child(1)")
                  .textContent
                  .trim() //Удаляет пробелы "с краёв"
                  .split(` `) //Правращает в масив по разделителю " "
                  .pop() //"вырезает" последний элемент масива
              } else if (sostav !== 100 && sostav !== ' состав неопределен') {
                // console.log(`Состав:`, sostav, `идем дальше`)
              }
              else { sostav = ' состав неопределен' }
            }
          }

          sostavAtPopup(sostav)

          let params = {
            saveScanStat: saveScanStat,
            sostav: sostav,
            docId: docId,
            a40: a40,
          }
          resolve(params)

        } else if (mutationRecords.length === 1) {
          return console.log(`Атрибуты изменились`, mutationRecords.length, `- Закрытие модального окна`)
        }
      });
      observer.observe(elem, {
        attributes: true,
      })
    })
    promise.catch((err) => { console.error(`Error: `, err) })
      .then((params) => {

        //Срабатывает прии НАЖАТИИ на "Сохранить"
        params.saveScanStat.onclick = () => {
          let now = new Date()
          let dataForLS = {}
          dataForLS = JSON.parse(localStorage.getItem(`sostav${params.sostav}`))
          if (dataForLS == null) {
            dataForLS = {};
          }
          dataForLS[params.docId] = {
            day: `${now.getDate()}`,
            month: `${1 + now.getMonth()}`,
            a40: `${params.a40}`,
          }
          localStorage.setItem(`sostav${params.sostav}`, JSON.stringify(dataForLS)
          )
        }
      })

    function sostavAtPopup(sostav) {
      const elem = document.createElement("div")
      elem.className = "b-popup-info"
      elem.innerHTML = `<div class="b-popup-info-title">Состав</div><span class="b-popup-info-text js-popup-info-text" title="${sostav}">${sostav}</span>`

      if (sostav === ` состав неопределен`) {
        elem.innerHTML = `<div class="b-popup-info-title">Состав</div><span class="b-popup-info-text js-popup-info-text" title="${sostav}">${sostav}</span>`
        elem.style.color = "red"
      }
      document.querySelector("div.js-popup-info_attributes").append(elem)

    }
  }


  //получает масив составов, вовзращает строку
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


})();
