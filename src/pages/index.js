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
  profileAvatarInput,
  deleteSubmitButton,
  editSubmitButton,
  avatarSubmitButton,
  addSubmitButton,
} from "../scripts/utils/constants.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";

// Установка валидаторов

const editValidator = new FormValidator(validationParameters, editForm);
const addValidator = new FormValidator(validationParameters, addForm);
const editAvatarValidator = new FormValidator(
  validationParameters,
  editAvatarForm
);

editValidator.enableValidation();
addValidator.enableValidation();
editAvatarValidator.enableValidation();

// Настройка Api

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-40",
  headers: {
    authorization: "90d7f0de-1461-4d77-a1bc-bceff4cd7168",
    "Content-Type": "application/json",
  },
});

// Функция создания карточки

function createCard(item) {
  const newCard = new Card(
    item,
    {
      handleCardClick: () => {
        imgPopup.open(item);
      },
    },
    {
      handleTrashClick: () => {
        deletePopup.open(item, cardElement);
      },
    },
    {
      handleLikeClick: (cardId) => {
        if (item.likes.find((x) => x._id === userInfo.getUserInfo().id)) {
          api
            .deleteCardLike(cardId)
            .then((results) => {
              item = results;
              newCard.updateLikes(item);
              newCard.deleteLike();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .putCardLike(cardId)
            .then((results) => {
              item = results;
              newCard.updateLikes(item);
              newCard.putLike();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    cardTemplateSelector
  );

  newCard.disableCardDeletion(item, userInfo.getUserInfo().id);
  newCard.markLikedCard(item, userInfo.getUserInfo().id);

  const cardElement = newCard.createCard();
  return cardElement;
}

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  sectionSelector
);

// Попал просмотра карточки
const imgPopup = new PopupWithImage(popupImg);
imgPopup.setEventListeners();

// Попал удаления карточки

const deletePopup = new PopupWithConfirmation(popupDelete, {
  handleFormSubmit: (data, cardElement) => {
    deleteSubmitButton.textContent = "Удаление карточки...";

    api
      .deleteCard(data._id)
      .then(() => {
        cardElement.remove();
      })
      .then(() => {
        deleteSubmitButton.textContent = "Карточка удалена";
        deletePopup.close();
      })
      .finally(() => {
        setTimeout(() => {
          deleteSubmitButton.textContent = "Да";
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

deletePopup.setEventListeners();

// Персональная информация

const userInfo = new UserInfo(profileName, profileAbout, "", profileAvatar);

// Персональная информация. Получение инфы и отрисовка
api
  .getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result);
  })
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    // Изначальная отрисовка карточек
    api
      .getInitialCards()
      .then((cards) => {
        cardList.renderItems(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  });

// Персональная информация. Обновление инфы

const newEditForm = new PopupWithForm(popupEdit, {
  handleFormSubmit: (profileValues) => {
    editSubmitButton.textContent = "Сохранение...";

    api
      .patchUserInfo({
        name: profileValues[profileNameInput.name],
        about: profileValues[profileAboutInput.name],
      })
      .then((result) => {
        userInfo.setUserInfo(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        editSubmitButton.textContent = "Сохранено";
        newEditForm.close();
      })
      .finally(() => {
        setTimeout(() => {
          editSubmitButton.textContent = "Сохранить";
        }, 500);
      });
  },
});

newEditForm.setEventListeners();

// Персональная информация. Кнопка изменения инфы

editButton.addEventListener("click", () => {
  editValidator.resetError();
  editValidator.enableSubmitBtn();

  const { name, about } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileAboutInput.value = about;

  newEditForm.open();
});

// Персональная информация. Обновление аватарки

const newAvatarForm = new PopupWithForm(popupAvatar, {
  handleFormSubmit: (profileValues) => {
    avatarSubmitButton.textContent = "Сохранение...";

    api
      .patchUserAvatar({ avatar: profileValues[profileAvatarInput.name] })
      .then((result) => {
        userInfo.setUserInfo(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        avatarSubmitButton.textContent = "Сохранено";
        newAvatarForm.close();
      })
      .finally(() => {
        setTimeout(() => {
          avatarSubmitButton.textContent = "Сохранить";
        }, 500);
      });
  },
});

newAvatarForm.setEventListeners();

// Персональная информация. Кнопка обновления аватарки

editAvatarButton.addEventListener("click", () => {
  editAvatarValidator.resetError();
  editAvatarValidator.disableSubmitBtn();
  newAvatarForm.open();
});

// Добавление новой карточки

const addPopupForm = new PopupWithForm(popupAdd, {
  handleFormSubmit: (addValues) => {
    addSubmitButton.textContent = "Создание карточки...";

    api
      .addNewCard({
        name: addValues[addNameInput.name],
        link: addValues[addLinkInput.name],
      })
      .then((card) => {
        cardList.prependItem(createCard(card));
      })
      .then(() => {
        addSubmitButton.textContent = "Карточка создана";
        addPopupForm.close();
      })
      .finally(() => {
        setTimeout(() => {
          addSubmitButton.textContent = "Создать";
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

addPopupForm.setEventListeners();

// Кнопка - Добавление новой карточки

addButton.addEventListener("click", () => {
  addValidator.resetError();
  addValidator.disableSubmitBtn();
  addPopupForm.open();
});
