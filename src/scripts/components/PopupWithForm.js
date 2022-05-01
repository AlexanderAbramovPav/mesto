import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._element = this._popup.querySelector('.popup__form');
    this._inputList = this._element.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {this._formValues[input.name] = input.value});
    return this._formValues;
  }

  close() {
    this._element.reset();
    super.close();
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}
