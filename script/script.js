let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-btn');
let popupSubmitButton = popup.querySelector('.popup__form');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');

let editButton = profile.querySelector('.profile__edit-btn');

let profileNameInput = popup.querySelector('.popup__input_type_name');
let profileAboutInput = popup.querySelector('.popup__input_type_about');

function popupClose() {
  popup.classList.remove('popup_opened');
}

function popupEdit() {

  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;

  popup.classList.add('popup_opened');
}

function popupSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  popupClose();
}

popupCloseButton.addEventListener('click', popupClose);
editButton.addEventListener('click', popupEdit);
popupSubmitButton.addEventListener('submit', popupSubmit);
