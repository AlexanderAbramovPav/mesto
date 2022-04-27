
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
      editValidator.resetError();
      addValidator.resetError();
  }
}

const popupImg = document.querySelector('.popup-img');
const popumImgInfo = popupImg.querySelector('.popup__image');
const popumImgContent = popupImg.querySelector('.popup__img-title');

export class Card {
  constructor(data, cardTemplate) {
    this._data = data;
    this._cardTemplate = document.querySelector(cardTemplate).content;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.element__like-btn').addEventListener('click', function () {
      this.classList.toggle('element__like-btn_liked');
    });

    this._cardElement.querySelector('.element__trash-btn').addEventListener('click', function () {
      this.closest('.element').remove();
    });

    this._cardElement.querySelector('.element__image').addEventListener('click', () => {

      popumImgInfo.src = this._data.link
      popumImgInfo.name = this._data.name
      popumImgInfo.alt = this._data.name
      popumImgContent.textContent = this._data.name;
      openPopup(popupImg);
    });
  }

  createCard () {
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardElementText = this._cardElement.querySelector('.element__title');
    this._cardElementImg = this._cardElement.querySelector('.element__image');

    this._cardElementText.textContent = this._data.name;
    this._cardElementImg.src = this._data.link;
    this._cardElementImg.alt = this._data.name;

    this._setEventListeners();

    return this._cardElement;
  }

}
