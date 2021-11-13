import throttle from 'lodash.throttle';

const formEl = document.querySelector(".feedback-form");
const emailInputEL = document.querySelector("[name=email]");
const textareaEL = document.querySelector("[name=message]");
const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener("submit", onFormSubmit);
emailInputEL.addEventListener("input", throttle(onEmailInput, 500));
textareaEL.addEventListener("input", throttle(onTextareaInput, 500));

let userInfo = {
    email: '',
    message: '',
};

getStorageInfo();

function onFormSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();
    console.log('userInfo :>> ', userInfo);
    localStorage.removeItem(STORAGE_KEY);
}

function onEmailInput(e) {
    userInfo.email = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo));
}

function onTextareaInput(e) {
    userInfo.message = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo));
}

function getStorageInfo() {
    let savedInfo = localStorage.getItem(STORAGE_KEY);

    if (savedInfo) {
        userInfo = JSON.parse(savedInfo);
        emailInputEL.value = userInfo.email;
        textareaEL.value = userInfo.message;
    }
}
