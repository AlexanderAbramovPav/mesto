let popup = document.querySelector('.popup');
let popupExitButton = popup.querySelector('.popup__close-btn');
let popupSubmitButton = popup.querySelector('.popup__submit-btn');

let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-btn');

let element = document.querySelector('.element');
let likeButton = element.querySelector('.element__like-btn');

function popupExit() {
  popup.classList.remove('popup_opened');
}

function popupOpen() {
  let profileName = profile.querySelector('.profile__name');
  let profileAbout = profile.querySelector('.profile__about');

  let profileNameInput = popup.querySelector('.popup__name-input');
  let profileAboutInput = popup.querySelector('.popup__about-input');

  profileNameInput.value = profileName.textContent
  profileAboutInput.value = profileAbout.textContent

  popup.classList.add('popup_opened');
}

function popupSubmit() {
  let profileNameInput = popup.querySelector('.popup__name-input');
  let profileAboutInput = popup.querySelector('.popup__about-input');

  let profileName = profile.querySelector('.profile__name span');
  let profileAbout = profile.querySelector('.profile__about');

  profileName.innerHTML = profileNameInput.value
  profileAbout.innerHTML = profileAboutInput.value

  popup.classList.remove('popup_opened')
}




popupExitButton.addEventListener('click', popupExit);
editButton.addEventListener('click', popupOpen);
popupSubmitButton.addEventListener('click', popupSubmit);
