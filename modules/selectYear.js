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

  // getNumberInput.oninput = zamena();
  function zamena() {

    let a40 = document.getElementById(NumberWithoutA40).value;
    let year20 = document.getElementById(year20).checked;
    let year19 = document.getElementById(year19).checked;
    let year18 = document.getElementById(year18).checked;
    let year = 20;

    if (year20 == true) { year = 20; }
    else if (year19 == true) { year = 19; }
    else if (year18 == true) { year = 18; }
    else { alert(`ЕРОР! Чет какая - то шляпа введина в место года`) }

    let fullNumber = "А40-" + a40 + "-" + year;
    document.querySelector("#sug-cases > div > input").value = fullNumber;
  }


  //Устанавливаем по умолчанию А40-88888-20
  document.querySelector("#sug-cases > div > input").value = ` А40-88888-20`;
  //пересобирает строку, заменя 2 последний цифры
  function setYear(year) {
    let newNumber = document.querySelector("#sug-cases > div > input").value
    let inString = document.querySelector("#sug-cases > div > input").value["length"]
    var getNewNumber = ``
    let i = 0
    while (inString - 2 > i) {
      getNewNumber = getNewNumber + newNumber[i]
      i++
    }
    getNewNumber = getNewNumber + year
    return getNewNumber
  }

  //Красим фон и меняем год
  document.getElementById("year20").onclick = function orange() { document.getElementById('main-column1').style.background = "#ffcf65"; document.querySelector("#sug-cases > div > input").value = setYear(20); };
  document.getElementById("year19").onclick = function orange() { document.getElementById('main-column1').style.background = "#7cf99d"; document.querySelector("#sug-cases > div > input").value = setYear(19); };
  document.getElementById("year18").onclick = function orange() { document.getElementById('main-column1').style.background = "#86cdff"; document.querySelector("#sug-cases > div > input").value = setYear(18); };
  document.getElementById("pager1").onclick = function orange() { document.getElementById('main-column1').style.background = "#e9f0fa";; };//Красиm в сток по праву тех
};

export { windowForUserScript };