// ==UserScript==
// @name         Шаблоны допов 3 test
// @namespace    http://tampermonkey.net/
// @version      3.1.1
// @description  Шаблоны и автоматизация работы сканировщика в системе kad.arbitr.ru
// @author       @Spokik
// @match        kad.arbitr.ru/Card/*
// @grant        none
// ==/UserScript==
(function () {
  "use strict";
  window.onload = onloadPage();

  function onloadPage() {
    defaultMD();
    addBattons();
    addTamplaties();
    statisticsInterface();
    checkReload();
    addStaticOnLocalStorage();

    //При добавлении иска на сайт, скрипт автоматически указывает тип документа.
    function defaultMD() {
      document.getElementsByClassName(
        `b-popup-file_upload-attachments_list-item`
      )[1].onclick = () => {
        document.getElementsByClassName(
          "js-input js-input--combobox js-input--deselect_with_save_val"
        )[1].value = `Материалы по делу`;
      };
      document.getElementsByClassName(
        `b-popup-sj-link js-popup-sj-link js-popup-sj-link--upload`
      )[0].onclick = () => {
        document.getElementsByClassName(
          "js-input js-input--combobox js-input--deselect_with_save_val"
        )[1].value = `Материалы по делу`;
      };
    }
    // Добавляет кнопки пользовательского интерфейса
    function addBattons() {
      let footer = document.createElement("div");
      footer.className = "b-feedback";
      footer.innerHTML = `Тут будет информация о загруженных за день файлых <div id="activeStat" class="tampleteButton" style="height:23px">Статистика</div>`;

      let classBlok = document.createElement("style");
      classBlok.innerHTML =
        "div.tampleteButton{height: 30px;width: 130px;-webkit-appearance: button;-webkit-writing-mode: horizontal-tb !important;color: buttontext;text-shadow: none;display: inline-block;text-align: center;align-items: flex-start;background-color: buttonface;box-sizing: border-box;margin: 0em;font: 400 13.3333px Arial;padding: 1px 6px;border-width: 2px;border-style: outset;border-color: buttonface;border-image: initial;}}";
      let divBlok = document.createElement("div");
      divBlok.id = "UserTempale";
      divBlok.innerHTML = `
      <div id="istec" class="tampleteButton" >Истец</div>
      <div id="otvetchik" class="tampleteButton">Ответчик</div>
      <div id="PoObshimPravilam" class="tampleteButton">По общим</div><br>

      <div id="Otziv" class="tampleteButton">Отзыв.О</div>
      <div id="hodOPriob" class="tampleteButton">Приобщении.И</div>
      <div id="otkazOtIska" class="tampleteButton">Отказ.И</div>
      <div id="processualnoePravopriemstvo" class="tampleteButton">Правоприемство</div>`;

      document
        .querySelector(
          "#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > div.b-popup-button.js-upload-submit"
        )
        .before(classBlok);
      document
        .querySelector(
          "#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > div.b-popup-button.js-upload-submit"
        )
        .before(divBlok);
      document.querySelector("#b-footer > div > div.b-copyright").after(footer);
    }
    // Добавляет обработчики интерфейса
    function addTamplaties() {
      //получаем стороны
      const applicantl1 = document.querySelector(
        "#gr_case_partps > table > tbody > tr > td.plaintiffs.first > div > ul > li > span > a"
      ).innerText; //Истец
      const applicantl2 = document.querySelector(
        "#gr_case_partps > table > tbody > tr > td.defendants > div > ul > li > span > a"
      ).innerText; //Ответчик

      //События меняют стороны
      document.getElementById("istec").onclick = () =>
        (document.querySelector(
          "#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > dl > dd > div > span > label > input"
        ).value = applicantl1);
      document.getElementById("otvetchik").onclick = () =>
        (document.querySelector(
          "#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > dl > dd > div > span > label > input"
        ).value = applicantl2);
      //События Вставляют даные шблонов
      document.getElementById("Otziv").onclick = () =>
        pastValuesFromTamplate(
          tamplatesValue.otziv.value,
          tamplatesValue.otziv.licantl,
          tamplatesValue.otziv.showText
        );
      document.getElementById("hodOPriob").onclick = () =>
        pastValuesFromTamplate(
          tamplatesValue.HodOPriob.value,
          tamplatesValue.HodOPriob.licantl,
          tamplatesValue.HodOPriob.showText
        );
      document.getElementById("otkazOtIska").onclick = () =>
        pastValuesFromTamplate(
          tamplatesValue.OtmenaIska.value,
          tamplatesValue.OtmenaIska.licantl,
          tamplatesValue.OtmenaIska.showText
        );
      document.getElementById("processualnoePravopriemstvo").onclick = () => {
        pastValuesFromTamplate(
          tamplatesValue.processual.value,
          tamplatesValue.processual.licantl,
          tamplatesValue.processual.showText
        );
      };
      document.getElementById("PoObshimPravilam").onclick = () => {
        pastValuesFromTamplate(
          tamplatesValue.PoObshimPravilam.value,
          tamplatesValue.PoObshimPravilam.licantl,
          tamplatesValue.PoObshimPravilam.showText
        );
      };

      function pastValuesFromTamplate(value, licantl, showText) {
        document.querySelector(
          "#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > table > tbody > tr > td.b-popup-sj-table-item.b-popup-sj-table-item--name > dl > dd > select > option"
        ).value = value;
        document.querySelector(
          "#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > dl > dd > div > span > label > input"
        ).value = licantl;
        document.querySelector(
          "#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > table > tbody > tr > td.b-popup-sj-table-item.b-popup-sj-table-item--name > dl > dd > a > span.selectBox-label"
        ).innerHTML = showText;
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
    // Интерфейс статистики
    function statisticsInterface() {
      //Кнопка статистики
      document.getElementById("activeStat").onclick = () => {
        let now = new Date();
        let addStatinterface = document.createElement("div");
        addStatinterface.innerHTML = `
            <input type="month" id="month" name="month"
                min="${now
                  .toISOString()
                  .substr(0, 4)}-01" value="${now.toISOString().substr(0, 7)}">

                <input list="sostavNumber">
                <datalist id="sostavNumber">
                <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option>
                </datalist>

                <div id="statStart" class="tampleteButton" style="height:23px">Посчитать</div>

            `;
        if (document.getElementById(`month`) == null) {
          document.querySelector("#b-footer > div").style.height = "500px";
          document.querySelector("#b-footer").style.height = "500px";
          document
            .querySelector("#b-footer > div > div.b-copyright")
            .after(addStatinterface);
        } else {
          document.querySelector("#b-footer > div").style.height = "30px";
          document.querySelector("#b-footer").style.height = "30px";
          document.querySelector("#b-footer > div > div:nth-child(2)").remove();
        }

        document.getElementById(`statStart`).onclick = () => {
          let dataForLS = {};
          let sostavNumber = document.querySelector(
            "#b-footer > div > div:nth-child(2) > input:nth-child(2)"
          ).value;
          dataForLS = JSON.parse(localStorage.getItem(`sostav${sostavNumber}`));
          let counter = {};

          let needMonth = Number(
            document.querySelector("#month").value.substr(5, 7)
          );

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
                </tr>`;
          }
          tableString = tableString + `</table>`;
          console.log(tableString);
          tableForStat.innerHTML = tableString;
          tableForStat.style.color = `#FFF`;
          tableForStat.style.position = `absolute`;
          tableForStat.style.margin = `30px 10px 10px 10px`;
          document
            .querySelector("#b-footer > div > div.b-copyright")
            .before(tableForStat);
        };
      };
    }
    // Проверка задвоенной загрузки файлов
    function checkReload() {
      //Проверка повторной загрузки файлов
      let checkbatton = document.getElementById("UserTempale");
      checkbatton.onmouseover = getNowFilies;
      function getNowFilies() {
        let checkArray = {
          isk: document.getElementsByClassName(
            `b-popup-sj-link js-popup-sj-link js-popup-sj-link--upload`
          )[0].innerText,
        };

        for (
          let i = 0;
          document.querySelectorAll(
            "#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div > form > div > div > ul > li > a.b-popup-loaded-attachments_list-item-link"
          ).length >= i;
          i++
        ) {
          checkArray[`md${i}`] = document.querySelectorAll(
            "#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div > form > div > div > ul > li > a.b-popup-loaded-attachments_list-item-link"
          )[i].innerText;
          console.log(
            `Добавлен фаил для проверки`,
            document.querySelectorAll(
              "#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div > form > div > div > ul > li > a.b-popup-loaded-attachments_list-item-link"
            )[i].innerText
          );
        }

        // значение прошлого иска
        const lastFilles = JSON.parse(localStorage.getItem(`downLoadFilles`));

        //Сравнивает настоящие и прошлые файлы
        for (let key in checkArray) {
          for (let prop in lastFilles) {
            if (checkArray[key] == lastFilles[prop]) {
              alert(`Ошибочка на ${key} and ${prop}`);
            }
          }
        }
        return checkArray;
      }

      //Установка новых значений  файлов в куки
      const saveButtonElem = document.getElementsByClassName(
        `b-popup-button js-upload-submit`
      )[0];
      saveButtonElem.onclick = () => {
        localStorage.setItem(`downLoadFilles`, JSON.stringify(getNowFilies()));
        console.log(`Установленны новые значения для сревнения файлов`);
      };
    }
    // Добавляет статистику по загрузкам в localStorage
    function addStaticOnLocalStorage() {
      let elem = document.querySelector(
        "#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload"
      );

      let promise = new Promise((resolve, reject) => {
        let observer = new MutationObserver((mutationRecords) => {
          if (mutationRecords.length > 1) {
            let saveScanStat = document.querySelector(
              "#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload.b-popup--edit.js-popup--edit > form > div.b-popup-button.js-upload-submit"
            ); // кнопка по которой срабатывает скрипт
            let q =
              document.querySelector(
                "#chrono_list_content > div.b-chrono-items-container.js-chrono-items-container > div"
              ).childElementCount - 2; //Номер определения сверху дива (бывает разныей, зависит от кол-ва доков загруженных после определения)
            let sostav = document
              .querySelector(
                "#chrono_list_content > div.b-chrono-items-container.js-chrono-items-container > div > div:nth-child(" +
                  q +
                  ") > div.r-col > h2 > span > p:nth-child(1)"
              )
              .textContent.split(" ")[54];
            let docId = document.querySelector(
              "#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload.b-popup--edit.js-popup--edit > form > input[type=hidden]:nth-child(4)"
            ).value;
            let a40 = document
              .querySelector("#b-case-header > ul.crumb.g-ec > li > span")
              .textContent.split(" ")[20];

            resolve(saveScanStat, sostav, docId, a40);
            return saveScanStat, sostav, docId, a40;
          } else if (mutationRecords.length === 1) {
            return console.log(
              `Атрибуты изменились`,
              mutationRecords.length,
              `- Закрытие модального окна`
            );
          }
        });
        observer.observe(elem, {
          attributes: true,
        });
      });
      promise
        .catch((err) => {
          console.error(`Error: `, err);
        })
        .then((saveScanStat, sostav, docId, a40) => {
          //Срабатывает прии НАЖАТИИ на "Сохранить"
          saveScanStat.onclick = () => {
            let now = new Date();
            let dataForLS = {};
            dataForLS = JSON.parse(localStorage.getItem(`sostav${sostav}`));
            if (dataForLS == null) {
              dataForLS = {};
            }
            dataForLS[docId] = {
              day: `${now.getDate()}`,
              month: `${1 + now.getMonth()}`,
              a40: `${a40}`,
            };
            localStorage.setItem(`sostav${sostav}`, JSON.stringify(dataForLS));
          };
        });
    }
  }
})();
