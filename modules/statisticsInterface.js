import { usersSettings } from './usersSettings.js'

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
      document.querySelector("#b-footer > div > div:nth-child(3)").remove();
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