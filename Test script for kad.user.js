// ==UserScript==
// @name         Test script for kad
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://kad.arbitr.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';



    let kadNumber = "123";
    let kadYear = "20";




   let kadNumderFull =`a40-` + kadNumber +`-` + kadYear;

    //document.getElementById('main-column1').style.background = "#ffc142"; //Красим фон ПЕРЕДЕЛАТЬ В ПОКРАСКУ ОТ ГОДА!!!!!!!!!!

    //Фукнция создает и выводив в алерт переменную,в которую помещяет значение в окне ввода номера "а40..."
    function getSUD(){
         let number = document.querySelector(`#sug-cases .tag input[type="text"]:valid`).value;
        alert(number);
    }

    // Функци получает строку суда для поиска
    function getSUDString(){
         //Создаем масив из всех элементов с указанными классами
        let div = document.getElementsByClassName('b-suggest b-suggest_liquid b-suggest_liquid-no-overflow');
        //Из нулевого пункта масива получаем строку, в которой ищем поселекторам нужный пункт и присваеваем обратно переменной
        div = div[0].querySelectorAll('div.body > ul > li');
    }

    //Загвтоыка под выбор истца по умолчанию и МД. Обращаемся по селектору к интупут и через value приравниваем ему значение
    function newValueSUD(){
    document.querySelector('span.b-combobox.b-rounded-input.js-b-combobox.js-control-container.b-rounded-input_block input[type="text"]').value = '1 наХуюВертевшийВсех апелляционный суд';
}

    //Функция создает поля для воода года и номера дела
    function windowForUserScript() {
        let div = document.createElement('div');
        div.id = "UserScriptIndex";
        div.innerHTML = 'А40 - <input value="8888" type ="text" class="js - input"  placeholder = "номер дела" id = "NumberWithoutA40" ><fieldset><label><input type="radio" name="inputYear" value="20" id="year20" checked="checked">20</label><label><input type="radio" name="inputYear" value="19" id="year19">19</label><label><input type="radio" name="inputYear" value="18" id="year18">18</label></fieldset><br><div id="dich">112</div>"';
        document.getElementById('b-form-submit').before(div);
    }


 function getAndPush() {
    let a40 = document.getElementById(`NumberWithoutA40`).value;
    let year20 = document.getElementById(`year20`).checked;
    let year19 = document.getElementById(`year19`).checked;
    let year18 = document.getElementById(`year18`).checked;
    let year = 20;

    if (year20 == true) { year = 20; }
    else if (year19 == true) { year = 19; }
    else if (year18 == true) { year = 18; }
    else {alert(`ЕРОР! Чет какая-то шляпа введина в место года`) }

    let fullNumber = "a40-" + a40 + "-" + year;
     document.querySelector(`#sug-cases .tag input[type="text"]:valid`).value = fullNumber;

     let p = document.getElementById("dich");
     p.innerHTML = fullNumber;

}
    //Вызов функции
    document.getElementById("sug-judges").onclick = windowForUserScript;//вызываем окна окликом
    document.getElementById("pager1").onclick = getAndPush;//Замена в поле ввода онкликом
    //document.getElementById("b-form-submit").oninput = getAndPush;
    //let a40 = document.getElementsByTagName(`NumberWithoutA40`);
    //a40.oninput = getAndPush;

    window.onload = windowForUserScript;
    //let inputA40NumberYear = document.querySelector(`#sug-cases .tag input[type="text"]:valid`);// написании чего либо в этом поле срабатывает функция
    let inputA40NumberYear = document.getElementById(`NumberWithoutA40`);

    //let inputA40NumberYear = document.querySelector(`NumberWithoutA40`);// не может быть вызван до появление доп окон на странице
    inputA40NumberYear.oninput = getAndPush();
    //document.getElementById(`NumberWithoutA40`).onclick = getAndPush;


})();