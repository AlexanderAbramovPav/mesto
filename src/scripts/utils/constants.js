export const validationParameters =  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error_visible'
}

export const sectionSelector = '.elements'
export const cardTemplateSelector = "#element-template"

export const popupEdit = '.popup-edit';
export const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileAbout = profile.querySelector('.profile__about');
export const editButton = profile.querySelector('.profile__edit-btn');
export const profileNameInput = document.querySelector(popupEdit).querySelector('.popup__input_type_name');
export const profileAboutInput = document.querySelector(popupEdit).querySelector('.popup__input_type_about');

export const popupAdd = '.popup-add';
export const addButton = profile.querySelector('.profile__add-btn');
export const addNameInput = document.querySelector(popupAdd).querySelector('.popup__input_type_place');
export const addLinkInput = document.querySelector(popupAdd).querySelector('.popup__input_type_link');

export const editForm = document.querySelector(popupEdit).querySelector('.popup__form');
export const addForm = document.querySelector(popupAdd).querySelector('.popup__form');

export const popupImg = '.popup-img';
export const popupImgInfo = document.querySelector('.popup__image');
export const popupImgContent = document.querySelector('.popup__img-title');

