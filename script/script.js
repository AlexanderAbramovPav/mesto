const elementTemplateContent = document.querySelector('#element-template').content
const elements = document.querySelector('.elements');
const element = elements.querySelector('.element');

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
const imgButton = elements.querySelector('.element__image');
const popupImgCloseButton = popupImg.querySelector('.popup-img-close-btn');

function createCard (card) {
  const cardElement = elementTemplateContent.cloneNode(true);
  const cardElementText = cardElement.querySelector('.element__title');
  const cardElementImg = cardElement.querySelector('.element__image');

  cardElementText.textContent = card.name;
  cardElementImg.src = card.link;
  cardElementImg.alt = card.name;

  cardElement.querySelector('.element__like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-btn_liked');
  });

  cardElement.querySelector('.element__trash-btn').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  cardElement.querySelector('.element__image').addEventListener('click', function (evt) {

    popupImg.querySelector('.popup__image').src = evt.target.closest('.element__image').src;

    popupImg.querySelector('.popup__image').name = evt.target.closest('.element__image').alt;

    popupImg.querySelector('.popup__image').alt = evt.target.closest('.element__image').alt;

    popupImg.querySelector('.popup__img-title').textContent = evt.target.closest('.element__image').alt;

    openPopup(popupImg);
  });

  return cardElement;
}

function renderCard(card, container) {
  container.prepend(card);
}

function renderCards (initialCards) {
  initialCards.forEach (function (card) {
    const newCard = createCard(card);
    renderCard(newCard, elements);
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
  }
}

popupAll.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
  }
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
    }
  });
});

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
  }
}

function popupEditOpen() {

  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  openPopup(popupEdit);
}

function popupEditSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;

  closePopup(popupEdit);
}

function popupAddSubmit(evt) {
  evt.preventDefault();

  const card =
    {
      name: addNameInput.value,
      link: addLinkInput.value
    };

  const newCard = createCard(card);
  renderCard(newCard, elements);

  addNameInput.value = "";
  addLinkInput.value = "";
  closePopup(popupAdd);
}

renderCards (initialCards);

editButton.addEventListener('click', popupEditOpen);
popupEditCloseButton.addEventListener('click', function () {
  closePopup(popupEdit);
});
popupEditForm.addEventListener('submit', popupEditSubmit);

addButton.addEventListener('click', function () {
  openPopup(popupAdd);
});
popupAddCloseButton.addEventListener('click', function () {
  addNameInput.value = "";
  addLinkInput.value = "";
  closePopup(popupAdd);
});
popupAddForm.addEventListener('submit', popupAddSubmit);

popupImgCloseButton.addEventListener('click', function () {
  closePopup(popupImg);
});
