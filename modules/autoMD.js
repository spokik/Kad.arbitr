//При добавлении иска на сайт, скрипт автоматически указывает тип документа.
function defaultMD() {
    document.getElementsByClassName(`b-popup-file_upload-attachments_list-item`)[1].onclick = () => { document.getElementsByClassName("js-input js-input--combobox js-input--deselect_with_save_val")[1].value = `Материалы по делу`; };
    document.getElementsByClassName(`b-popup-sj-link js-popup-sj-link js-popup-sj-link--upload`)[0].onclick = () => { document.getElementsByClassName("js-input js-input--combobox js-input--deselect_with_save_val")[1].value = `Материалы по делу`; };
}

export { defaultMD }