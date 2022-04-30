import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._popupImgInfo = this._popup.querySelector('img');
    this._popupImgContent = this._popup.querySelector('p');

  }

  open(data) {
    this._data = data;
    this._popupImgInfo.src = this._data.link;
    this._popupImgInfo.name = this._data.name;
    this._popupImgInfo.alt = this._data.name;
    this._popupImgContent.textContent = this._data.name;
    super.open();
  }

}
