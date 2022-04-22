export class FormValidator {
  constructor(parameters, form) {
    this._form = form;
    this._parameters = parameters;
    this._inputList = Array.from(form.querySelectorAll(parameters.inputSelector));
    this._buttonElement = form.querySelector(parameters.submitButtonSelector);
  }

  // Показ ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._parameters.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._parameters.errorClass);
  };

  // Скрытие ошибки
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._parameters.inputErrorClass);
    errorElement.classList.remove(this._parameters.errorClass);
    errorElement.textContent = '';
  };

  // Проверка валидности ввода
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Установка слушателей
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  // Общая валидация
  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  // Проверка наличия невалидных полей
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  // Блокируем кнопку Submit
  disableSubmitBtn() {
    this._buttonElement.classList.add(this._parameters.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  // Активируем кнопку Submit
  enableSubmitBtn() {
    this._buttonElement.classList.remove(this._parameters.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  // Переключатель кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitBtn()
    } else {
      this.enableSubmitBtn()
    }
  };

  resetError() {
    this._form.reset();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

}
