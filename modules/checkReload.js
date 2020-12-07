// Проверка задвоенной загрузки файлов
function checkReload() {
  //Проверка повторной загрузки файлов
  let checkArray = []
  let checkbatton = document.getElementById("UserTempale");
  checkbatton.onmouseover = function () {
    checkArray[0] = document.getElementsByClassName(`b-popup-sj-link js-popup-sj-link js-popup-sj-link--upload`)[0].innerText

    for (let i = 1; document.querySelectorAll("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div > form > div > div > ul > li > a.b-popup-loaded-attachments_list-item-link").length + 1 > i; i++) {
      checkArray[i] = document.querySelectorAll("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div > form > div > div > ul > li > a.b-popup-loaded-attachments_list-item-link")[i-1].innerText;
    }

    // значение прошлого иска
    const lastFilles = JSON.parse(localStorage.getItem(`downLoadFilles`))
    if (lastFilles === undefined) {
      lastFilles = []
      return lastFilles
    }

    //Сравнивает настоящие и прошлые файлы
    for (let key in checkArray) {
      for (let prop in lastFilles) {
        if (checkArray[key] === "Прикрепить файл") { return }
        if (checkArray[key] === lastFilles[prop]) {
          alert(`Ты уже загружал(а)  "${checkArray[key]}", но загружаешь "${checkArray[prop]}" повторно`);
        }
      }
    }
    return checkArray;
  };

  //Установка новых значений  файлов в local Storage
  document.getElementsByClassName(`b-popup-button js-upload-submit`)[0].addEventListener("click", () => { testForclick() }) 
  function testForclick() {
    checkArray[0] = document.querySelector("span.qq-upload-file").innerText
    if (document.querySelector("#b-container a.b-popup-loaded-attachments_list-item-link")) {
      for (let i = 1; document.querySelectorAll("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div > form > div > div > ul > li > a.b-popup-loaded-attachments_list-item-link").length + 1 > i; i++) {
        checkArray[i] = document.querySelectorAll("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div > form > div > div > ul > li > a.b-popup-loaded-attachments_list-item-link")[i-1].innerText;
      }
    }
        


    localStorage.setItem(`downLoadFilles`, JSON.stringify(checkArray))
  }

}


export { checkReload }