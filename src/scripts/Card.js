export class Card {
  constructor(data, {handleCardClick}, cardTemplate) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._cardTemplate = document.querySelector(cardTemplate).content;
  }


  _handleLikeBtnListener = () => {
    this._cardElement.querySelector('.element__like-btn').classList.toggle('element__like-btn_liked');
  };

  _handleTrashBtnListener = () => {
    this._cardElement.remove();
  };

  _setEventListeners() {
    this._cardElement.querySelector('.element__trash-btn').addEventListener('click', this._handleTrashBtnListener);
    this._cardElement.querySelector('.element__like-btn').addEventListener('click', this._handleLikeBtnListener);
    this._cardElement.querySelector('.element__image').addEventListener('click', () => {this._handleCardClick()});
  }

  createCard () {
    this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._cardElementText = this._cardElement.querySelector('.element__title');
    this._cardElementImg = this._cardElement.querySelector('.element__image');

    this._cardElementText.textContent = this._data.name;
    this._cardElementImg.src = this._data.link;
    this._cardElementImg.alt = this._data.name;

    this._setEventListeners();

    return this._cardElement;
  }

}
