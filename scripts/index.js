import {FormValidator} from './FormValidator.js'
import {Card} from './Card.js'

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationParameters =  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error_visible'
}

const elements = document.querySelector('.elements');

const popupAll = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup-edit');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const editButton = profile.querySelector('.profile__edit-btn');
const popupEditForm = popupEdit.querySelector('.popup-edit-form');
const popupEditCloseButton = popupEdit.querySelector('.popup-edit-close-btn');
const profileNameInput = popupEdit.querySelector('.popup__input_type_name');
const profileAboutInput = popupEdit.querySelector('.popup__input_type_about');

const popupAdd = document.querySelector('.popup-add');
const popupAddCloseButton = popupAdd.querySelector('.popup-add-close-btn');
const popupAddForm = popupAdd.querySelector('.popup-add-form');
const addButton = profile.querySelector('.profile__add-btn');
const addNameInput = popupAdd.querySelector('.popup__input_type_place');
const addLinkInput = popupAdd.querySelector('.popup__input_type_link');

const popupImg = document.querySelector('.popup-img');
const popupImgCloseButton = popupImg.querySelector('.popup-img-close-btn');

const editForm = popupEdit.querySelector('.popup__form');
const addForm = popupAdd.querySelector('.popup__form');

const editValidator = new FormValidator(validationParameters, editForm);
const addValidator = new FormValidator(validationParameters, addForm);

editValidator.enableValidation();
addValidator.enableValidation();


function renderCard(card, container) {
  container.prepend(card);
}


function renderCards (initialCards) {
  initialCards.forEach (function (data) {
    const newCard = new Card(data, '#element-template');
    const newCardCreated = newCard.createCard();
    renderCard(newCardCreated, elements);
  });
}

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


function handleOpenProfilePopup() {

  editValidator.enableSubmitBtn();
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  openPopup(popupEdit);
}

function handleSubmitProfilePopup(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  closePopup(popupEdit);
}

function handleSubmitAddCardPopup(evt) {
  evt.preventDefault();
  const data =
    {
      name: addNameInput.value,
      link: addLinkInput.value
    };

  const newCard = new Card(data, '#element-template');
  const newCardCreated = newCard.createCard();
  renderCard(newCardCreated, elements);
  popupAddForm.reset();
  addValidator.disableSubmitBtn();
  closePopup(popupAdd);
}

renderCards (initialCards);

popupAll.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__close-btn') || evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
      editValidator.resetError();
      addValidator.resetError();
    }
  });
});

editButton.addEventListener('click', handleOpenProfilePopup);

popupEditCloseButton.addEventListener('click', function () {
  editValidator.resetError();
  closePopup(popupEdit);
});
popupEditForm.addEventListener('submit', handleSubmitProfilePopup);

addButton.addEventListener('click', function () {
  openPopup(popupAdd);
});

popupAddCloseButton.addEventListener('click', function () {
  popupAddForm.reset();
  addValidator.resetError();
  closePopup(popupAdd);
});

popupAddForm.addEventListener('submit', handleSubmitAddCardPopup);

popupImgCloseButton.addEventListener('click', function () {
  closePopup(popupImg);
});
