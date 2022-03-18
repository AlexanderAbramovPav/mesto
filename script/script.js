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


let elementTemplateContent = document.querySelector('#element-template').content
let elements = document.querySelector('.elements');
let element = elements.querySelector('.element');

let popupEdit = document.querySelector('.popup-edit');
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let editButton = profile.querySelector('.profile__edit-btn');
let popupEditForm = popupEdit.querySelector('.popup-edit-form');
let popupEditCloseButton = popupEdit.querySelector('.popup-edit-close-btn');
let profileNameInput = popupEdit.querySelector('.popup__input_type_name');
let profileAboutInput = popupEdit.querySelector('.popup__input_type_about');

let popupAdd = document.querySelector('.popup-add');
let popupAddCloseButton = popupAdd.querySelector('.popup-add-close-btn');
let popupAddForm = popupAdd.querySelector('.popup-add-form');
let addButton = profile.querySelector('.profile__add-btn');
let addNameInput = popupAdd.querySelector('.popup__input_type_place');
let addLinkInput = popupAdd.querySelector('.popup__input_type_link');

let popupImg = document.querySelector('.popup-img');
let imgButton = elements.querySelector('.element__image');
let popupImgCloseButton = popupImg.querySelector('.popup-img-close-btn');

function renderCard (card) {
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

    popupImg.classList.add('popup_opened');
  });

  elements.prepend(cardElement);
}

function renderCards (initialCards) {
  initialCards.forEach (renderCard);
}

function popupEditOpen() {

  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  popupEdit.classList.add('popup_opened');
}

function popupEditClose() {
  popupEdit.classList.remove('popup_opened');
}

function popupEditSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  popupEditClose();
}

function popupAddOpen() {
  popupAdd.classList.add('popup_opened');
}

function popupAddClose() {

  addNameInput.value = "";
  addLinkInput.value = "";

  popupAdd.classList.remove('popup_opened');
}

function popupAddSubmit(evt) {
  evt.preventDefault();

  const card =
    {
      name: addNameInput.value,
      link: addLinkInput.value
    };

  renderCard (card);

  addNameInput.value = "";
  addLinkInput.value = "";

  popupAddClose();
}

function popupImgOpen() {
  popupImg.classList.add('popup_opened');
}

function popupImgClose() {
  popupImg.classList.remove('popup_opened')
}

renderCards (initialCards);


editButton.addEventListener('click', popupEditOpen);
popupEditCloseButton.addEventListener('click', popupEditClose);
popupEditForm.addEventListener('submit', popupEditSubmit);

addButton.addEventListener('click', popupAddOpen);
popupAddCloseButton.addEventListener('click', popupAddClose);
popupAddForm.addEventListener('submit', popupAddSubmit);

popupImgCloseButton.addEventListener('click', popupImgClose);

$(window).load(function() {
  $("body").removeClass("page_preload");
});
