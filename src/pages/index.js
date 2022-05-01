import './index.css'
import {
  validationParameters,
  sectionSelector,
  cardTemplateSelector,
  popupEdit,
  profileName,
  profileAbout,
  editButton,
  profileNameInput,
  profileAboutInput,
  popupAdd,
  addButton,
  addNameInput,
  addLinkInput,
  editForm,
  addForm,
  popupImg,
} from '../scripts/utils/constants.js';
import {initialCards} from '../scripts/utils/utils.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {Card} from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

// Установка валидаторов

const editValidator = new FormValidator(validationParameters, editForm);
const addValidator = new FormValidator(validationParameters, addForm);

editValidator.enableValidation();
addValidator.enableValidation();


// Изначальная отрисовка карточек

function createCard(item) {
  const newCard = new Card(item, {handleCardClick: () => {
    imgPopup.open(item);
  }}, cardTemplateSelector);
  const cardElement = newCard.createCard();

  return cardElement
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, sectionSelector);

const imgPopup = new PopupWithImage(popupImg);
imgPopup.setEventListeners(); // Каждый попап (под каждую картинку) создается один раз и один раз ему навешиваются слушатели

cardList.renderItems();

// Изменение персональной информации

const userInfo = new UserInfo(profileName, profileAbout);

editButton.addEventListener('click', () => {
  editValidator.resetError();
  editValidator.enableSubmitBtn();

  const {name, info} = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileAboutInput.value = info;

  newEditForm.open();
});

const newEditForm = new PopupWithForm (popupEdit, {handleFormSubmit: (profileValues) => {

  const newUserData = {}
  newUserData.name = profileValues[profileNameInput.name];
  newUserData.info = profileValues[profileAboutInput.name];

  userInfo.setUserInfo(newUserData);

  }
});

newEditForm.setEventListeners();

// Добавление новой карточки

const addPopupForm = new PopupWithForm (popupAdd, {handleFormSubmit: (addValues) => {
    console.log(addValues);
    cardList.addItem(createCard({name: addValues[addNameInput.name], link: addValues[addLinkInput.name]}));
  }

});

addButton.addEventListener('click', () => {
  addValidator.resetError();
  addValidator.disableSubmitBtn()
  addPopupForm.open();
});

addPopupForm.setEventListeners();
