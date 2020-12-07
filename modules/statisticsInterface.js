import { usersSettings } from './usersSettings.js'
// import { css } from '../index.js'


// Строка статистике в поле меню
function statisticsInterface() {
  //Кнопка статистики
  document.getElementById("activeStat").onclick = () => {
    let promise = new Promise((resolve, reject) => {
      showSettingButton()
      reportTableBild()
      resolve()
    })
    promise
    .catch((err) => { console.error(`Error: `, err) })
    .then(() => { setSettings() })
  }
  //добавляет в открытое поле статистики необходимые кнопки
  function showSettingButton() {
    let now = new Date();
    let addStatInterface = document.createElement("div")
    let addSettingsButton = document.createElement("div")
    addStatInterface.innerHTML = `
      <input style="width:90px" type="month" id="month" name="month" min="${now.toISOString().substr(0, 4)}-01" value="${now.toISOString().substr(0, 7)}">
        <input style="width:60px" type="number" placeholder="Прошлый месяц" id="lastMonth">
        <input style="width:90px" type="number" placeholder="Число(день)" id="dayStat">
        <input style="width:90px" list="sostavNumber" placeholder="Состав" id="sostavNumber">
        <datalist id="sostavNumber">
        <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option>
        </datalist>
        <div id="statStart" class="tampleteButton" style="height:23px">Посчитать</div>
        <div id="dayStatistic" class="tampleteButton" style="height:23px">за день</div>
    `
    let classBlok = document.createElement("style")
    classBlok.innerHTML = `css`
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
      document.querySelector("#b-footer > div > div:nth-child(3)").remove();
    }
  }
  function reportTableBild() {
    const usersButtons = document.getElementById(`statStart`)
    usersButtons.addEventListener('click', () => { statTablegeneration() })

    const dayStatistic = document.getElementById(`dayStatistic`)
    dayStatistic.addEventListener('click', () => { dayReport(document.getElementById(`dayStat`).value) })
    //Строит отчет по выбранному составу
    function statTablegeneration() {
      let dataForLS = {}
      let sostavNumber = document.querySelector("#sostavNumber").value
      const lastMonth = document.querySelector("#lastMonth").value
      dataForLS = JSON.parse(localStorage.getItem(`sostav${sostavNumber}`))
      let counter = { "C прошлого месяца": lastMonth }

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
    //Строит отчет по дню
    function dayReport(day ) {
      let needMonth = Number(document.querySelector("#month").value.substr(5, 7))
      const sostavNumber = document.querySelector("#sostavNumber").value
      const dataFromLS = JSON.parse(localStorage.getItem(`sostav${sostavNumber}`))
      let counter = { "что-то": lastMonth }
      for (let key in dataFromLS) {
        if (dataFromLS[key].month == needMonth && dataFromLS[key].day == day) {
          counter[key] == dataFromLS[key].a40
        }
      }

      let tableForStat = document.createElement(`div`);
      let tableString = `
          <table>
              <tr>
                  <td>Номер</td>
                  <td>Время</td>
                  <td>опции</td>
              </tr>
          `;

      for (const key in counter) {
        tableString =
          tableString +
          `
              <tr>
              <td>${key}</td>
              <td>time</td>
              <td>del</td>
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

      }
      preSet.usersSS = []
      for (let i = 0; i < document.querySelectorAll("#settings > div > div > label").length; i++) {
        let ss = document.querySelectorAll("#settings > div > div > label > input[type=checkbox]")[i]
        if (ss.checked) {
          preSet.usersSS.push(i + 1)
        }
      }

      localStorage.setItem(`usersSettings`, JSON.stringify(preSet))
    })


  }

}


export { statisticsInterface }