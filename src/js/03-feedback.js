import throttle from 'lodash.throttle';


const form = document.querySelector('.feedback-form');
// const inputEl = document.querySelector('input');
// const textareaEl = document.querySelector('textarea');

const FORM_DATA = 'feedback-form-state';

const formObj = {};
    
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onShow, 500));

onLocalStoragGet();

    /*/ не перезагружать форму
    //  после отравки сброс с полей текст
    */ 
function onFormSubmit(e) {
    e.preventDefault();
    console.log('Это объект с данными формы', formObj);
    
    e.target.reset();
    localStorage.removeItem(FORM_DATA);
}

    // записываем в объект данные с инпута
function onShow(e) {
    formObj[e.target.name] = e.target.value;
    // console.log('formObj', formObj);

    onLocalStoragSave(formObj);
}

    // конвертируем в формат Json
function onLocalStoragSave() {
    const localData = JSON.stringify(formObj);
    localStorage.setItem(FORM_DATA, localData);
}

    /*из формата json
    / восстанавливаем текст в полях после перезагрузки
   */ 
function onLocalStoragGet(e) {
    const savedData = localStorage.getItem(FORM_DATA);
    const saveFormObj = JSON.parse(savedData);
    if (savedData) {
        // console.log('saveFormObj', saveFormObj);
        // console.log(" Object.keys(saveFormObj);", Object.keys(saveFormObj));
        // console.log(" Object.values(saveFormObj);", Object.values(saveFormObj));
        // console.log(" Object.entries(saveFormObj)", Object.entries(saveFormObj));
        Object.entries(saveFormObj).forEach(([key, value]) => {
            form.elements[key].value = value;
            // if (inputEl.name === key) {
            //     inputEl.value = value;
            // } else if (textareaEl.name === key) {
            //     textareaEl.value = value;
            // } else return;
        }
        )
    }
}