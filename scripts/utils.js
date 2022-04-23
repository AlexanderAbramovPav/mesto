export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

export function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
  }
}

export const popupImg = document.querySelector('.popup-img');
export const popumImgInfo = popupImg.querySelector('.popup__image');
export const popumImgContent = popupImg.querySelector('.popup__img-title');
