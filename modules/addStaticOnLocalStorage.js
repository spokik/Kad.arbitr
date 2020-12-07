import { usersSettings } from './usersSettings.js'

// Добавляет статистику по загрузкам в localStorage
function addStaticOnLocalStorage() {
  const elem = document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload")

  let promise = new Promise((resolve, reject) => {
    let observer = new MutationObserver((mutationRecords) => {
      if (mutationRecords.length > 1) {
        const saveScanStat = document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload.b-popup--edit.js-popup--edit > form > div.b-popup-button.js-upload-submit"); // кнопка по которой срабатывает скрипт
        let q = document.querySelector("#chrono_list_content > div.b-chrono-items-container.js-chrono-items-container > div").childElementCount  //Кол-во элементов для фикла
        let sostav = ' состав неопределен'
        const docId = document.querySelector(" form > input[name=DocumentId]").value
        //Если документ ид отсудствует, берем инстанст ид и добавляем к нему свой ид, предварительно проверяя есть ли подобные ид
        // либо получать этот ид после добавления докумнта из дива и получив записывать в статистику
        const a40 = document.querySelector("#b-case-header > ul.crumb.g-ec > li > span").textContent.split(" ")[20]

        //Ищем и определем состав
        for (let i = 1; i < q; i++) {
          if (document.querySelector(`#chrono_list_content > div.b-chrono-items-container.js-chrono-items-container > div > div:nth-child(${i}) > div.r-col`) !== null) {
            let checker = document.querySelector(`#chrono_list_content > div.b-chrono-items-container.js-chrono-items-container > div > div:nth-child(${i}) > div.r-col`)
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
        if (document.querySelector(`#userSS`) === null) {
          sostavAtPopup(sostav)
        }
        
        if (!document.querySelector(`#lastOnloadFile`) ) {
          lastOnloadFile()
        }

        const params = { saveScanStat, sostav, docId, a40, }
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
  promise
    .catch((err) => { console.error(`Error: `, err) })
    .then((params) => {

      //Срабатывает прии НАЖАТИИ на "Сохранить"
      //Сохраняет в локал сторадж данные загруженного документа
      params.saveScanStat.onclick = () => {
        let currentDate = new Date()
        let dataForLS = JSON.parse(localStorage.getItem(`sostav${params.sostav}`)) || {}

        dataForLS[params.docId] = {
          day: `${currentDate.getDate()}`,
          month: `${1 + currentDate.getMonth()}`,
          a40: `${params.a40}`,
        }
        localStorage.setItem(`sostav${params.sostav}`, JSON.stringify(dataForLS)
        )
      }
    })

  function sostavAtPopup(sostav) {
    const elem = document.createElement("div")
    elem.className = "b-popup-info"
    elem.innerHTML = `<div class="b-popup-info-title" id="userSS">Состав</div><span class="b-popup-info-text js-popup-info-text" title="${sostav}">${sostav} </span>`

    if (sostav === ` состав неопределен` || !usersSettings.usersSS.includes(Number(sostav), 0)) {
      const buttonsSelectionSS = usersSettings.usersSS.map((key) => { return `<div id="SS${key}" class="tampleteButton" style="width: auto;">${key}</div>` })
      elem.innerHTML = `<div class="b-popup-info-title">Состав</div><span class="b-popup-info-text js-popup-info-text" id="SSOnPop" title="${sostav}">${sostav}  </span>` + buttonsSelectionSS
      elem.style.color = "red"
      if (!document.querySelector(`#SSOnPop`)) {
        document.querySelector("div.js-popup-info_attributes").append(elem)
        for (let i = 0; i < usersSettings.usersSS.length; i++) {
          document.querySelector(`#SS${usersSettings.usersSS[i]}`).addEventListener("click", () => {
            document.querySelector("#SSOnPop").innerText = usersSettings.usersSS[i]
            document.querySelector("#SSOnPop").style.color = "black"
            sostav = usersSettings.usersSS[i]
            return sostav
          })
        }
      }
    }
    if (!document.querySelector(`#SSOnPop`)) { document.querySelector("div.js-popup-info_attributes").append(elem) }

  }

  function lastOnloadFile() {
    const elem = document.createElement("div")
    elem.id = `lastOnloadFile`
    elem.innerHTML = ` - последний был ${JSON.parse(localStorage.getItem(`downLoadFilles`)).pop()}`
    document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload.b-popup--edit.js-popup--edit > form > div.b-popup-file_upload-wrapper.js-popup-file_upload-wrapper.b-popup-file_upload-wrapper--titled > div.b-popup-file_upload.js-popup-sj-file_upload > a")
      .after(elem)
  }
}
function changeSS(SS) {
  sostav = SS
}

export { addStaticOnLocalStorage }