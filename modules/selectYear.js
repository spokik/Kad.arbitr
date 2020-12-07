'use strict';

//Функция создает поля для воода года и номера дела
function windowForUserScript() {
  const div = document.createElement('div');
  div.id = "UserScriptIndex";
  div.innerHTML = `
    <fieldset>
    <label>
    <input type="button" name="inputYear" value="20" id="year20" checked="checked">  </label>
    <label><input type="button" name="inputYear" value="19" id="year19">  
    </label><label><input type="button" name="inputYear" value="18" id="year18">  
    </label></fieldset>`;
  document.getElementById('b-form-submit').before(div);

  //Устанавливаем по умолчанию А40-88888-20
  document.querySelector("#sug-cases > div > input").value = ` А40-88888-20`;
  //пересобирает строку, заменяя 2 последний цифры
  function setYear(year) {
    let oldNumber = document.querySelector("#sug-cases > div > input").value
    let newNumber = ``
    newNumber = oldNumber.slice(0,oldNumber.length-2) + year
    return newNumber
  }

  //Красим фон и меняем год
  document.getElementById("year20").onclick = function orange() { document.getElementById('main-column1').style.background = "#ffcf65"; document.querySelector("#sug-cases > div > input").value = setYear(20); };
  document.getElementById("year19").onclick = function orange() { document.getElementById('main-column1').style.background = "#7cf99d"; document.querySelector("#sug-cases > div > input").value = setYear(19); };
  document.getElementById("year18").onclick = function orange() { document.getElementById('main-column1').style.background = "#86cdff"; document.querySelector("#sug-cases > div > input").value = setYear(18); };
  document.getElementById("pager1").onclick = function orange() { document.getElementById('main-column1').style.background = "#e9f0fa";; };//Красиm в сток по праву тех
};

export { windowForUserScript };