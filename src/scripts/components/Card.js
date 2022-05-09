
export class Card {
  constructor(data, {handleCardClick}, {handleTrashClick}, {handleLikeClick}, cardTemplate) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._cardTemplate = document.querySelector(cardTemplate).content;
    this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._cardElementText = this._cardElement.querySelector('.element__title');
    this._cardElementImg = this._cardElement.querySelector('.element__image');
    this._likeButton = this._cardElement.querySelector('.element__like-btn');
    this._trashButton = this._cardElement.querySelector('.element__trash-btn');
    this._likeCounter = this._cardElement.querySelector('.element__like-counter');
  }

  _setEventListeners() {
    this._trashButton.addEventListener('click', () => {this._handleTrashClick()});
    this._likeButton.addEventListener('click', () => {this._handleLikeClick(this._data._id)});
    this._cardElementImg.addEventListener('click', () => {this._handleCardClick()});
  }

  updateLikes(newData) {
    this._likeCounter.textContent = newData.likes.length;
  }

  disableCardDeletion(newData, userId) {
    if (userId !== newData.owner._id) {
      this._cardElement.querySelector('.element__trash-btn').remove();
    }
  }

  markLikedCard(newData, userId) {
    if (newData.likes.some(list => list._id === userId)) {
      this._cardElement.querySelector('.element__like-btn').classList.add('element__like-btn_liked');
    }
  }

  createCard () {
    this._cardElementText.textContent = this._data.name;
    this._cardElementImg.src = this._data.link;
    this._cardElementImg.alt = this._data.name;
    this._likeCounter.textContent = this._data.likes.length;

    this._setEventListeners();

    return this._cardElement;
  }

}
