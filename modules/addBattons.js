import { usersSettings } from './usersSettings.js'

// Добавляет меню
function addBattons() {
  const footer = document.createElement("div")
  footer.className = "b-feedback"
  let xc = sostavPerDay(usersSettings.usersSS)
  footer.innerHTML = `${xc} <div id="activeStat" class="tampleteButton" style="height:23px">Меню</div>`;
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

    stringReturn = stringReturn + `| ${key} состав: ${counter[key]} штук `
  }
  return stringReturn
}

export { addBattons }