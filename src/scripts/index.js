import '../pages/index.css';
import {popupImg, popupImgInfo, popupImgContent} from './utils.js'
import {initialCards} from './initialCards.js'
import {FormValidator} from './FormValidator.js'
import {Card} from './Card.js'
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const validationParameters =  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error_visible'
}

const elements = document.querySelector('.elements');
const sectionSelector = '.elements'
const cardTemplateSelector = "#element-template"

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

const popupImgCloseButton = popupImg.querySelector('.popup-img-close-btn');

const editForm = popupEdit.querySelector('.popup__form');
const addForm = popupAdd.querySelector('.popup__form');


const editValidator = new FormValidator(validationParameters, editForm);
const addValidator = new FormValidator(validationParameters, addForm);

editValidator.enableValidation();
addValidator.enableValidation();


// Изначальная отрисовка карточек

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item, {handleCardClick: () => {
      const imgPopup = new PopupWithImage(item, popupImg);
      imgPopup.setEventListeners()
      imgPopup.open();
    }}, cardTemplateSelector);
    const newCardCreated = newCard.createCard();
    cardList.addItem(newCardCreated);
  }
}, sectionSelector);

cardList.renderItems();

// Изменение персональной информации

const userInfo = new UserInfo({nameSelector: profileName, infoSelector: profileAbout});

const newEditForm = new PopupWithForm (popupEdit, {handleFormSubmit: (profileValues) => {

  const newUserData = {}
  newUserData.name = profileValues[profileNameInput.name];
  newUserData.info = profileValues[profileAboutInput.name];

  userInfo.setUserInfo(newUserData);

  }
});

newEditForm.setEventListeners();

editButton.addEventListener('click', () => {
  editValidator.resetError();
  editValidator.enableSubmitBtn();

  const {name, info} = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileAboutInput.value = info;

  newEditForm.open();
});

// Добавление новой карточки

const addPopupForm = new PopupWithForm (popupAdd, {handleFormSubmit: (addValues) => {
  const newCard = new Card({name: addValues[addNameInput.name], link: addValues[addLinkInput.name]}, {handleCardClick: () => {
      const imgPopup = new PopupWithImage({name: addValues[addNameInput.name], link: addValues[addLinkInput.name]}, popupImg);
      imgPopup.setEventListeners()
      imgPopup.open();
    }}, cardTemplateSelector);
    const newCardCreated = newCard.createCard();
    cardList.addItem(newCardCreated);
  }

});

addButton.addEventListener('click', () => {
  addValidator.resetError();
  addValidator.disableSubmitBtn()
  addPopupForm.open();
});

addPopupForm.setEventListeners();
