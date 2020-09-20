import { usersSettings } from './usersSettings.js'

// Добавляет статистику по загрузкам в localStorage
function addStaticOnLocalStorage() {
  let elem = document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload")

  let promise = new Promise((resolve, reject) => {
    let observer = new MutationObserver((mutationRecords) => {
      if (mutationRecords.length > 1) {
        let saveScanStat = document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload.b-popup--edit.js-popup--edit > form > div.b-popup-button.js-upload-submit"); // кнопка по которой срабатывает скрипт
        let q = document.querySelector("#chrono_list_content > div.b-chrono-items-container.js-chrono-items-container > div").childElementCount  //Кол-во элементов для фикла
        let sostav = ' состав неопределен'
        let docId = document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload.b-popup--edit.js-popup--edit > form > input[type=hidden]:nth-child(4)").value

        //it's selector for add new document without the card
        //document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > input[type=hidden]:nth-child(4)").value
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
            } else if (sostav !== ' состав неопределен') {
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
        return console.log(`Атрибуты изменились`, mutationRecords, `- Закрытие модального окна`)
      }
    });
    observer.observe(elem, {
      attributes: true,
      childList: true
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
    let isYourSostav = false
    function isCorrectSostav() {
      for (let i = 0; i < usersSettings.usersSS.length; i++) {
        if (usersSettings.usersSS[i] == sostav) {
          isYourSostav = true
          return
        } else {
          isYourSostav = false

        }
      }
    }
    isCorrectSostav()
    if (sostav === ` состав неопределен` || !isYourSostav) {
      elem.innerHTML = `<div class="b-popup-info-title">Состав</div><span class="b-popup-info-text js-popup-info-text" id="SSOnPop" title="${sostav}">${sostav}</span>`
      elem.style.color = "red"
    }
    if (document.querySelector(`#SSOnPop`) !== null) { } else { document.querySelector("div.js-popup-info_attributes").append(elem) }



  }
}


export { addStaticOnLocalStorage }