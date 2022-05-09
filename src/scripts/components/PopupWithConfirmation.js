import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popup.querySelector('.popup__submit-btn');
    super.close()
  }

  open(data, cardElement) {
    this._data = data;
    this._cardElement = cardElement
    super.open();
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._data, this._cardElement);
    });
    super.setEventListeners();
  }
}
