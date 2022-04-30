export class Card {
  constructor(data, {handleCardClick}, cardTemplate) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._cardTemplate = document.querySelector(cardTemplate).content;
    this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._cardElementText = this._cardElement.querySelector('.element__title');
    this._cardElementImg = this._cardElement.querySelector('.element__image');
    this._likeButton = this._cardElement.querySelector('.element__like-btn');
    this._trashButton = this._cardElement.querySelector('.element__trash-btn');
  }


  _handleLikeBtnListener = () => {
    this._likeButton.classList.toggle('element__like-btn_liked');
  };

  _handleTrashBtnListener = () => {
    this._cardElement.remove();
  };

  _setEventListeners() {
    this._trashButton.addEventListener('click', this._handleTrashBtnListener);
    this._likeButton.addEventListener('click', this._handleLikeBtnListener);
    this._cardElementImg.addEventListener('click', () => {this._handleCardClick()});
  }

  createCard () {
    this._cardElementText.textContent = this._data.name;
    this._cardElementImg.src = this._data.link;
    this._cardElementImg.alt = this._data.name;

    this._setEventListeners();

    return this._cardElement;
  }

}
