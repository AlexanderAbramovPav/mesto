import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._element = popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input) => {this._formValues[input.name] = input.value});

    return this._formValues;
  }

  close() {
    this._element.reset;
    super.close();
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}
