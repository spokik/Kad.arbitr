// Добавляет обработчики интерфейса
function addTamplaties() {
  //получаем стороны
  const applicantl1 = document.querySelector("#gr_case_partps > table > tbody > tr > td.plaintiffs.first > div > ul > li > span > a").innerText; //Истец
  const applicantl2 = document.querySelector("#gr_case_partps > table > tbody > tr > td.defendants > div > ul > li > span > a").innerText; //Ответчик


  const classBlok = document.createElement("style")
  classBlok.innerHTML = "div.tampleteButton{height: 30px;width: 130px;-webkit-appearance: button;-webkit-writing-mode: horizontal-tb !important;color: buttontext;text-shadow: none;display: inline-block;text-align: center;align-items: flex-start;background-color: buttonface;box-sizing: border-box;margin: 0em;font: 400 13.3333px Arial;padding: 1px 6px;border-width: 2px;border-style: outset;border-color: buttonface;border-image: initial;}}";
  const divBlok = document.createElement("div")
  divBlok.id = "UserTempale"
  divBlok.innerHTML = `
      <div id="istec" class="tampleteButton" >Истец</div>
      <div id="otvetchik" class="tampleteButton">Ответчик</div>
      <div id="PoObshimPravilam" class="tampleteButton">По общим</div>
      <div id="Clarify" class="tampleteButton">Уточнение.И</div>
      <br>
      <div id="hodOPriob" class="tampleteButton">Приобщении.И</div>
      <div id="Otziv" class="tampleteButton">Отзыв.О</div>
      <div id="otkazOtIska" class="tampleteButton">Отказ.И</div>
      <div id="processualnoePravopriemstvo" class="tampleteButton">Правоприемство</div>`;

  document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > div.b-popup-button.js-upload-submit").before(classBlok)
  document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > div.b-popup-button.js-upload-submit").before(divBlok)



  //События меняют стороны
  document.getElementById("istec").onclick = () => (document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > dl > dd > div > span > label > input").value = applicantl1);
  document.getElementById("otvetchik").onclick = () => (document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > dl > dd > div > span > label > input").value = applicantl2);
  //События Вставляют даные шблонов
  document.getElementById("Otziv").onclick = () => pastValuesFromTamplate(tamplatesValue.otziv.value, tamplatesValue.otziv.licantl, tamplatesValue.otziv.showText);
  document.getElementById("hodOPriob").onclick = () => pastValuesFromTamplate(tamplatesValue.HodOPriob.value, tamplatesValue.HodOPriob.licantl, tamplatesValue.HodOPriob.showText);
  document.getElementById("otkazOtIska").onclick = () => pastValuesFromTamplate(tamplatesValue.OtmenaIska.value, tamplatesValue.OtmenaIska.licantl, tamplatesValue.OtmenaIska.showText);
  document.getElementById("processualnoePravopriemstvo").onclick = () => pastValuesFromTamplate(tamplatesValue.processual.value, tamplatesValue.processual.licantl, tamplatesValue.processual.showText);
  document.getElementById("PoObshimPravilam").onclick = () => pastValuesFromTamplate(tamplatesValue.PoObshimPravilam.value, tamplatesValue.PoObshimPravilam.licantl, tamplatesValue.PoObshimPravilam.showText);
  document.getElementById("Clarify").onclick = () => pastValuesFromTamplate(tamplatesValue.Clarify.value, tamplatesValue.Clarify.licantl, tamplatesValue.Clarify.showText);
  function pastValuesFromTamplate(value, licantl, showText) {
    document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > table > tbody > tr > td.b-popup-sj-table-item.b-popup-sj-table-item--name > dl > dd > select > option").value = value;
    document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > dl > dd > div > span > label > input").value = licantl;
    document.querySelector("#b-container > div.b-popup-wrapper.js-popup-wrapper.js-popup-wrapper--upload > div.b-popup.b-popup--blue.b-popup--upload.js-popup--upload > form > table > tbody > tr > td.b-popup-sj-table-item.b-popup-sj-table-item--name > dl > dd > a > span.selectBox-label").innerHTML = showText;
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
    Clarify: {
      value: `07388172-ff14-4517-848b-0a07649f334d`,
      licantl: applicantl1,
      showText: `Ходатайство об уточнении размера исковых требований`,
    },
  };
}

export { addTamplaties }