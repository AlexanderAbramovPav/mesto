export const validationParameters =  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error_visible'
}

export const sectionSelector = '.elements';
export const cardTemplateSelector = "#element-template";

export const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileAvatar = profile.querySelector('.profile__avatar');
export const profileAbout = profile.querySelector('.profile__about');
export const editButton = profile.querySelector('.profile__edit-btn');
export const addButton = profile.querySelector('.profile__add-btn');
export const editAvatarButton = profile.querySelector('.profile__avatar-overlay');

export const popupEdit = '.popup-edit';
export const profileNameInput = document.querySelector(popupEdit).querySelector('.popup__input_type_name');
export const profileAboutInput = document.querySelector(popupEdit).querySelector('.popup__input_type_about');
export const editForm = document.querySelector(popupEdit).querySelector('.popup__form');
export const editSubmitButton = document.querySelector(popupEdit).querySelector(validationParameters.submitButtonSelector);

export const popupAdd = '.popup-add';
export const addForm = document.querySelector(popupAdd).querySelector('.popup__form');
export const addNameInput = document.querySelector(popupAdd).querySelector('.popup__input_type_place');
export const addLinkInput = document.querySelector(popupAdd).querySelector('.popup__input_type_link');
export const addSubmitButton = document.querySelector(popupAdd).querySelector(validationParameters.submitButtonSelector);

export const popupAvatar = '.popup-avatar';
export const profileAvatarInput = document.querySelector(popupAvatar).querySelector('.popup__input_type-avatar-link');
export const editAvatarForm = document.querySelector(popupAvatar).querySelector('.popup__form');
export const avatarSubmitButton = document.querySelector(popupAvatar).querySelector(validationParameters.submitButtonSelector);

export const popupDelete = '.popup-delete';
export const deleteSubmitButton = document.querySelector(popupDelete).querySelector(validationParameters.submitButtonSelector);

export const popupImg = '.popup-img';
export const popupImgInfo = document.querySelector('.popup__image');
export const popupImgContent = document.querySelector('.popup__img-title');





