import './index.css'
import {
  validationParameters,
  sectionSelector,
  cardTemplateSelector,
  popupEdit,
  profileName,
  profileAbout,
  profileAvatar,
  editButton,
  profileNameInput,
  profileAboutInput,
  popupAdd,
  addButton,
  addNameInput,
  addLinkInput,
  editForm,
  addForm,
  editAvatarForm,
  editAvatarButton,
  popupImg,
  popupDelete,
  popupAvatar,
  profileAvatarInput
} from '../scripts/utils/constants.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {Card} from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

// Установка валидаторов

const editValidator = new FormValidator(validationParameters, editForm);
const addValidator = new FormValidator(validationParameters, addForm);
const editAvatarValidator = new FormValidator(validationParameters, editAvatarForm);

editValidator.enableValidation();
addValidator.enableValidation();
editAvatarValidator.enableValidation();

// Настройка Api

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '90d7f0de-1461-4d77-a1bc-bceff4cd7168',
    'Content-Type': 'application/json'
  }
});

// Функция выключения возможности удалить карточку
function disableCardDeletion(cardElement, item) {
  if (userInfo.getUserInfo().id !== item.owner._id) {
    cardElement.querySelector('.element__trash-btn').remove();
  }
}

// Функция определения карточек, которые пользователь лайкнул
function markLikedCard(cardElement, item) {
  if (item.likes.some(list => list._id === userInfo.getUserInfo().id)) {
    cardElement.querySelector('.element__like-btn').classList.add('element__like-btn_liked');
  }
}


// Функция создания карточки

function createCard(item) {
  const newCard = new Card(item,
    {handleCardClick: () => {
      imgPopup.open(item);
    }},
    {handleTrashClick: () => {
      deletePopup.open(item);
    }},
    {handleLikeClick: (cardId) => {
      if (item.likes.find(x => x._id === userInfo.getUserInfo().id)) {
        api.deleteCardLike(cardId)
            .then(results => {
              item = results;
              newCard.updateLikes(item);
            })
            .catch((err) => {
              console.log(err);
            })
      } else {
        api.putCardLike(cardId)
            .then(results => {
              item = results;
              newCard.updateLikes(item);
            })
            .catch((err) => {
              console.log(err);
            })
      }
    }},
    cardTemplateSelector
  );
  const cardElement = newCard.createCard();

  disableCardDeletion(cardElement, item);
  markLikedCard(cardElement, item);

  return cardElement
}

// Функция отрисовки карточек
function renderCards(Cards) {
  const cardList = new Section({
    items: Cards,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    }
  }, sectionSelector);
  cardList.renderItems();
}


// Попал просмотра карточки
const imgPopup = new PopupWithImage(popupImg);
imgPopup.setEventListeners();


// Попал удаления карточки

const deletePopup = new PopupWithConfirmation(popupDelete,
  {handleFormSubmit: (data) => {

    const submitButton = document.querySelector(popupDelete).querySelector(validationParameters.submitButtonSelector);
    submitButton.textContent = 'Удаление карточки...';

    api.deleteCard(data._id)
      .then (() => {
        api.getInitialCards()
          .then((Cards) => {
            document.querySelector(sectionSelector).innerHTML = '';
            renderCards(Cards)
          })
          .catch((err) => {
            console.log(err);
          })
          .then(() => {
            submitButton.textContent = 'Карточка удалена';
            deletePopup.close();
            setTimeout(() => {submitButton.textContent = 'Да'}, 500);
          })
      })
      .catch((err) => {
        console.log(err);
      })
}});

deletePopup.setEventListeners();

// Персональная информация

const userInfo = new UserInfo(profileName, profileAbout);

// Персональная информация. Получение инфы и отрисовка
  api.getUserInfo()
    .then((result) => {
      profileAvatar.src = result.avatar;
      userInfo.setUserInfo(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      // Изначальная отрисовка карточек
      api.getInitialCards()
        .then((Cards) => {
          renderCards(Cards)
        })
        .catch((err) => {
          console.log(err);
        });
});


// Персональная информация. Обновление инфы

const newEditForm = new PopupWithForm (popupEdit, {handleFormSubmit: (profileValues) => {

  const submitButton = document.querySelector(popupEdit).querySelector(validationParameters.submitButtonSelector);
  submitButton.textContent = 'Сохранение...';

  api.patchUserInfo(JSON.stringify({
    name: profileValues[profileNameInput.name],
    about: profileValues[profileAboutInput.name]
  }))
    .then((result) => {
      profileAvatar.src = result.avatar;
      userInfo.setUserInfo(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      submitButton.textContent = 'Сохранено';
      newEditForm.close();
      setTimeout(() => {submitButton.textContent = 'Сохранить'}, 500);
    })
}});

newEditForm.setEventListeners();


// Персональная информация. Кнопка изменения инфы

editButton.addEventListener('click', () => {
  editValidator.resetError();
  editValidator.enableSubmitBtn();

  const {name, about} = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileAboutInput.value = about;

  newEditForm.open();
});


// Персональная информация. Обновление аватарки

const newAvatarForm = new PopupWithForm (popupAvatar, {handleFormSubmit: (profileValues) => {

  const submitButton = document.querySelector(popupAvatar).querySelector(validationParameters.submitButtonSelector);
  submitButton.textContent = 'Сохранение...';

    api.patchUserAvatar(JSON.stringify({avatar: profileValues[profileAvatarInput.name]}))
      .then((result) => {
        profileAvatar.src = result.avatar;
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        submitButton.textContent = 'Сохранено';
        newAvatarForm.close();
        setTimeout(() => {submitButton.textContent = 'Сохранить'}, 500);
      })
}});

newAvatarForm.setEventListeners();

// Персональная информация. Кнопка обновления аватарки

editAvatarButton.addEventListener('click', () => {
  editAvatarValidator.resetError();
  editAvatarValidator.disableSubmitBtn()
  newAvatarForm.open();
});


// Добавление новой карточки

const addPopupForm = new PopupWithForm (popupAdd, {handleFormSubmit: (addValues) => {

  const submitButton = document.querySelector(popupAdd).querySelector(validationParameters.submitButtonSelector);
  submitButton.textContent = 'Создание карточки...';

    api.addNewCard(JSON.stringify({
          name: addValues[addNameInput.name],
          link: addValues[addLinkInput.name]
        }))
      .then (() => {
        api.getInitialCards()
          .then((Cards) => {
            document.querySelector(sectionSelector).innerHTML = '';
            renderCards(Cards)
          })
          .catch((err) => {
            console.log(err);
          })
          .then(() => {
            submitButton.textContent = 'Карточка создана';
            addPopupForm.close();
            setTimeout(() => {submitButton.textContent = 'Создать'}, 500);
          });
      })
      .catch((err) => {
        console.log(err);
      })
  }
});

addPopupForm.setEventListeners();

// Кнопка - Добавление новой карточки

addButton.addEventListener('click', () => {
  addValidator.resetError();
  addValidator.disableSubmitBtn()
  addPopupForm.open();
});
