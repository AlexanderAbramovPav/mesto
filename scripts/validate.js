const validationParameters =  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error_visible'
}

// Показ ошибки
const showInputError = (formElement, inputElement, errorMessage, validationParameters) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationParameters.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationParameters.errorClass);
};


// Скрытие ошибки
const hideInputError = (formElement, inputElement, validationParameters) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationParameters.inputErrorClass);
  errorElement.classList.remove(validationParameters.errorClass);
  errorElement.textContent = '';
};


// Проверка валидности ввода
const checkInputValidity = (formElement, inputElement, validationParameters) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationParameters);
  } else {
    hideInputError(formElement, inputElement ,validationParameters);
  }
};

// Установка слушателей
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationParameters.inputSelector));
  const buttonElement = formElement.querySelector(validationParameters.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationParameters);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationParameters);

      toggleButtonState(inputList, buttonElement, validationParameters);
    });
  });
};


// Общая валидация
const enableValidation = (validationParameters) => {
  const formList = Array.from(document.querySelectorAll(validationParameters.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
      setEventListeners(formElement, validationParameters);
  });
};

// Проверка наличия невалидных полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Переключатель кнопки
const toggleButtonState = (inputList, buttonElement, validationParameters) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationParameters.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationParameters.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

enableValidation(validationParameters);
